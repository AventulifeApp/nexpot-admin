import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { BUTTON_COLORS } from '~/constants/constants';
import { NextProps } from '~/types/common';

type ColorKeys = keyof typeof BUTTON_COLORS;

type ButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  color: ColorKeys;
  width?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const Btn = styled.button<{
  color: ColorKeys;
  width?: string;
}>`
  appearance: none;
  outline: none;
  padding: 8px 12px;
  background-color: ${(props) => BUTTON_COLORS[props.color].color};
  ${(props) => props.width && 'width:' + props.width};
  border-radius: 4px;
  border: ${(props) =>
    props.color === 'clear' ? `1px solid ${props.theme.gray300}` : 'none'};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  :hover,
  :focus {
    background-color: ${(props) => BUTTON_COLORS[props.color].hover};
  }

  color: ${(props) => props.theme.gray700};
`;

const Button: React.FC<ButtonProps> = ({
  isLoading,
  children,
  color = 'blue',
  width,
  onClick,
  type = 'button',
}) => {
  return (
    <Btn color={color} width={width} onClick={onClick} type={type}>
      {isLoading ? (
        <ReactLoading type='spin' width={28} height={28} />
      ) : (
        children
      )}
    </Btn>
  );
};

export default React.memo<NextProps<ButtonProps>>(Button);
