
import { useDispatch , useSelector } from "react-redux";
import { removeFromCart,updateQuantity } from "../slices/cartSlice";
import { Box,Typography, Grid2 as Grid,IconButton,Card,CardContent } from "@mui/material";
import {Add, Remove,Delete} from '@mui/icons-material';

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const totalPrice = cart.reduce((total,item) => total + item.price * item.quantity,0);
    const handleQuantityChange = (id,quantity) => {
        if(quantity > 0){
            dispatch(updateQuantity({id,quantity}));
        }
    }

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    }

    return(
        <Box sx={{padding:2}}>
            <Typography variant="h5" gutterBottom>
                Your Cart
            </Typography>
            <Grid container spacing={2}>
                {cart.map((item) => (
                    <Grid item xs={12} key={item.id}>
                        <Card>
                            <CardContent sx={{display:'flex',alignItems:'center'}}>
                                <Typography sx={{flexGrow:1}}> {item.name} </Typography>
                                <Typography> ${item.price} </Typography>
                                <Box sx={{display:'flex',alignItems:'center',mx:2}}>
                                    <IconButton onClick={() => handleQuantityChange(item.id,item.quantity-1)}>
                                        <Remove />
                                    </IconButton>
                                    <Typography> {item.quantity} </Typography>
                                    <IconButton onClick={() => handleQuantityChange(item.id,item.quantity+1)}>
                                        <Add />
                                    </IconButton>
                                </Box>
                                <IconButton color="secondary" onClick={() => handleRemove(item.id)}>
                                    <Delete />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
            </Grid>
            <Typography variant="h6" sx={{mt:2}}>
                Total Price : ${totalPrice.toFixed(2)}
            </Typography>
        </Box>
    )
};


export default Cart;