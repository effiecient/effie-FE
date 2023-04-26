export function Select({ options, className, onChange, defaultValue }: any) {
    return (
        <select
            className={`${className} text-neutral-900 bg-neutral-100 py-2 px-3 w-full rounded-lg`}
            onChange={onChange}
        >
            {options.map((option: any, index: any) => (
                <option
                    key={option.value}
                    value={option.value}
                    selected={option.value === defaultValue}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}
