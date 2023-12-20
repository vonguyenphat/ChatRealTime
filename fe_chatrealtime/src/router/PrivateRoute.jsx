import React from 'react';
import { useSelector} from 'react-redux';
import { useNavigate} from 'react-router-dom';
function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const {account} = useSelector((state) => state.auth);
    return (
        account.isLoggedIn ? <> {children}</>: navigate('/login')
    );
}

export default PrivateRoute;