import { InputProps } from "../../utils/interfaces";

function Input({ onChange, name, value, label, ...rest }: InputProps) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        onChange={(e) => onChange(e)}
        name={name}
        value={value}
        id={name}
        {...rest}
      />
    </>
  );
}

export default Input;
