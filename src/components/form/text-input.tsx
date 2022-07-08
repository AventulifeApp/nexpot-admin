import React from 'react';
import styled from 'styled-components';

import { ErrorText, HelperText, InputLabel } from '~/components';
import { NextProps } from '~/types/common';

type TextInputProps = {
  name: string;
  labelProps: Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    'htmlFor'
  >;
  inputProps: Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'id' | 'name' | 'ref'
  >;
  errorText?: string;
  helperText?: string;
  width?: string;
};

const InputContainer = styled.div`
  display: block;
`;

const Input = styled.input<{ width: string }>`
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.gray400};
  color: ${(props) => props.theme.gray900};
  font-size: 16px;
  width: ${(props) => props.width};
  padding: 8px;
  box-sizing: border-box;
`;

const TextInput: NextProps<TextInputProps> = ({
  name,
  labelProps,
  inputProps,
  errorText,
  helperText,
  width = '120px',
}) => {
  return (
    <InputContainer>
      <InputLabel labelProps={{ ...labelProps, htmlFor: name }} />
      <br />
      <Input {...inputProps} id={name} name={name} width={width} />
      {!errorText && <HelperText text={helperText} />}
      <ErrorText text={errorText} />
    </InputContainer>
  );
};

export default React.memo<NextProps<TextInputProps>>(TextInput);
