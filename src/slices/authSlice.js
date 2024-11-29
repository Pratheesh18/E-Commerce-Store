import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : JSON.parse(localStorage.getItem('user')) || null,
}

const authSlice = createSlice({
    name :'auth',
    initialState,
    reducers:{
        registration(state,action){
            const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
            registeredUsers.push(action.payload);
            localStorage.setItem('users',JSON.stringify(registeredUsers))
        },
        login(state,action){
            state.user = action.payload;
            localStorage.setItem('user',JSON.stringify(action.payload));
        },
        logout(state){
            state.user = null;
            localStorage.removeItem('user');
        }
    }
});

export const {login,logout,registration} = authSlice.actions;
export default authSlice.reducer;