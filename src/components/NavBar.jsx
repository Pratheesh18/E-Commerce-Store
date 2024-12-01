import { AppBar,Toolbar,Typography,Button} from "@mui/material";
import { Link } from "react-router-dom";


const NavBar = () => {
    return(
        <AppBar position="static" sx={{marginBottom:2}}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow:1}}>
                    E-Commerce
                </Typography>
                <Button color="inherit" component={Link} to="/home"> Home </Button>
                <Button color="inherit" component={Link} to="/cart"> Cart </Button>
            </Toolbar>
        </AppBar>
    )
};


export default NavBar;