import useSession from '../../hooks/useSession';

export function UseContextAndUseCustomExample() {
  const { nameUser, logout } = useSession();

  return (
    <div>
      <h1>O usuário logado é {nameUser}</h1>
      <button type="button" onClick={logout}>
        Executar
      </button>
    </div>
  );
}
