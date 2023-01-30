import { ButtonProps, FlexProps } from "../utils/interfaces";
import styled from "styled-components";

const FlexContainer = styled.div<FlexProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ direction }) => direction || "wrap"};
  flex-grow: ${({ grow }) => grow || 0};
  flex-shrink: ${({ shrink }) => shrink || 1};
  flex-basis: ${({ direction }) => direction || "auto"};
  order: ${({ order }) => order || 0};
  flex: ${({ flex }) => flex || "0 1 auto"};
  height: ${({ height }) => height || "auto"};
  width: ${({ width }) => width || "auto"};
`;

const Flex = ({
  justifyContent,
  direction,
  wrap,
  grow,
  shrink,
  basis,
  order,
  flex,
  children,
  height,
  width,
}: FlexProps) => {
  return (
    <FlexContainer
      justifyContent={justifyContent}
      direction={direction}
      shrink={shrink}
      basis={basis}
      order={order}
      flex={flex}
      grow={grow}
      wrap={wrap}
      width={width}
      height={height}
    >
      {children}
    </FlexContainer>
  );
};

export default Flex;
