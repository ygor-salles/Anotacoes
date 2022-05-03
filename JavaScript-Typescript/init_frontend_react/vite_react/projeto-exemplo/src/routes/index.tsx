import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Dashboard, Login } from '../pages';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      </Routes>
    </BrowserRouter>
  );
}
