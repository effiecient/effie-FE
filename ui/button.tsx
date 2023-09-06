import { useSnackbarStore } from "@/hooks";

type ButtonProps = {
    type?: "default" | "danger" | "success" | "warning" | "info" | "custom";
    children?: React.ReactNode;
    onClick?: (e: any) => void;
    className?: string;
    disabled?: boolean;
    pill?: boolean;
    borderMode?: boolean;
};

export default function Button({
    type = "default",
    children,
    onClick = () => {},
    className,
    disabled = false,
    pill = false,
    borderMode = false,
}: ButtonProps) {
    let buttonClassNames = "";

    if (
        type === "danger" ||
        type === "success" ||
        type === "warning" ||
        type === "info"
    ) {
        // set color
        buttonClassNames = `${borderMode ? "border" : "bg"}-${type}-${
            disabled ? "100" : "300"
        }`;
        // set text
        buttonClassNames += ` ${
            borderMode
                ? `text-${type}-${disabled ? "100" : "300"}`
                : "text-white"
        }`;
        // set on hover
        buttonClassNames += ` ${
            `!disabled:hover:bg-${type}-${borderMode ? "50" : "500"}`
        }`;
    } else if (type === "default") {
        // set color
        buttonClassNames = `${borderMode ? "border" : "bg"}-primary-${
            disabled ? "300" : "500"
        }`;
        // set text
        buttonClassNames += `${
            borderMode
                ? `text-primary-${disabled ? "300" : "500"}`
                : "text-white"
        }`;
        // set on hover
        buttonClassNames += `${
            !disabled &&
            `hover:bg-primary-${borderMode ? "500" : "700"} hover:text-white `
        }`;
    }

    if (borderMode) {
        buttonClassNames += " border-2";
    }

    return (
        <button
            onClick={onClick}
            className={`${
                type === "default"
                    ? `${borderMode ? "border" : "bg"}-primary-${
                          disabled ? "300" : "500"
                      } ${
                          borderMode
                              ? `text-primary-${disabled ? "300" : "500"}`
                              : "text-white"
                      } ${
                          !disabled &&
                          `hover:bg-primary-${borderMode ? "50" : "700"}`
                      }`
                    : type === "custom"
                    ? ""
                    : `${borderMode ? "border" : "bg"}-${type}-${
                          disabled ? "100" : "300"
                      }  ${
                          borderMode
                              ? `text-${type}-${disabled ? "100" : "300"}`
                              : "text-white"
                      }  ${
                          !disabled &&
                          `hover:bg-${type}-${borderMode ? "50" : "500"}`
                      }`
            } ${borderMode ? "border-2" : ""}
        ${pill ? "rounded-full" : "rounded-md"} px-3 py-2 duration-200 
        ${className}
    `}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
