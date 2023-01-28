import { SelectProps, OptionProps } from "../../utils/interfaces";

const Select = ({ handleChange, options, id, name }: SelectProps) => {
  return (
    <>
      <label htmlFor={id}>{name} </label>
      <select name={name} id={id} onChange={handleChange}>
        {options.map(({ name, value }: OptionProps, index: number) => (
          <option value={value} key={`${value}-${name}-${index}`}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
