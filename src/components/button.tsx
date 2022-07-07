import React, { Children } from 'react';
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
  border: none;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  :hover {
    background-color: ${(props) => BUTTON_COLORS[props.color].hover};
  }
  color: #333333;
`;

const Button: React.FC<ButtonProps> = ({
  isLoading,
  children,
  color = 'blue',
  width,
  onClick,
}) => {
  return (
    <Btn color={color} width={width} onClick={onClick}>
      {isLoading ? (
        <ReactLoading type='spin' width={28} height={28} />
      ) : (
        children
      )}
    </Btn>
  );
};

export default React.memo<NextProps<ButtonProps>>(Button);
