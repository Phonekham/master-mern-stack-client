import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Header from "./components/nav/Header";
import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/Category/CategoryCreate";
import CategoryUpdate from "./pages/admin/Category/CategoryUpdate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import SubCreate from "./pages/admin/Sub/SubCreate";
import SubUpdate from "./pages/admin/Sub/SubUpdate";
import ForgotPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import CategoryHome from "./pages/category/CategoryHome";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import SubHome from "./pages/sub/SubHome";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SlideDrawer";
import Checkout from "./pages/Checkout";

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
      <SideDrawer />
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
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
      </Switch>
    </>
  );
}

export default App;
