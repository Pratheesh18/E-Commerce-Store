import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Paper, Typography, Box} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Password from "./Password";

const loginSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at leats 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = (data) => {
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = registeredUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (user) {
      dispatch(login(user));
      toast.success("Login Successful", { position: "bottom-right" });
      navigate("/home");
    } else {
      toast.error("Error! Invalid email or password");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{backgroundColor: '#5d8aaf'}}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography sx={{display:'flex',justifyContent:'center'}}  variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Password label="Password" error={!!errors.password} helperText={errors.password?.message} register={register("password")} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Dont have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none" }}
            underline="hover"
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
