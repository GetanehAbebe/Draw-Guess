
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    name: string;
    value?: string;
    label: string,
};

function Input({ onChange, name, value , label, ...rest }: InputProps) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                onChange={(e)=>onChange(e)}
                name={name}
                value={value}
                id={name}
                {...rest}
            />

        </>

    );
}

export default Input;