import type { NextPage } from 'next';
import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { Button, ConfirmModal, RhfTextInput } from '~/components';
import { useCompanyCreateUseCase } from '~/model/usecase';
import { CompanyFormValue } from '~/types/common';

const Div = styled.div`
  margin: 40px auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.gray200};
  border-radius: 12px;
  padding: 20px;
  align-items: center;
`;

const PageTitle = styled.h2``;
const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 24px;
`;

const CompanyCreate: NextPage = () => {
  const {
    handleSubmit,
    methods,
    showModal,
    handleModalClose,
    handleModalCreate,
  } = useCompanyCreateUseCase();
  return (
    <>
      <PageTitle>契約会社登録画面</PageTitle>
      <Div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} noValidate>
            <RhfTextInput<CompanyFormValue>
              name='name'
              labelProps={{ children: '契約会社名' }}
              inputProps={{
                rules: {
                  maxLength: {
                    message: '101文字以上は入力出来ません	',
                    value: 100,
                  },
                  required: '契約会社名が入力されていません',
                },
              }}
              width='100%'
            />
            <RhfTextInput<CompanyFormValue>
              name='phone'
              labelProps={{ children: '電話番号' }}
              inputProps={{
                rules: {
                  pattern: {
                    message: '正しい電話番号を入力してください',
                    value: /^0[0-9]{9,10}$/,
                  },
                  required: '正しい電話番号を入力してください',
                },
              }}
              width='100%'
              margin='24px 0 0 0'
            />
            <ButtonContainer>
              <Button color='green' type='submit' width='50%'>
                登録
              </Button>
            </ButtonContainer>
            <ConfirmModal
              showModal={showModal}
              title={'契約会社情報登録'}
              content={'会社情報を登録します。'}
              leftButton={{
                text: '閉じる',
                onClick: handleModalClose,
                color: 'clear',
              }}
              rightButton={{
                text: '登録',
                onClick: handleModalCreate,
                color: 'green',
              }}
            />
          </form>
        </FormProvider>
      </Div>
    </>
  );
};

export default CompanyCreate;
