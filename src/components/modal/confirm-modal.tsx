import React from 'react';

import { NextProps } from '~/types/common';
import styled from 'styled-components';
import { BaseModal, Button } from '~/components';

type ConfirmModalProps = {
  showModal: boolean;
  title: string;
  content: React.ReactNode | string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm?: () => void;
  onCancel?: () => void;
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
`;

const ButtonContainer = styled.div`
  margin-left: 12px;
`;

const ConfirmModalProps: NextProps<ConfirmModalProps> = ({
  showModal,
  title,
  content,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}) => {
  return (
    <BaseModal showModal={showModal}>
      <>
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>{content}</ModalContent>
        <ModalButtonContainer>
          <ButtonContainer>
            <Button color='red' width='120px' onClick={onCancel}>
              {cancelButtonText}
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button color='green' width='120px' onClick={onConfirm}>
              {confirmButtonText}
            </Button>
          </ButtonContainer>
        </ModalButtonContainer>
      </>
    </BaseModal>
  );
};

export default React.memo<NextProps<ConfirmModalProps>>(ConfirmModalProps);
