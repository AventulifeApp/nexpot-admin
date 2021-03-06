import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Layout } from '~/components';
import { theme } from '~/constants/constants';
import { AuthProvider } from '~/lib/auth';

const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
}


* {
    box-sizing: border-box;
}
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
