import { useDispatch , useSelector } from "react-redux";
import { removeFromCart,updateQuantity } from "../slices/cartSlice";
import { Box,Typography, Grid2 as Grid,IconButton,Card,CardContent,CardMedia,Button } from "@mui/material";
import {Add, Remove,Delete} from '@mui/icons-material';
import { toast } from "react-toastify";

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
        toast.success("Item removed from cart",{position:'bottom-right'});
    }

    return(
        <Box sx={{padding:2 , display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',gap:5}}>
            <Typography variant="h5" gutterBottom>
                Your Cart
            </Typography>
            <Grid container spacing={2}>
                {cart.map((item) => (
                    <Grid item xs={12} key={item.id}>
                        <Card sx={{padding:2,textAlign:'center'}}>
                        <CardMedia component="img" sx={{height:180,objectFit:'contain',margin:'0 auto',width:'100%',maxWidth:200}} image={item.image} alt={item.name} />
                            <CardContent sx={{display:'flex',flexDirection:"column",alignItems:'center',gap:1}}>
                                <Typography sx={{flexGrow:1}}> {item.name} </Typography>
                                <Typography> ${item.price} </Typography>
                                <Box sx={{display:'flex',alignItems:'center',gap:2}}>
                                    <IconButton onClick={() => handleQuantityChange(item.id,item.quantity-1)}>
                                        <Remove />
                                    </IconButton>
                                    <Typography> {item.quantity} </Typography>
                                    <IconButton onClick={() => handleQuantityChange(item.id,item.quantity+1)}>
                                        <Add />
                                    </IconButton>
                                </Box>
                                <Button variant="contained"  color="primary" onClick={() => handleRemove(item.id)} startIcon={<Delete />}>
                                    Remove
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
            </Grid>
            <Typography variant="h6" sx={{mt:4}}>
                Total Price : ${totalPrice.toFixed(2)}
            </Typography>
        </Box>
    )
};


export default Cart;