type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
};

export default function Input({type, id, name, placeholder}: InputProps) {
  return (
    <input 
      type={type} id={id} name={name} placeholder={placeholder}
      className='bg-neutral-100 px-3 py-2 rounded-md text-neutral-900 placeholder:text-neutral-400'
    />
  );
}
