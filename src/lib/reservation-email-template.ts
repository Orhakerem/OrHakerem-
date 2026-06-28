import 'server-only';

import { SITE_URL } from '@/app/seo';
import type { ReservationLineItem, ReservationQuoteData } from './reservation-quote';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderLineItemRow(item: ReservationLineItem): string {
  return `
        <tr>
          <td class="desc">${escapeHtml(item.description)}</td>
          <td class="r">${escapeHtml(item.qty)}</td>
          <td class="r">${escapeHtml(item.unit)}</td>
          <td class="amt r">${escapeHtml(item.amount)}</td>
        </tr>`;
}

export function buildReservationEmailSubject(data: ReservationQuoteData): string {
  const ref = data.reservationNumber.trim();
  return ref
    ? `Your Or Hakerem reservation — ${ref}`
    : 'Your Or Hakerem reservation';
}

/**
 * Renders the reservation/invoice as a standalone HTML email, faithfully
 * reproducing the original "Or Hakerem" estimate design. All dynamic values are
 * HTML-escaped. Print/Cloudflare scripts from the source document are dropped.
 */
export function renderReservationEmailHtml(data: ReservationQuoteData): string {
  const logoUrl = `${SITE_URL}/logo/Logo_rouge.png`;
  const lineItemRows = data.lineItems.map(renderLineItemRow).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Or Hakerem — Reservation ${escapeHtml(data.guestName)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg: #efe7d7;
    --bg-soft: #f4ede0;
    --paper: #f8f3e8;
    --ink: #1a1a1a;
    --ink-soft: #3a3733;
    --ink-mute: #6b6660;
    --rule: #d6cdb9;
    --sun: #e8d8a8;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    background: #d6cebc;
    font-family: "Manrope", system-ui, sans-serif;
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 794px;
    max-width: 100%;
    min-height: 1123px;
    margin: 24px auto;
    background: var(--bg);
    position: relative;
    overflow: hidden;
    box-shadow: 0 16px 48px -16px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.06);
    padding: 64px 72px 96px;
    display: flex;
    flex-direction: column;
  }
  .page::before {
    content: "";
    position: absolute;
    top: 28px; left: 28px;
    width: 8px; height: 8px;
    background: var(--ink);
  }
  .corner-r {
    position: absolute; top: 28px; right: 28px;
    width: 8px; height: 8px;
    background: var(--ink);
  }
  .sun {
    position: absolute;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: var(--sun);
    top: -40px; right: -40px;
    opacity: 0.5;
  }
  .header-rule {
    position: absolute;
    top: 32px; left: 64px; right: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    color: var(--ink-mute);
    text-transform: uppercase;
  }
  .doc-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--rule);
    margin-bottom: 32px;
    position: relative;
    z-index: 2;
  }
  .logo { width: 96px; margin-bottom: 12px; }
  .logo img { width: 100%; display: block; }
  .kicker {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-bottom: 6px;
  }
  h1 {
    font-family: "Cormorant", serif;
    font-weight: 300;
    font-size: 56px;
    line-height: 0.95;
    letter-spacing: -0.015em;
    margin: 0;
    color: var(--ink);
  }
  h1 em { font-weight: 300; font-style: italic; }
  .doc-num {
    text-align: right;
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    color: var(--ink-mute);
    text-transform: uppercase;
    line-height: 1.6;
  }
  .doc-num .num {
    font-family: "Cormorant", serif;
    font-style: italic;
    font-size: 28px;
    text-transform: none;
    letter-spacing: 0;
    color: var(--ink);
    line-height: 1;
    margin-top: 2px;
    display: block;
  }
  .doc-num .num-sm {
    font-family: "Cormorant", serif;
    font-style: italic;
    font-size: 18px;
    text-transform: none;
    letter-spacing: 0;
    color: var(--ink);
    line-height: 1;
    margin-top: 8px;
    display: block;
  }
  .section-kicker {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin: 0 0 10px;
  }
  h2 {
    font-family: "Cormorant", serif;
    font-weight: 400;
    font-size: 34px;
    line-height: 1;
    margin: 0 0 18px;
    color: var(--ink);
  }
  h2 em { font-style: italic; font-weight: 300; }
  .res-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 56px;
    border-top: 1px solid var(--rule);
  }
  .res-row {
    display: grid;
    grid-template-columns: 130px 1fr;
    align-items: baseline;
    padding: 14px 0;
    border-bottom: 1px solid var(--rule);
    font-size: 12.5px;
    gap: 18px;
  }
  .res-row .label {
    font-family: "DM Mono", monospace;
    font-size: 9.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-mute);
  }
  .res-row .val { color: var(--ink); font-weight: 500; }
  .checkin-strip {
    margin-top: 28px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
  }
  .checkin-strip > div { background: var(--bg); padding: 22px 24px; }
  .checkin-strip .l {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-bottom: 10px;
  }
  .checkin-strip .v {
    font-family: "Cormorant", serif;
    font-size: 28px;
    font-weight: 400;
    color: var(--ink);
    line-height: 1;
  }
  .checkin-strip .v small {
    display: block;
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    color: var(--ink-mute);
    margin-top: 8px;
    text-transform: uppercase;
  }
  .invoice { margin-top: 36px; }
  .invoice-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .invoice h3 {
    font-family: "Cormorant", serif;
    font-weight: 400;
    font-size: 26px;
    margin: 0;
    color: var(--ink);
  }
  .invoice h3 em { font-style: italic; font-weight: 300; }
  .pill {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.22em;
    color: var(--ink-mute);
    text-transform: uppercase;
  }
  .invoice-table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid var(--ink);
    border-bottom: 1px solid var(--ink);
    font-size: 12.5px;
  }
  .invoice-table th {
    text-align: left;
    font-family: "DM Mono", monospace;
    font-size: 9.5px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-mute);
    font-weight: 500;
    padding: 12px 0;
    border-bottom: 1px solid var(--rule);
  }
  .invoice-table th.r, .invoice-table td.r { text-align: right; }
  .invoice-table td {
    padding: 14px 0;
    border-bottom: 1px dotted var(--rule);
    color: var(--ink-soft);
    vertical-align: top;
  }
  .invoice-table td.desc { color: var(--ink); font-weight: 500; }
  .invoice-table td.amt { color: var(--ink); font-weight: 500; }
  .invoice-table tr:last-child td { border-bottom: none; }
  .invoice-totals {
    margin-top: 20px;
    margin-left: auto;
    width: 320px;
    max-width: 100%;
    font-size: 12.5px;
  }
  .totals-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    color: var(--ink-soft);
  }
  .totals-row.sub { border-bottom: 1px dotted var(--rule); }
  .totals-row .v { color: var(--ink); font-weight: 500; }
  .totals-row.grand {
    border-top: 1px solid var(--ink);
    margin-top: 8px;
    padding: 18px 0 6px;
    font-family: "Cormorant", serif;
    font-size: 22px;
    font-weight: 400;
    color: var(--ink);
  }
  .totals-row.grand .v { font-size: 22px; }
  .pay-status {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 28px;
  }
  .pay-card {
    background: var(--paper);
    border: 1px solid var(--rule);
    padding: 22px 24px;
  }
  .pay-card .label {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-mute);
    margin-bottom: 14px;
  }
  .pay-card .method {
    font-family: "Cormorant", serif;
    font-size: 22px;
    color: var(--ink);
    margin-bottom: 14px;
  }
  .pay-card .row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 12px;
    color: var(--ink-soft);
    border-bottom: 1px dotted var(--rule);
  }
  .pay-card .row:last-child { border-bottom: none; }
  .pay-card .row .v { color: var(--ink); font-weight: 500; }
  .balance {
    background: var(--ink);
    color: var(--bg);
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .balance .label {
    font-family: "DM Mono", monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.65;
  }
  .balance .amount {
    font-family: "Cormorant", serif;
    font-size: 56px;
    font-weight: 300;
    line-height: 1;
    margin: 12px 0;
  }
  .balance .note {
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.65;
  }
  .closing {
    margin-top: 32px;
    font-size: 12px;
    line-height: 1.65;
    color: var(--ink-soft);
    padding-top: 20px;
    border-top: 1px solid var(--rule);
    max-width: 560px;
  }
  .closing strong { color: var(--ink); font-weight: 600; }
  .fine-print {
    margin-top: auto;
    padding-top: 24px;
    border-top: 1px solid var(--rule);
    font-family: "DM Mono", monospace;
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-mute);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .fine-print .links { display: flex; gap: 22px; }
</style>
</head>
<body>
<div class="page">
  <div class="corner-r"></div>
  <div class="sun"></div>
  <div class="header-rule">
    <span>OR HAKEREM</span>
    <span>Reservation · Invoice</span>
  </div>

  <div class="doc-header">
    <div>
      <div class="logo">
        <img src="${logoUrl}" alt="Or Hakerem" />
      </div>
      <div class="kicker">Booking confirmation</div>
      <h1>Reservation<br/><em>&amp; invoice.</em></h1>
    </div>
    <div class="doc-num">
      <span>Reservation №</span>
      <span class="num">${escapeHtml(data.reservationNumber)}</span>
      <span style="margin-top: 16px; display:block;">Issued on</span>
      <span class="num-sm">${escapeHtml(data.issuedOn)}</span>
    </div>
  </div>

  <div class="section-kicker">Section i — Traveller &amp; stay</div>
  <h2>Reservation <em>details.</em></h2>

  <div class="res-grid">
    <div class="res-row"><span class="label">Guest name</span><span class="val">${escapeHtml(data.guestName)}</span></div>
    <div class="res-row"><span class="label">ID / Passport №</span><span class="val">${escapeHtml(data.idPassport)}</span></div>
    <div class="res-row"><span class="label">Nationality</span><span class="val">${escapeHtml(data.nationality)}</span></div>
    <div class="res-row"><span class="label">Contact</span><span class="val">${escapeHtml(data.contact)}</span></div>
    <div class="res-row"><span class="label">Apartment</span><span class="val">${escapeHtml(data.apartment)}</span></div>
    <div class="res-row"><span class="label">Travellers</span><span class="val">${escapeHtml(data.travellers)}</span></div>
    <div class="res-row"><span class="label">Order date</span><span class="val">${escapeHtml(data.orderDate)}</span></div>
    <div class="res-row"><span class="label">Nights</span><span class="val">${escapeHtml(data.nights)}</span></div>
  </div>

  <div class="checkin-strip">
    <div>
      <div class="l">Check-in</div>
      <div class="v">${escapeHtml(data.checkInDate)}<small>${escapeHtml(data.checkInTime)}</small></div>
    </div>
    <div>
      <div class="l">Check-out</div>
      <div class="v">${escapeHtml(data.checkOutDate)}<small>${escapeHtml(data.checkOutTime)}</small></div>
    </div>
    <div>
      <div class="l">Apartment access</div>
      <div class="v"><small>${escapeHtml(data.apartmentAccess)}</small></div>
    </div>
  </div>

  <div class="invoice">
    <div class="invoice-head">
      <h3>Invoice <em>breakdown.</em></h3>
      <span class="pill">Currency · ${escapeHtml(data.currency)}</span>
    </div>
    <table class="invoice-table">
      <thead>
        <tr>
          <th>Description</th>
          <th class="r">Qty</th>
          <th class="r">Unit</th>
          <th class="r">Amount</th>
        </tr>
      </thead>
      <tbody>${lineItemRows}
      </tbody>
    </table>
    <div class="invoice-totals">
      <div class="totals-row sub"><span>Subtotal</span><span class="v">${escapeHtml(data.subtotal)}</span></div>
      <div class="totals-row sub"><span>VAT (18%)</span><span class="v">${escapeHtml(data.vatNote)}</span></div>
      <div class="totals-row grand"><span>Total</span><span class="v">${escapeHtml(data.total)}</span></div>
    </div>
  </div>

  <div class="pay-status">
    <div class="pay-card">
      <div class="label">Payment method</div>
      <div class="method">${escapeHtml(data.paymentMethod)}</div>
      <div class="row"><span>Deposit paid</span><span class="v">${escapeHtml(data.depositPaid)}</span></div>
      <div class="row"><span>Paid on</span><span class="v">${escapeHtml(data.paidOn)}</span></div>
      <div class="row"><span>Balance due</span><span class="v">${escapeHtml(data.balanceDue)}</span></div>
      <div class="row"><span>Due on</span><span class="v">${escapeHtml(data.dueOn)}</span></div>
      <div class="row"><span>Security deposit</span><span class="v">${escapeHtml(data.securityDeposit)}</span></div>
    </div>
    <div class="balance">
      <div class="label">Balance remaining</div>
      <div class="amount">${escapeHtml(data.balanceRemaining)}</div>
      <div class="note">Balance remaining · due</div>
    </div>
  </div>

  <div class="closing">${escapeHtml(data.closingNote)}</div>

  <div class="fine-print">
    <span>Or Hakerem · est. Tel Aviv</span>
    <div class="links">
      <span>orhakerem.com</span>
      <span>@or_hakerem</span>
    </div>
  </div>
</div>
</body>
</html>`;
}
