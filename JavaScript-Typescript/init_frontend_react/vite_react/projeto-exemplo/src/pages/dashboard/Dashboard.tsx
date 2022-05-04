import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <>
      <p>Dashboard</p>
      <br />
      <Link to="/login">Navegar para página de login</Link>
      <br />
      <br />
      <Link to="/form">Navegar para formulário</Link>
    </>
  );
}
