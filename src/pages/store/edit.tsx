import type { NextPage } from 'next';
import { FormProvider } from 'react-hook-form';
import Loading from 'react-loading';
import styled from 'styled-components';
import { Button, ConfirmModal, ErrorText, RhfTextInput } from '~/components';
import { useStoreEditUseCase } from '~/model/usecase';
import { StoreFormValue } from '~/types/common';

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

const RowContainer = styled.div`
  display: flex;

  div + div {
    margin-left: 10px;
  }
`;

const AddressTitle = styled.h3`
  margin-top: 24px;
`;

const CompanyCreate: NextPage = () => {
  const {
    handleSubmit,
    methods,
    showModal,
    errorMessage,
    store,
    handleModalClose,
    handleModalUpdate,
  } = useStoreEditUseCase();

  if (!store) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>店舗登録画面</PageTitle>
      <Div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} noValidate>
            <RowContainer>
              <RhfTextInput<StoreFormValue>
                name='companyName'
                labelProps={{ children: '契約会社名' }}
                inputProps={{
                  disabled: true,
                  rules: {
                    maxLength: {
                      message: '101文字以上は入力出来ません	',
                      value: 100,
                    },
                    required: '契約会社名が入力されていません',
                  },
                  defaultValue: store?.companyName,
                }}
                width='100%'
              />
              <RhfTextInput<StoreFormValue>
                name='name'
                labelProps={{ children: '店舗名' }}
                inputProps={{
                  rules: {
                    maxLength: {
                      message: '店舗名は255文字以下で入力してください',
                      value: 255,
                    },
                    required: '店舗名を入力してください	',
                  },
                  defaultValue: store?.name,
                }}
                width='100%'
              />
            </RowContainer>
            <RhfTextInput<StoreFormValue>
              name='phone'
              labelProps={{ children: '電話番号' }}
              inputProps={{
                rules: {
                  pattern: {
                    message: '正しい電話番号を入力してください',
                    value: /^0[0-9]{9,10}$/,
                  },
                  required: '電話番号を入力してください',
                },
                defaultValue: store?.phone,
              }}
              width='50%'
              margin='24px 0 0 0'
            />
            <AddressTitle>住所</AddressTitle>
            <RowContainer>
              <RhfTextInput<StoreFormValue>
                name='postCode'
                labelProps={{ children: '郵便番号' }}
                inputProps={{
                  rules: {
                    pattern: {
                      message: '正しい郵便番号を入力してください',
                      value: /^[0-9]{3}-[0-9]{4}$/,
                    },
                    required: '郵便番号を入力してください',
                  },
                  defaultValue: store?.postCode,
                }}
                width='100%'
              />
              <RhfTextInput<StoreFormValue>
                name='prefecture'
                labelProps={{ children: '都道府県' }}
                inputProps={{
                  rules: {
                    maxLength: {
                      message: '都道府県を入力してください',
                      value: 5,
                    },
                    required: '都道府県を入力してください',
                  },
                  defaultValue: store?.prefecture,
                }}
                width='100%'
              />
            </RowContainer>
            <RhfTextInput<StoreFormValue>
              name='municipality'
              labelProps={{ children: '市区町村' }}
              inputProps={{
                rules: {
                  maxLength: {
                    message: '市区町村は255文字以下で入力してください',
                    value: 255,
                  },
                  required: '市区町村を入力してください',
                },
                defaultValue: store?.municipality,
              }}
              width='50%'
              margin='24px 0 0 0'
            />
            <RhfTextInput<StoreFormValue>
              name='block'
              labelProps={{ children: '番地' }}
              inputProps={{
                rules: {
                  maxLength: {
                    message: '番地は255文字以下で入力してください',
                    value: 255,
                  },
                  required: '番地を入力してください',
                },
                defaultValue: store?.block,
              }}
              width='50%'
              margin='24px 0 0 0'
            />
            <RhfTextInput<StoreFormValue>
              name='buildingName'
              labelProps={{ children: '建物名・部屋番号' }}
              inputProps={{
                rules: {
                  maxLength: {
                    message: '建物名・部屋番号は255文字以下で入力してください',
                    value: 255,
                  },
                  required: '建物名・部屋番号を入力してください',
                },
                defaultValue: store?.buildingName,
              }}
              width='50%'
              margin='24px 0 0 0'
            />

            {errorMessage && (
              <ErrorText text={errorMessage} margin='24px 0 0 0' />
            )}
            <ButtonContainer>
              <Button color='green' type='submit' width='50%'>
                登録
              </Button>
            </ButtonContainer>
            <ConfirmModal
              showModal={showModal}
              title={'店舗情報更新'}
              content={'店舗情報を更新します。'}
              leftButton={{
                text: 'キャンセル',
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
