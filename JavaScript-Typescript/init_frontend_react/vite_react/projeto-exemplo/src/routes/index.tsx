import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Dashboard, Login } from '../pages';
import { MyForm } from '../pages/multiple-input/MultipleInput';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<Dashboard />} />
        <Route path="/form" element={<MyForm />} />

        <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      </Routes>
    </BrowserRouter>
  );
}
