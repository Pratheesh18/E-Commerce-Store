import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProtectedRoute = ({children}) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/" />;
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={
            <ProtectedRoute>
              <>
                 <NavBar />
                 <Home />
              </>
            </ProtectedRoute>
          }
          />
          <Route path="/cart" element={
            <ProtectedRoute>
              <>
                 <NavBar />
                 <Cart />
              </>
            </ProtectedRoute>
          }
          />
        </Routes>
      </Router>
      <ToastContainer autoClose={4000} hideProgressBar={false} theme="light" />
    </Provider>
  );
};

export default App;
