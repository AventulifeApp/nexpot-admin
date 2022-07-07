import type { NextPage } from 'next';
import styled from 'styled-components';
import { Button } from '~/components';

const Div = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  margin-left: 12px;
`;

const Home: NextPage = () => {
  return (
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
  );
};

export default Home;
