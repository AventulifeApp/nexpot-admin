import React from 'react';
import styled from 'styled-components';

import { NextProps } from '~/types/common';

type InputLabelProps = {
  labelProps?: Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    'ref'
  >;
};

const Label = styled.label`
  color: ${(props) => props.theme.gray900};
  font-size: 14px;
  margin: 0;
`;

const InputLabel: NextProps<InputLabelProps> = ({ labelProps }) => {
  return <>{labelProps && <Label {...labelProps} />}</>;
};

export default React.memo<NextProps<InputLabelProps>>(InputLabel);
