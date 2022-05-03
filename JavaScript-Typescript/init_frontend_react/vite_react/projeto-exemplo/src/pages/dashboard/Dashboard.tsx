import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <>
      <p>Dashboard</p>
      <Link to="/login">Navegar para página de login</Link>
    </>
  );
}
