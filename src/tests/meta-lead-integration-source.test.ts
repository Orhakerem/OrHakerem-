import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const root = process.cwd();

type Integration = {
  filePath: string;
  actionName: 'sendContactEmail' | 'sendEmail';
  leadType:
    | 'contact_inquiry'
    | 'concierge_inquiry'
    | 'event_inquiry'
    | 'reservation_inquiry';
  formLocation:
    | 'contact'
    | 'services'
    | 'events'
    | 'reservation'
    | 'property_detail';
};

const integrations: Integration[] = [
  {
    filePath: 'src/components/HomeContactForm.tsx',
    actionName: 'sendContactEmail',
    leadType: 'contact_inquiry',
    formLocation: 'contact',
  },
  {
    filePath: 'src/app/[locale]/services/page.tsx',
    actionName: 'sendContactEmail',
    leadType: 'concierge_inquiry',
    formLocation: 'services',
  },
  {
    filePath: 'src/app/[locale]/events/events-client.tsx',
    actionName: 'sendEmail',
    leadType: 'event_inquiry',
    formLocation: 'events',
  },
  {
    filePath: 'src/app/[locale]/reservation/reservation-form.tsx',
    actionName: 'sendEmail',
    leadType: 'reservation_inquiry',
    formLocation: 'reservation',
  },
  {
    filePath:
      'src/app/[locale]/properties/[id]/property-details-client.tsx',
    actionName: 'sendEmail',
    leadType: 'reservation_inquiry',
    formLocation: 'property_detail',
  },
];

function source(filePath: string) {
  return readFileSync(join(root, filePath), 'utf8');
}

