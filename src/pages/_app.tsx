import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Layout } from '~/components';
import { theme } from '~/constants/constants';

const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

* {
    box-sizing: border-box;
}
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
