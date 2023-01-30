import { ButtonProps } from "../../utils/interfaces";
import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColor || "green"};
  color: ${({ color }) => color || "black"};
  padding: ${({ padding }) => padding || "auto"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  cursor: pointer;
  border: ${({ border }) => border || "1px white solid"};
  font-weight: ${({ bold }) => (bold ? "bold" : "auto")};
  font-size: ${({ fontSize }) => fontSize || "auto"};
  width: ${({ width }) => width || "fit-content"};
  height: ${({ height }) => height || "fit-content"};
`;

const Button = ({
  onClick,
  children,
  disabled,
  backgroundColor,
  color,
  borderRadius,
  padding,
  bold,
  width,
  height,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      disabled={disabled}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      padding={padding}
      bold={bold}
      width={width}
      height={height}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
