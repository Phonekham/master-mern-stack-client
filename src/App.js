import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Header from "./components/nav/Header";
import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";

function App() {
  const dispatch = useDispatch();

  // To check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
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
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </>
  );
}

export default App;
