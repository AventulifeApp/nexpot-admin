import React from 'react';
import styled from 'styled-components';

import { ErrorText, HelperText, InputLabel } from '~/components';
import { NextProps } from '~/types/common';

type TextAreaProps = {
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
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    'id' | 'name' | 'ref'
  >;
  errorText?: string;
  helperText?: string;
  width?: string;
};

const TextAreaInput = styled.textarea<{ width: string }>`
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.gray400};
  color: ${(props) => props.theme.gray900};
  font-size: 14px;
  width: ${(props) => props.width};
  box-sizing: border-box;
`;

const TextArea: NextProps<TextAreaProps> = ({
  name,
  labelProps,
  inputProps,
  errorText,
  helperText,
  width = '120px',
}) => {
  return (
    <div>
      <InputLabel labelProps={{ ...labelProps, htmlFor: name }} />
      <br />
      <TextAreaInput {...inputProps} id={name} name={name} width={width} />
      {!errorText && <HelperText text={helperText} />}
      <ErrorText text={errorText} />
    </div>
  );
};

export default React.memo<NextProps<TextAreaProps>>(TextArea);
