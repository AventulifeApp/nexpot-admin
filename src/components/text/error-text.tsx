import React from 'react';
import styled from 'styled-components';

import { NextProps } from '~/types/common';

type ErrorTextProps = {
  text?: string;
};

const Text = styled.p`
  color: ${(props) => props.theme.error};
  font-size: 12px;
  margin: 0;
`;

const ErrorText: NextProps<ErrorTextProps> = ({ text }) => {
  return <>{text && <Text>{text}</Text>}</>;
};

export default React.memo<NextProps<ErrorTextProps>>(ErrorText);
