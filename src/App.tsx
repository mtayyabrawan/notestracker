import BasicRouter from "./routers/BasicRouter.route";
import AuthProvider from "./store/providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BasicRouter />
    </AuthProvider>
  );
}

export default App;
