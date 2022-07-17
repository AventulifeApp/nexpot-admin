import type { NextPage } from 'next';
import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { Button, ConfirmModal, RhfTextInput } from '~/components';
import { useCompanyEditUseCase } from '~/model/usecase';

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

export type FormValue = {
  name: string;
  phone: string;
};

const CompanyCreate: NextPage = () => {
  const {
    handleSubmit,
    methods,
    showModal,
    company,
    handleModalClose,
    handleModalUpdate,
  } = useCompanyEditUseCase();

  return (
    <>
      <PageTitle>契約社作成画面</PageTitle>
      <Div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} noValidate>
            <RhfTextInput<FormValue>
              name='name'
              labelProps={{ children: '契約会社名' }}
              inputProps={{
                rules: {
                  maxLength: {
                    message: '100文字以上は入力出来ません	',
                    value: 100,
                  },
                  required: '契約会社名が入力されていません',
                },
                defaultValue: company?.name ?? '',
              }}
              width='100%'
            />
            <RhfTextInput<FormValue>
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
                defaultValue: company?.phone ?? '',
              }}
              width='100%'
              margin='24px 0 0 0'
            />
            <ButtonContainer>
              <Button color='green' type='submit' width='50%'>
                更新
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
                text: 'OK',
                onClick: handleModalUpdate,
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
