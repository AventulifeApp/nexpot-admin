import { signOut } from 'firebase/auth';
import type { NextPage } from 'next';
import { Button } from '~/components';
import { auth } from '~/lib/firebase';

const Index: NextPage = () => {
  return (
    <>
      <Button color='red' type='button' onClick={() => signOut(auth)}>
        ログアウト
      </Button>
    </>
  );
};

export default Index;
