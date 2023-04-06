type ButtonProps = {
    type?: "default" | "danger" | "success" | "warning" | "info" | "custom";
    children?: React.ReactNode;
    onClick?: (e: any) => void;
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
    let buttonClassNames = "";
    if (disabled) {
        // Set the button to disabled and minus the color by 200 and 
        switch (type) {
            case "danger":
                buttonClassNames = "bg-danger-200";
                break;
            case "success":
                buttonClassNames = "bg-success-200";
                break;
            case "warning":
                buttonClassNames = "bg-warning-200";
                break;
            case "info":
                buttonClassNames = "bg-info-200";
                break;
            case "custom":
                buttonClassNames = "";
                break;
            default:
                buttonClassNames =
                    "bg-primary-300 text-white";
                break;
        }
    } else {
        switch (type) {
            case "danger":
                buttonClassNames = "bg-danger-400";
                break;
            case "success":
                buttonClassNames = "bg-success-400";
                break;
            case "warning":
                buttonClassNames = "bg-warning-400";
                break;
            case "info":
                buttonClassNames = "bg-info-400";
                break;
            case "custom":
                buttonClassNames = "";
                break;
            default:
                buttonClassNames =
                    "bg-primary-500 text-white hover:bg-primary-700";
                break;
        }
    }

    return (
        <button
            onClick={onClick}
            className={`${buttonClassNames}
        ${pill ? "rounded-full" : "rounded-md"} px-3 py-2 duration-200
        ${className}
    `}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
