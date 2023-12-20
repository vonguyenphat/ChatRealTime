import {Routes, Route} from "react-router-dom";
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Chat from '../pages/Chat';
import ForgotPassword from '../pages/ForgotPassword'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path="/home" element={
                <PrivateRoute>
                    {<Chat/>}
                </PrivateRoute>
            }/>
            <Route path="*">
                404
            </Route>
        </Routes>
    );
};

export default AppRouter;