function parse(filePath: string) {
  return ts.createSourceFile(
    filePath,
    source(filePath),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
}

function collectCalls(
  sourceFile: ts.SourceFile,
  calleeName: string,
): ts.CallExpression[] {
  const calls: ts.CallExpression[] = [];

  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === calleeName
    ) {
      calls.push(node);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return calls;
}

function getStringProperty(
  object: ts.ObjectLiteralExpression,
  propertyName: string,
) {
  const property = object.properties.find(
    candidate =>
      ts.isPropertyAssignment(candidate) &&
      ts.isIdentifier(candidate.name) &&
      candidate.name.text === propertyName,
  );

  assert.ok(
    property && ts.isPropertyAssignment(property),
    `missing ${propertyName}`,
  );
  assert.ok(
    ts.isStringLiteral(property.initializer),
    `${propertyName} must be a string literal`,
  );

  return property.initializer.text;
}

function isResultSuccess(node: ts.Expression) {
  return (
    ts.isPropertyAccessExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === 'result' &&
    node.name.text === 'success'
  );
}

function findSuccessParent(call: ts.CallExpression) {
  let current: ts.Node | undefined = call;

  while (current) {
    if (
      ts.isIfStatement(current) &&
      isResultSuccess(current.expression) &&
      current.thenStatement.pos <= call.pos &&
      call.end <= current.thenStatement.end
    ) {
      return current;
    }

    current = current.parent;
  }

  return null;
}

function findResultAction(
  sourceFile: ts.SourceFile,
  actionName: Integration['actionName'],
  successParent: ts.IfStatement,
): ts.CallExpression | null {
  let resultAction: ts.CallExpression | null = null;
  const successFunction = findFunctionParent(successParent);

  function visit(node: ts.Node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'result' &&
      node.initializer &&
      ts.isAwaitExpression(node.initializer) &&
      ts.isCallExpression(node.initializer.expression) &&
      ts.isIdentifier(node.initializer.expression.expression) &&
      node.initializer.expression.expression.text === actionName &&
      findFunctionParent(node) === successFunction &&
      node.end < successParent.getStart(sourceFile)
    ) {
      resultAction = node.initializer.expression;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return resultAction;
}

function findFunctionParent(node: ts.Node) {
  let current: ts.Node | undefined = node;

  while (current) {
    if (
      ts.isFunctionDeclaration(current) ||
      ts.isFunctionExpression(current) ||
      ts.isArrowFunction(current) ||
      ts.isMethodDeclaration(current)
    ) {
      return current;
    }

    current = current.parent;
  }

  return null;
}

for (const integration of integrations) {
  test(`${integration.filePath} tracks one successful ${integration.leadType}`, () => {
    const sourceFile = parse(integration.filePath);
    const trackingCalls = collectCalls(sourceFile, 'trackMetaLead');

    assert.equal(trackingCalls.length, 1);

    const trackingCall = trackingCalls[0];
    const successParent = findSuccessParent(trackingCall);

    assert.ok(successParent, 'tracking must be inside if (result.success)');
    const resultAction = findResultAction(
      sourceFile,
      integration.actionName,
      successParent,
    );
    assert.ok(resultAction, 'the awaited server action result must be assigned');
    assert.ok(
      resultAction.end < successParent.getStart(sourceFile),
      'the server action must finish before the success branch',
    );

    const options = trackingCall.arguments[0];
    assert.ok(
      options && ts.isObjectLiteralExpression(options),
      'trackMetaLead must receive an object literal',
    );
    assert.equal(getStringProperty(options, 'leadType'), integration.leadType);
    assert.equal(
      getStringProperty(options, 'formLocation'),
      integration.formLocation,
    );
    assert.ok(
      options.properties.some(
        property =>
          ts.isShorthandPropertyAssignment(property) &&
          property.name.text === 'locale',
      ),
      'locale must be forwarded from the localized client',
    );
  });
}

for (const integration of integrations) {
  test(`${integration.filePath} mirrors the lead into GA4`, () => {
    const sourceFile = parse(integration.filePath);
    const trackingCalls = collectCalls(sourceFile, 'trackGaLead');

    assert.equal(
      trackingCalls.length,
      1,
      'every Meta lead must have exactly one GA4 counterpart',
    );

    const trackingCall = trackingCalls[0];
    const successParent = findSuccessParent(trackingCall);

    assert.ok(
      successParent,
      'GA4 tracking must sit inside the same if (result.success) branch',
    );

    const options = trackingCall.arguments[0];
    assert.ok(
      options && ts.isObjectLiteralExpression(options),
      'trackGaLead must receive an object literal',
    );
    assert.equal(getStringProperty(options, 'leadType'), integration.leadType);
    assert.equal(
      getStringProperty(options, 'formLocation'),
      integration.formLocation,
    );
    assert.ok(
      options.properties.some(
        property =>
          ts.isShorthandPropertyAssignment(property) &&
          property.name.text === 'locale',
      ),
      'locale must be forwarded from the localized client',
    );
  });
}

test('server email actions contain no Meta tracking', () => {
  for (const filePath of ['src/actions/contact.ts', 'src/actions/email.ts']) {
    const text = source(filePath);

    assert.doesNotMatch(text, /\btrackMetaLead\b/);
    assert.doesNotMatch(text, /\bfbq\b/);
    assert.doesNotMatch(text, /['"]Lead['"]/);
  }
});

test('the Meta helper cannot forward form data or personal fields', () => {
  const filePath = 'src/lib/meta-events.ts';
  const sourceFile = parse(filePath);
  const text = source(filePath);
  let leadPayload: ts.ObjectLiteralExpression | null = null;

  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'fbq' &&
      node.arguments.length === 3 &&
      ts.isStringLiteral(node.arguments[0]) &&
      node.arguments[0].text === 'track' &&
      ts.isStringLiteral(node.arguments[1]) &&
      node.arguments[1].text === 'Lead' &&
      ts.isObjectLiteralExpression(node.arguments[2])
    ) {
      leadPayload = node.arguments[2];
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  assert.ok(leadPayload, 'the standard Lead payload must exist');

  const payloadKeys = (leadPayload as ts.ObjectLiteralExpression).properties.map(
    property => {
      assert.ok(
        ts.isPropertyAssignment(property) ||
          ts.isShorthandPropertyAssignment(property),
      );
      return property.name.getText(sourceFile);
    },
  );

  assert.deepEqual(payloadKeys.sort(), [
    'content_category',
    'content_name',
    'locale',
  ]);

  const expectedPayloadValues = {
    content_name: 'leadType',
    content_category: 'formLocation',
    locale: 'locale',
  } as const;

  for (const [propertyName, expectedValue] of Object.entries(
    expectedPayloadValues,
  )) {
    const payloadProperty: ts.ObjectLiteralElementLike | undefined = (
      leadPayload as ts.ObjectLiteralExpression
    ).properties.find(
      candidate => candidate.name?.getText(sourceFile) === propertyName,
    );

    assert.ok(payloadProperty, `missing ${propertyName}`);

    if (ts.isShorthandPropertyAssignment(payloadProperty)) {
      assert.equal(payloadProperty.name.text, expectedValue);
    } else {
      assert.ok(ts.isPropertyAssignment(payloadProperty));
      assert.equal(payloadProperty.initializer.getText(sourceFile), expectedValue);
    }
  }

  assert.doesNotMatch(text, /\bFormData\b/);

  for (const personalField of [
    'name',
    'email',
    'phone',
    'message',
    'date',
    'checkIn',
    'checkOut',
    'guestCount',
    'guestsCount',
    'property',
    'price',
    'userInput',
  ]) {
    assert.doesNotMatch(
      text,
      new RegExp(`\\b${personalField}\\b`),
      `${personalField} must not be present in the helper`,
    );
  }
});
