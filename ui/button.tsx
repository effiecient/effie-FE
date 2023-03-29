type ButtonProps = {
  type?: "default" | "danger" | "success" | "warning" | "info" | "custom";
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  pill?: boolean;
};

export default function Button({
  type = "default",
  children,
  onClick = () => {},
  className,
  disabled = false,
  pill = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        type === "danger"
          ? "bg-danger-400"
          : type === "success"
          ? "bg-success-400"
          : type === "warning"
          ? "bg-warning-400"
          : type === "info"
          ? "bg-info-400"
          : type === "custom"
          ? ""
          : "bg-primary-500 text-white hover:bg-primary-700"
      }
        ${pill ? "rounded-full" : "rounded-md"} px-3 py-2 duration-200
        ${className}
    `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
