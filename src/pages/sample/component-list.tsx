import type { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, RhfTextInput } from '~/components';

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-left: 12px;
`;

type FormValue = {
  username: string;
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
          onSubmit={methods.handleSubmit(({ username }) => {
            console.log({ username });
          })}
          noValidate
        >
          <Div>
            <div>form</div>
            <RhfTextInput<FormValue>
              name='username'
              labelProps={{ children: '表示名' }}
              inputProps={{
                rules: {
                  minLength: {
                    message: '3文字以上で入力してください',
                    value: 3,
                  },
                  required: 'ユーザーネームは必須です',
                },
                type: 'text',
                defaultValue: 'たつお' || '',
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
