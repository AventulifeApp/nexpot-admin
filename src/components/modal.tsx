import React from 'react';

import { NextProps } from '~/types/common';
import styled from 'styled-components';

type ModalProps = {
  children: JSX.Element;
  onClose?: () => void;
  showModal: boolean;
};

const Cover = styled.div<{ showModal: boolean }>`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.showModal ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
`;

const ModalContainer = styled.div`
  width: calc(100% - 3rem);
  max-width: 400px;
  padding: 2rem;
  border-radius: 20px;
  background-color: ${(props) => props.theme.gray100};
  text-align: center;
`;

const Modal: NextProps<ModalProps> = ({ children, onClose, showModal }) => {
  return (
    <Cover onClick={onClose} showModal={showModal}>
      <ModalContainer>{children}</ModalContainer>
    </Cover>
  );
};

export default React.memo<NextProps<ModalProps>>(Modal);
