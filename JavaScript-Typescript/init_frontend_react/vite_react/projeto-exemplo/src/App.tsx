import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Router } from './routes';
import { GlobalStyle } from './style/global';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
      <Footer />
    </>
  );
}
