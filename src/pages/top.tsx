import type { NextPage } from 'next';
import styled from 'styled-components';
import { Button } from '~/components';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '~/lib/firebase';

const Div = styled.div`
  font-weight: bold;
`;

const Top: NextPage = () => {
  return (
    <Div>
      TOP
      <Button
        color='red'
        onClick={async () => {
          await signOut(auth);
        }}
      >
        ログアウト
      </Button>
    </Div>
  );
};

export default Top;
