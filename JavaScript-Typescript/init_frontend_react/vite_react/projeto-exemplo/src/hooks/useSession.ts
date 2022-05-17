import { useContext } from 'react';

import { UserSessionContext } from '../contexts';

export default function useSession() {
  return useContext(UserSessionContext);
}
