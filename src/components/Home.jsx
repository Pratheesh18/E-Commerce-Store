import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { Grid2 as Grid , Card,CardContent,CardMedia,Typography,Button } from "@mui/material";
import teddyImage from '../assets/teddy.jpg';
import legoImage from '../assets/lego.jpg';
import bearImage from '../assets/bear.jpg';
import kids from '../assets/kids-toys.jpeg'

const toys = [
    { id: 1, name: 'Teddy Bear', price: 20, image: teddyImage },
    { id: 2, name: 'Lego Set', price: 35, image: legoImage },
    { id: 3, name: 'Toy Car', price: 15, image: kids },
    { id: 4, name: 'Doll House', price: 50, image: bearImage },
  ];

const Home = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const handleAddToCart = (toy) => {
        const existingItem = cart.find((item) => item.id === toy.id);
        if(existingItem){
            alert('This item is already in the cart');
        }else{
            dispatch(addToCart(toy));
        }
    };

    return(
        <Grid container spacing={2} sx={{ padding: 2 }}>
        {toys.map((toy) => (
          <Grid item xs={12} sm={6} md={4} key={toy.id}>
            <Card>
              <CardMedia component="img" height="140" image={toy.image} alt={toy.name} />
              <CardContent>
                <Typography variant="h6">{toy.name}</Typography>
                <Typography>${toy.price}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(toy)}
                  sx={{ mt: 1 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
};


export default Home;