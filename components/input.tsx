type InputProps = {
  ref?: any;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
};

export default function Input({ref, type, id, name, placeholder, autoFocus, onChange, required, className}: InputProps) {
  return (
    <input 
      ref={ref} type={type} id={id} name={name} placeholder={placeholder} autoFocus={autoFocus} onChange={onChange} required={required}
      className={`${className} input`}
    />
  );
}
