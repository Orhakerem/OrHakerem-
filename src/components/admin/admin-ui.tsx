import type { ReactNode } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Save,
  type LucideIcon,
} from 'lucide-react';

export const ADMIN_INPUT_CLASS =
  'h-11 w-full rounded-lg border-2 border-secondary/40 bg-white px-3 text-sm text-black placeholder-primary/30 outline-none transition-colors duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-cream/60 disabled:text-black/45';

export const ADMIN_TEXTAREA_CLASS =
  'w-full resize-none rounded-lg border-2 border-secondary/40 bg-white px-3 py-2 text-sm text-black outline-none transition-colors duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-cream/60 disabled:text-black/45';

export const ADMIN_LABEL_CLASS =
  'mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70';

export type AdminSectionSaveState = 'idle' | 'saving' | 'saved' | 'error';

interface AdminPanelProps {
  title: string;
  eyebrow: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
}

export function AdminPanel({
  title,
  eyebrow,
  description,
  icon: Icon,
  action,
  children,
}: AdminPanelProps) {
  return (
    <section className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {Icon ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            ) : null}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary/60">
                {eyebrow}
              </p>
              <h2 className="mt-1 font-head text-2xl font-light tracking-h3 text-black">
                {title}
              </h2>
            </div>
          </div>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      {children}
    </section>
  );
}

interface AdminFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | string;
  disabled?: boolean;
}

export function AdminField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  min,
  max,
  step,
  disabled = false,
}: AdminFieldProps) {
  return (
    <label className="block">
      <span className={ADMIN_LABEL_CLASS}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={ADMIN_INPUT_CLASS}
      />
    </label>
  );
}

interface AdminTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export function AdminTextarea({
  label,
  value,
  onChange,
  rows = 3,
}: AdminTextareaProps) {
  return (
    <label className="block">
      <span className={ADMIN_LABEL_CLASS}>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className={ADMIN_TEXTAREA_CLASS}
      />
    </label>
  );
}

export interface AdminSelectOption {
  value: string;
  label: string;
}

interface AdminSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly AdminSelectOption[];
  disabled?: boolean;
}

export function AdminSelect({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: AdminSelectProps) {
  return (
    <label className="block">
      <span className={ADMIN_LABEL_CLASS}>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className={ADMIN_INPUT_CLASS}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

interface AdminToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function AdminToggle({ label, checked, onChange }: AdminToggleProps) {
  return (
    <label className="flex h-11 items-center gap-2 rounded-lg border-2 border-secondary/30 bg-white px-3 text-sm font-medium text-black">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-secondary text-primary focus:ring-primary/20"
      />
      <span>{label}</span>
    </label>
  );
}

interface AdminIconButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  tone?: 'default' | 'danger';
}

export function AdminIconButton({
  label,
  icon: Icon,
  onClick,
  disabled = false,
  tone = 'default',
}: AdminIconButtonProps) {
  const toneClass =
    tone === 'danger'
      ? 'text-primary/70 hover:border-primary/40 hover:text-primary'
      : 'text-black/60 hover:border-primary/40 hover:text-primary';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`flex h-11 w-11 items-center justify-center rounded-lg border-2 border-secondary/40 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${toneClass}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

interface AdminSaveButtonProps {
  state: AdminSectionSaveState;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export function AdminSaveButton({
  state,
  onClick,
  disabled = false,
  label = 'Save section',
}: AdminSaveButtonProps) {
  const isSaving = state === 'saving';
  const Icon =
    state === 'saved' ? CheckCircle2 : state === 'error' ? AlertTriangle : isSaving ? Loader2 : Save;
  const text =
    state === 'saved' ? 'Saved' : state === 'error' ? 'Retry save' : isSaving ? 'Saving' : label;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isSaving}
      className="button-hover-clean inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-cream shadow-lg transition-all duration-300 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icon className={`h-4 w-4 ${isSaving ? 'animate-spin' : ''}`} aria-hidden="true" />
      {text}
    </button>
  );
}

interface AdminPillProps {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning';
}

export function AdminPill({ children, tone = 'neutral' }: AdminPillProps) {
  const toneClass =
    tone === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : tone === 'warning'
        ? 'border-amber-200 bg-amber-50 text-amber-900'
        : 'border-primary/15 bg-cream/60 text-black/65';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClass}`}
    >
      {children}
    </span>
  );
}
