import React from 'react';
import styled from 'styled-components';

import { NextProps } from '~/types/common';

type HelperTextProps = {
  text?: string;
};

const Text = styled.p`
  color: ${(props) => props.theme.gray800};
  font-size: 12px;
  margin: 0;
`;

const HelperText: NextProps<HelperTextProps> = ({ text }) => {
  return (
    <>
      {text && (
        <Text>
          {text.split(/(\n)/).map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.match(/\n/) ? <br /> : item}
              </React.Fragment>
            );
          })}
        </Text>
      )}
    </>
  );
};

export default React.memo<NextProps<HelperTextProps>>(HelperText);
