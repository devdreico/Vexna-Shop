const focus = "btn-focus";

const baseBtn =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide uppercase transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

export const btnPrimary = `${baseBtn} bg-gold text-ink shadow-[0_12px_28px_-14px_rgba(255,214,10,0.85)] hover:bg-gold-light ${focus}`;

export const btnGold = btnPrimary;

export const btnInk = `${baseBtn} bg-ink text-white hover:bg-ink-700 ${focus}`;

export const btnOutlineGold = `${baseBtn} border border-gold-deep/70 text-gold-deep hover:bg-gold hover:text-ink hover:border-gold ${focus}`;

export const btnOutlineOnDark = `${baseBtn} border border-white/35 text-white hover:border-gold hover:bg-gold hover:text-ink ${focus}`;

export const btnOutlineInk = `${baseBtn} border border-ink/40 text-ink hover:bg-ink hover:text-gold ${focus}`;

export const card =
  "rounded-3xl glass-light transition duration-300 hover:-translate-y-1 hover:border-gold/70";

export const input =
  "w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm font-medium text-fg placeholder:text-muted focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/30 transition";

export const label = "mb-1.5 block text-xs font-bold tracking-[0.14em] text-muted uppercase";

export const eyebrow =
  "inline-flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold-deep uppercase before:h-1.5 before:w-1.5 before:rounded-full before:bg-gold before:content-['']";

const baseBtnSm =
  "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold tracking-wide uppercase transition duration-200 active:scale-[0.97] btn-focus";

export const btnPrimarySm = `${baseBtnSm} bg-gold text-ink hover:bg-gold-light`;

export const btnOutlineGoldSm = `${baseBtnSm} border border-gold-deep/70 text-gold-deep hover:bg-gold hover:border-gold hover:text-ink`;

export const btnOutlineSm = `${baseBtnSm} border border-line text-fg hover:border-gold hover:text-ink hover:bg-gold`;
