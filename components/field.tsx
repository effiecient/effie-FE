export default function Input(type: string, id: string, name: string, placeholder?: string) {
  return (
    <input 
        type={type} id={id} name={name} placeholder={placeholder}
        className=''
    />
  );
}
