import { useState } from "react";

export function Input({
    placeholder,
    onChange,
    value = "",
    className,
    type = "text",
}: any) {
    const [inputValue, setInputValue] = useState(value);

    function handleChange(e: any) {
        setInputValue(e.target.value);
        onChange(e);
    }
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            value={inputValue}
            className={`${className} text-neutral-900 bg-neutral-100 py-2 px-3 w-full rounded-lg`}
        />
    );
}

// type InputProps = {
//     ref?: any;
//     type: string;
//     id: string;
//     name: string;
//     placeholder?: string;
//     required?: boolean;
//     autoFocus?: boolean;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     className?: string;
//     value?: string;
//   };

//   export default function Input({ref, type, id, name, placeholder, autoFocus, onChange, required, className}: InputProps) {
//     return (
//       <input
//         ref={ref} type={type} id={id} name={name} placeholder={placeholder} autoFocus={autoFocus} onChange={onChange} required={required}
//         className={`${className} input`}
//       />
//     );
//   }
