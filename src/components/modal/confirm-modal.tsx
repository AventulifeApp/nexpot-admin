import React from 'react';

import { ButtonColors, NextProps } from '~/types/common';
import styled from 'styled-components';
import { BaseModal, Button } from '~/components';

type ButtonParam = {
  text: string;
  onClick: () => void;
  color: ButtonColors;
};

type ConfirmModalProps = {
  showModal: boolean;
  title: string;
  content: React.ReactNode | string;
  leftButton: ButtonParam;
  rightButton: ButtonParam;
};

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.gray700};
  margin: 0;
`;

const ModalContent = styled.p`
  margin-top: 24px;
  color: ${(props) => props.theme.gray700};
  font-size: 14px;
  text-align: left;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const ConfirmModalProps: NextProps<ConfirmModalProps> = ({
  showModal,
  title,
  content,
  leftButton,
  rightButton,
}) => {
  return (
    <BaseModal showModal={showModal}>
      <>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{content}</ModalContent>
        <ModalButtonContainer>
          <Button
            color={leftButton.color}
            width='120px'
            onClick={leftButton.onClick}
          >
            {leftButton.text}
          </Button>
          <Button
            color={rightButton.color}
            width='120px'
            onClick={rightButton.onClick}
          >
            {rightButton.text}
          </Button>
        </ModalButtonContainer>
      </>
    </BaseModal>
  );
};

export default React.memo<NextProps<ConfirmModalProps>>(ConfirmModalProps);
