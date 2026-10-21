interface Props {
  size?: number;
  variant?: "plate" | "plain";
  className?: string;
}

export function BrandMark({ size = 48, variant = "plate", className = "" }: Props) {
  const fontSize = Math.max(15, Math.round(size * 0.5));

  return (
    <span
      role="img"
      aria-label="VEXNA"
      className={`inline-flex items-baseline font-display leading-none select-none ${className}`}
      style={{ fontSize }}
    >
      <span className="font-black tracking-[-0.03em] text-gold-deep">V</span>
      <span className="font-semibold tracking-[0.16em]">EXNA</span>
      {variant === "plate" && (
        <span aria-hidden className="ml-1.5 h-[0.22em] w-[0.22em] rounded-full bg-gold" />
      )}
    </span>
  );
}
