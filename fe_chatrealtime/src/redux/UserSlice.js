import {createSlice} from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'user',
    initialState: ({
        users: [],
        isLoading: false,
        isError: false
    }),
    reducers: {
        addListUsers: (state, action) => {
            state.users.push(action.payload);
        }
    }
})
export default UserSlice;