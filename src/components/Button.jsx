export function PrimaryButton({ children, onClick, type = "button", className = "", href }) {
  const classes = `inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-brand-green text-brand-cream font-medium text-sm tracking-wide transition-all duration-300 hover:bg-brand-gold hover:text-brand-dark cursor-pointer ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, type = "button", className = "", href }) {
  const classes = `inline-flex items-center justify-center px-8 py-3.5 rounded-2xl border-2 border-brand-green text-brand-green font-medium text-sm tracking-wide transition-all duration-300 hover:bg-brand-cream hover:border-brand-gold hover:text-brand-green cursor-pointer bg-transparent ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
