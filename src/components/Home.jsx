import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import {
  Grid2 as Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import teddyImage from "../assets/teddy.jpg";
import legoImage from "../assets/lego.jpg";
import bearImage from "../assets/bear.jpg";
import kids from "../assets/kids-toys.jpeg";
import woodenImage from "../assets/wooden.png";
import batMobileImage from "../assets/batMobile.jpg";
import laptopImage from "../assets/laptop.jpg";
import { toast } from "react-toastify";
import Search from "./Search";

const toys = [
  { id: 1, name: "Teddy Bear", price: 20, image: teddyImage },
  { id: 2, name: "Lego Set", price: 35, image: legoImage },
  { id: 3, name: "Toy Car", price: 15, image: kids },
  { id: 4, name: "Doll House", price: 50, image: bearImage },
  { id: 5, name: "Wooden", price: 10, image: woodenImage },
  { id: 6, name: "Bat Mobile", price: 70, image: batMobileImage },
  { id: 7, name: "Laptop", price: 120, image: laptopImage },
];

const Home = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [searchName, setSearchName] = useState("");
  const [filter, setFilter] = useState("default");

  const handleAddToCart = (toy) => {
    const existingItem = cart.find((item) => item.id === toy.id);
    if (existingItem) {
      toast.info("This item already exists in the cart", {
        position: "bottom-right",
      });
    } else {
      dispatch(addToCart(toy));
      toast.success("Item added to cart", { position: "bottom-right" });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const resetFilters = () => {
    setFilter("default");
    setSearchName("");
  };

  const filteredToys = toys
    .filter((toy) => toy.name.toLowerCase().includes(searchName))
    .sort((a, b) => {
      if (filter === "priceLowToHigh") return a.price - b.price;
      if (filter === "name") return a.name.localeCompare(b.name);
      return 0;
    });


    return (
      <Box sx={{ padding: 2}}>
        <Search onSearch={setSearchName} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            marginBottom: 2,
          }}
        >
          <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }} size="small">
            <Select
              value={filter}
              onChange={handleFilterChange}
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: "1px solid #ccc" },
              }}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="name">Name: A to Z</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            onClick={resetFilters}
            sx={{
              borderColor: "#ccc",
              ":hover": { borderColor: "#aaa", backgroundColor: "#f5f5f5" },
            }}
          >
            Reset Filters
          </Button>
        </Box>
        <Grid container spacing={3}>
        {filteredToys.map((toy) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={toy.id}>
            <Card
              sx={{
                width: "100%",
                maxWidth: 300,
                height: 350, 
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ":hover": {
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 180, 
                  objectFit: "contain",
                }}
                image={toy.image}
                alt={toy.name}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {toy.name}
                </Typography>
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
      </Box>
    );
};

export default Home;
