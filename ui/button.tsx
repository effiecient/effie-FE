import { useRenderingStore } from "@/hooks";

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
    const showSkeleton = useRenderingStore((state: any) => state.showSkeleton);
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
            !disabled &&
            `hover:bg-${type}-${borderMode ? "300" : "500"} hover:text-white`
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

    if (showSkeleton) {
        return (
            <div className="w-24 h-10 bg-neutral-200 animate-pulse rounded-full" />
        );
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
                          `hover:bg-primary-${
                              borderMode ? "500" : "700"
                          } hover:text-white `
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
                          `hover:bg-${type}-${
                              borderMode ? "300" : "500"
                          } hover:text-white`
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
