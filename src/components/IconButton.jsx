export function IconButton({
  label,
  onClick,
  children,
  disabled = false,
  showLabel = false,
  className = "px-4 py-2 rounded",
  ...props
}) {
  return (
    <div className="relative group inline-flex">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        title={label}
        className={`default-button text-center ${
          showLabel ? "inline-flex items-center justify-center gap-2" : ""
        } ${className}`}
        {...props}
      >
        {children}
        {showLabel && <span className="text-sm font-medium">{label}</span>}
      </button>

      {!showLabel && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-purple-900 text-white text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
        >
          {label}
        </span>
      )}
    </div>
  );
}
