import React from 'react';
import { LucideIcon } from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title,
  description,
  contactInfo,
  className = '',
  formSectionClassName = '',
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={`relative grid h-full w-full bg-white border border-secondary/40 rounded-2xl shadow-xl md:grid-cols-2 lg:grid-cols-5 ${className}`}
      {...props}
    >
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-5 md:p-8">
          {title && (
            <h2 className="font-head text-xl md:text-4xl lg:text-5xl font-bold text-black">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-xl text-sm text-black/70 md:text-base lg:text-lg">
              {description}
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-1">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`flex h-full w-full flex-col justify-center bg-cream/60 border-t border-secondary/40 p-5 md:p-8 md:col-span-1 md:border-t-0 md:border-l lg:col-span-3 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl [&>*]:w-full ${formSectionClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  href,
  className = '',
  ...props
}: ContactInfoProps) {
  const content = (
    <>
      <div className="rounded-lg bg-secondary-lighter p-3">
        <Icon className="h-5 w-5 text-black" />
      </div>
      <div>
        <p className="font-medium text-black">{label}</p>
        <p className="text-xs text-black/60">{value}</p>
      </div>
    </>
  );

  const baseClasses = `flex items-center gap-3 py-3 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`${baseClasses} transition-opacity hover:opacity-80`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {content}
    </div>
  );
}
