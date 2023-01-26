import React from "react";

export type ButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
    children?: React.ReactNode; 
    color?: "primary" | "secondary"; 
    disabled?: boolean; 
};

const Button = ({
    onClick,
    children,
    color = "primary",
    disabled,
}: ButtonProps) => {
    return (
        <button onClick={onClick} color={color} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button