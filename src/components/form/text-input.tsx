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
};

const InputContainer = styled.div`
  display: block;
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.gray400};
  color: ${(props) => props.theme.gray900};
  font-size: 16px;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const TextInput: NextProps<TextInputProps> = ({
  name,
  labelProps,
  inputProps,
  errorText,
  helperText,
}) => {
  return (
    <InputContainer>
      <InputLabel labelProps={{ ...labelProps, htmlFor: name }} />
      <br />
      <Input {...inputProps} id={name} name={name} />
      {!errorText && <HelperText text={helperText} />}
      <ErrorText text={errorText} />
    </InputContainer>
  );
};

export default React.memo<NextProps<TextInputProps>>(TextInput);
