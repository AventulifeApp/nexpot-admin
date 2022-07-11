import type { NextPage } from 'next';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  Button,
  ConfirmModal,
  RhfPullDown,
  RhfTextArea,
  RhfTextInput,
  Table,
} from '~/components';

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
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Div>
        <div>Buttons</div>
        <ButtonContainer>
          <Button color='blue' width='120px' onClick={() => setShowModal(true)}>
            モーダル表示
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
        <Table
          tableHeadData={[
            { title: '契約会社名', align: 'left', width: '100px' },
            { title: '電話番号', align: 'left', width: '200px' },
            { title: '' },
            { title: '削除', align: 'center' },
          ]}
          talbeData={[
            [
              { align: 'center', content: <>aaaa</> },
              { align: 'left', content: 'fjlsdfjsdlkf' },
              { align: 'right', content: <a href=''>編集画面</a> },
              { align: 'center', content: <input type={'checkbox'} /> },
            ],
            [
              { align: 'left', content: <></> },
              { align: 'left', content: 'fjlsdfjsdlkf' },
              { align: 'right', content: <a href=''>編集画面</a> },
              { align: 'center', content: <input type={'checkbox'} /> },
            ],
            [
              { align: 'left', content: <></> },
              { align: 'left', content: 'fjlsdfjsdlkf' },
              { align: 'right', content: <a href=''>編集画面</a> },
              { align: 'center', content: <input type={'checkbox'} /> },
            ],
          ]}
        />
        <ConfirmModal
          showModal={showModal}
          title={'モーダルタイトル'}
          content={`あいうえおあいうえおあいうえおあいうえおあいうえお あいうえお
          あいうえお あいうえおあいうえお あいうえおあいうえお あいうえお
          あいうえお あいうえお あいうえおあいうえお あいうえお あいうえお
          あいうえお あいうえお あいうえお あいうえお あいうえお あいうえお
          あいうえお あいうえお`}
          leftButton={{
            text: '閉じる',
            onClick: () => setShowModal(false),
            color: 'clear',
          }}
          rightButton={{
            text: '削除',
            onClick: () => alert('削除しました'),
            color: 'red',
          }}
        />
      </FormProvider>
    </>
  );
};

export default Home;
