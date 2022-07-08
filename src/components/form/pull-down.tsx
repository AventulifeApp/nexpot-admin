import React from 'react';
import styled from 'styled-components';

import { ErrorText, HelperText, InputLabel } from '~/components';
import { NextProps } from '~/types/common';

type PullDownProps = {
  name: string;
  labelProps: Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    'htmlFor'
  >;
  selectProps: Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'id' | 'name' | 'ref'
  >;
  errorText?: string;
  helperText?: string;
  width?: string;
  options: React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >[];
};

const Select = styled.select<{ width: string }>`
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.gray400};
  color: ${(props) => props.theme.gray900};
  font-size: 16px;
  width: ${(props) => props.width};
  padding: 8px;
  box-sizing: border-box;
`;

const PullDown: NextProps<PullDownProps> = ({
  name,
  labelProps,
  selectProps,
  errorText,
  helperText,
  width = '120px',
  options,
}) => {
  return (
    <div>
      <InputLabel labelProps={{ ...labelProps, htmlFor: name }} />
      <br />
      <Select {...selectProps} id={name} name={name} width={width}>
        <option key={'blank'} value={''}></option>
        {options.map((option) => {
          return (
            <option key={option.value as string | number} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </Select>
      {!errorText && <HelperText text={helperText} />}
      <ErrorText text={errorText} />
    </div>
  );
};

export default React.memo<NextProps<PullDownProps>>(PullDown);
