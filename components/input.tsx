type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
};

export default function Input({type, id, name, placeholder, autoFocus, required, className}: InputProps) {
  return (
    <input 
      type={type} id={id} name={name} placeholder={placeholder} autoFocus={autoFocus} required={required}
      className={`${className} bg-neutral-100 px-3 py-2 rounded-md text-neutral-900 placeholder:text-neutral-400`}
    />
  );
}
