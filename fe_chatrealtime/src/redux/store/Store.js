import {configureStore} from '@reduxjs/toolkit'
import  authsSlice from '../AuthSlice'
const store = configureStore({
    reducer:{
        auth:authsSlice.reducer
    }
})
export default store;