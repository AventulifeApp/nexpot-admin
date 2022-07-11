import { signInWithEmailAndPassword } from '@firebase/auth';
import type { NextPage } from 'next';
import loadCustomRoutes from 'next/dist/lib/load-custom-routes';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, RhfTextInput } from '~/components';
import { auth } from '~/lib/firebase';

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
  email: string;
  password: string;
};

const CompanyCreate: NextPage = () => {
  const methods = useForm<FormValue>();
  const router = useRouter();

  return (
    <>
      <PageTitle>ログイン画面</PageTitle>
      <Div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(async ({ email, password }) => {
              try {
                await signInWithEmailAndPassword(auth, email, password);
              } catch (error) {
                console.error(error);
              }
              router.push('/top');
            })}
            noValidate
          >
            <RhfTextInput<FormValue>
              name='email'
              labelProps={{ children: 'メールアドレス' }}
              inputProps={{
                rules: {
                  pattern: {
                    message: 'メールアドレスを入力してください',
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  },
                  required: 'メールアドレスを入力してください',
                },
                type: 'email',
              }}
              width='100%'
            />
            <RhfTextInput<FormValue>
              name='password'
              labelProps={{ children: 'パスワード' }}
              inputProps={{
                rules: {
                  pattern: {
                    message: '8~24文字で入力してください',
                    value: /^[a-zA-Z0-9.?/-]{8,24}$/,
                  },
                  required: 'パスワードを入力してください',
                },
                type: 'password',
              }}
              width='100%'
              margin='24px 0 0 0'
            />
            <ButtonContainer>
              <Button color='blue' type='submit' width='50%'>
                ログイン
              </Button>
            </ButtonContainer>
          </form>
        </FormProvider>
      </Div>
    </>
  );
};

export default CompanyCreate;
