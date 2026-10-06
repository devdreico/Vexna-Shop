import Image from "next/image";
import { SITE } from "@/data/config";

interface Props {
  size?: number;
  variant?: "plate" | "plain";
  className?: string;
}

export function BrandMark({ size = 48, variant = "plate", className = "" }: Props) {
  const dim = variant === "plate" ? size + 14 : size;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-sm ${
        variant === "plate" ? "bg-white p-1.5" : ""
      } ${className}`}
      style={{ width: dim, height: dim }}
      aria-hidden="true"
    >
      <Image
        src="/logo.png"
        alt={`${SITE.name} logo`}
        width={size}
        height={size}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
