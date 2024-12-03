import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppBar,Toolbar,Typography,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logout Successfully!",{position:'bottom-right'});
        navigate('/');
    }

    const handleDialogOpen = () => {
        setOpen(true);
    }

    const handleDialogClose = () => {
        setOpen(false);
    }


    return(
        <>
        <AppBar position="static" sx={{marginBottom:2}}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow:1}}>
                    E-Commerce
                </Typography>
                <Button color="inherit" component={Link} to="/home"> Home </Button>
                <Button color="inherit" component={Link} to="/cart"> Cart </Button>
                <Button color="inherit" onClick={handleDialogOpen}> Logout </Button>
            </Toolbar>
        </AppBar>
        <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle> Confirm Logout </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure want to log out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    No
                </Button>
                <Button onClick={() => {handleLogout();handleDialogClose()}} color="secondary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
};


export default NavBar;