import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Container} from '@mui/material';
import NavBar from './components/NavBar';



const App = () => {
  return(
     <Router>
        <NavBar />
        <Container sx={{mt:4}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
     </Router>
  )
};


export default App;