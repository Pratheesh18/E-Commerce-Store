import { useState } from "react";
import { TextField,IconButton,InputAdornment } from "@mui/material";
import { Visibility,VisibilityOff } from "@mui/icons-material";



const Password = ({label,error,helperText,register,...props}) => {
    const [showPassword,setShowPassword] = useState(false);


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return(
        <TextField label={label} type={showPassword ? "text" : "password"} fullWidth margin="normal" error={!!error} helperText={helperText} {...register} InputProps={{
            endAdornment:(
                <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
        }}
        {...props}
        />
    )
};


export default Password;