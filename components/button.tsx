type ButtonProps = {
  type?: "default" | "danger" | "success" | "warning" | "info";
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ type = "default", children, onClick = () => {} }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${type === "danger" ? "bg-danger-400" : type === "success" ? "bg-success-400" : type === "warning" ? "bg-warning-400" : type === "info" ? "bg-info-400" : "bg-primary-500 text-white hover:bg-primary-700"}
        rounded-md px-3 py-2 duration-300
    `}
    >
      {children}
    </button>
  );
}
