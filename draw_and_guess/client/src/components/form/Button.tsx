import { ButtonProps } from "../../utils/interfaces";

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

export default Button;
