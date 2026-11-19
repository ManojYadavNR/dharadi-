const sizes = {
  sm: { box: "h-10 w-10", img: "h-8 w-8" },
  md: { box: "h-12 w-12 lg:h-[52px] lg:w-[52px]", img: "h-10 w-10 lg:h-11 lg:w-11" },
  lg: { box: "h-[72px] w-[72px]", img: "h-14 w-14" },
};

export default function Logo({ size = "md", variant = "default", className = "" }) {
  const { box, img } = sizes[size];

  const imgEl = (
    <img
      src="/logo.png"
      alt="Dharadi"
      width={56}
      height={56}
      className={`${img} object-contain shrink-0`}
    />
  );

  if (variant === "onDark") {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-brand-cream shadow-md ring-1 ring-brand-cream/80 ${box} ${className}`}
      >
        {imgEl}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center justify-center ${box} ${className}`}>
      {imgEl}
    </span>
  );
}
