import { useState,useEffect } from "react";
import { TextField } from "@mui/material";


const Search = ({onSearch}) => {
    const [searchName,setSearchName] = useState("");

    useEffect(() => {
        const debounce = setTimeout(() => {
            onSearch(searchName.toLowerCase());
        },300);

        return () => clearTimeout(debounce);
    },[searchName,onSearch]);

    return(
        <TextField label="Search for Toys" variant="outlined" fullWidth sx={{marginBottom:2}} value={searchName} onChange={(e) => setSearchName(e.target.value)} />
    )
};

export default Search;