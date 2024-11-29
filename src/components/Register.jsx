import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {TextField,Button,Paper,Typography,Box} from '@mui/material';
import { useDispatch } from "react-redux";
import { registration } from "../slices/authSlice";
import { useNavigate,Link } from "react-router-dom";

const registerSchema = yup.object({
    name : yup.string().required('Name is required'),
    email : yup.string().email('Invalid email').required('Email is required'),
    password : yup.string().min(6,'Password must be at least 6 characters').required('Password is required')
});

const Register = () => {

    const {register,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(registerSchema)});

    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const onSubmit = (data) => {
        const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = registeredUsers.some(user => user.email === data.email);

        if(userExists){
            alert('User already exists');
        }else{
            dispatch(registration(data));
            alert('Registration Successful');
            navigate('/');
        }
    }

    return(
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link to="/" style={{textDecoration:'none'}} underline="hover">
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    )
};

export default Register;