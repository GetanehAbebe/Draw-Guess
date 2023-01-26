import React from 'react'

interface OptionProps {
    value: string,
    name: string
}

interface SelectProps {
    options: OptionProps[],
    handleChange: React.ChangeEventHandler<HTMLSelectElement>,
    id: string,
    name: string

}

const Select = ({ handleChange, options, id, name }: SelectProps) => {
    return <>
        <label htmlFor={id}>{name} </label>
        <select name={name} id={id} onChange={handleChange}>
            {options.map(({ name, value }: OptionProps, index: number) => <option value={value} key={`${value}-${name}-${index}`}>{name}</option>)}
        </select>
    </>
}

export default Select