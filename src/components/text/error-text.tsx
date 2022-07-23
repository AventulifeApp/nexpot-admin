import React from 'react';
import styled from 'styled-components';

import { NextProps } from '~/types/common';

type ErrorTextProps = {
  text?: string;
  margin?: string;
};

const Text = styled.p<{ margin?: string }>`
  color: ${(props) => props.theme.error};
  font-size: 12px;
  margin: 0;
  ${(props) => props.margin && 'margin: ' + props.margin};
`;

const ErrorText: NextProps<ErrorTextProps> = ({ text, margin }) => {
  return <>{text && <Text margin={margin}>{text}</Text>}</>;
};

export default React.memo<NextProps<ErrorTextProps>>(ErrorText);
