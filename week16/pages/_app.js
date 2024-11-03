import Head from 'next/head';
import Container from '@/components/Container';
import Header from '@/components/Header';
import { ThemeProvider } from '@/lib/ThemeContext';
import { Noto_Sans_KR } from '@next/font/google';
import '@/styles/globals.css';

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: [],
});
const fontStyle = `
  html {
    font-family: ${notoSansKR.style.fontFamily}, sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>watchit</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{fontStyle}</style>
      </Head>
      <ThemeProvider>
        <Header />
        <Container page>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}
