import useUser from './hooks/useUser';

import Form from './components/Form';

function App() {
  const { user, loginUser, isUserLoading } = useUser();

  return (
    <>
      {isUserLoading && !user ? (
        <h1>Loading...</h1>
      ) : !isUserLoading && !user ? (
        <Form onLogin={loginUser}></Form>
      ) : (
        <div>This will be main todo app</div>
      )}
    </>
  );
}

export default App;
