import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Dashboard, Login } from '../pages';
import { UseCallbackExample } from '../pages/hooks-react-demo/UseCallbackExample';
import { UseContextAndUseCustomExample } from '../pages/hooks-react-demo/UseContextAndUseCustomExample';
import { UseEffectExample } from '../pages/hooks-react-demo/UseEffectExample';
import { UseMemoExample } from '../pages/hooks-react-demo/UseMemoExample';
import { UseRefExample } from '../pages/hooks-react-demo/UseRefExample';
import { MyForm } from '../pages/multiple-input/MultipleInput';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<Dashboard />} />
        <Route path="/form" element={<MyForm />} />
        <Route path="/useEffect" element={<UseEffectExample />} />
        <Route path="/useMemo" element={<UseMemoExample />} />
        <Route path="/useRef" element={<UseRefExample />} />
        <Route path="/useCallback" element={<UseCallbackExample />} />
        <Route path="/useContext" element={<UseContextAndUseCustomExample />} />

        <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      </Routes>
    </BrowserRouter>
  );
}
