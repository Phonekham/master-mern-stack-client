import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Header from "./components/nav/Header";
import { auth } from "./firebase";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();

  // To check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
      }
    });
    // Cleanup
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
      </Switch>
    </>
  );
}

export default App;
