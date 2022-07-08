import type { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, RhfPullDown, RhfTextArea, RhfTextInput } from '~/components';

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-left: 12px;
`;

type FormValue = {
  username: string;
  gender: string;
  description: string;
};

const Home: NextPage = () => {
  const methods = useForm<FormValue>();

  return (
    <>
      <Div>
        <div>Buttons</div>
        <ButtonContainer>
          <Button color='blue' width='120px'>
            検索
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button color='red' width='80px'>
            削除
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button color='green'>登録</Button>
        </ButtonContainer>
      </Div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((value) => {
            console.log({ value });
          })}
          noValidate
        >
          <Div>
            <div>form</div>
            <RhfTextInput<FormValue>
              name='username'
              labelProps={{ children: 'ユーザー名' }}
              inputProps={{
                rules: {
                  minLength: {
                    message: '3文字以上で入力してください',
                    value: 3,
                  },
                  required: 'ユーザーネームは必須です。',
                },
                type: 'text',
              }}
              helperText='ヘルパーだよ'
            />
            <RhfPullDown<FormValue>
              name='gender'
              labelProps={{ children: '性別' }}
              selectProps={{
                rules: {
                  required: '性別は必須です。',
                },
              }}
              helperText='ヘルパーだよ'
              options={[
                { value: 'male', label: '男性' },
                { value: 'female', label: '女性' },
              ]}
            />
            <RhfTextArea<FormValue>
              name='description'
              labelProps={{ children: '説明' }}
              inputProps={{
                rules: {
                  maxLength: {
                    message: '100文字以内で入力してください。',
                    value: 100,
                  },
                  required: '説明は必須です。',
                },
              }}
              helperText='ヘルパーだよ'
            />
            <Button color='green' type='submit'>
              登録
            </Button>
          </Div>
        </form>
      </FormProvider>
    </>
  );
};

export default Home;
