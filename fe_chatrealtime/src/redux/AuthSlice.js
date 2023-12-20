import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getUserAccount, loginUser} from '../services/AuthService'

const authsSlice = createSlice({
    name: 'auth',
    initialState: {
        account: {
            data: {

            },
            isLoading: false,
            isLoggedIn: false,
            error: false,
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.account.isLoading = true;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                try {
                    if (action.payload && action.payload.EC === 0) {
                        state.account.isLoading = false;
                        state.account.data = action.payload;
                        state.account.isLoggedIn = true;
                        state.account.error = false;
                        localStorage.setItem("jwt", action.payload.DT.accessToken);
                    } else {
                        state.account.data = action.payload;
                        state.account.error = true;
                        state.account.isLoading = false;
                    }
                } catch (e) {
                    console.log(e)
                }
            })
            .addCase(fetchUser.pending, (state, action) => {
                state.account.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                try {
                    if (action.payload && action.payload.EC === 0) {
                        state.account.isLoading = false;
                        state.account.data = action.payload;
                        state.account.isLoggedIn = true;
                        state.account.error = false;
                    } else {
                        state.account.isLoading = false;
                        state.account.data = action.payload;
                        state.account.error = false;
                    }
                } catch (e) {
                    console.log(e)
                }
            })
            .addCase(fetchUser.rejected, (state, action) => {
                try {
                    if (action.payload && action.payload.EC === 0) {
                        state.account.isLoading = false;
                        state.account.data = action.payload;
                        state.account.isLoggedIn = true;
                        state.account.error = false;
                    } else {
                        state.account.isLoading = false;
                        state.account.data = action.payload;
                        state.account.error = false;
                    }
                } catch (e) {
                    console.log(e)
                }
            })
    }
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (data) => {
    return await loginUser(data.username, data.password);
});
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    return await getUserAccount();
})
export default authsSlice;