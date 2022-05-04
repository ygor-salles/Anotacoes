import styled from 'styled-components';

import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Router } from './routes';
import { GlobalStyle } from './style/global';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Content>
        <Header />
        <Router />
        <Footer />
      </Content>
    </>
  );
}
