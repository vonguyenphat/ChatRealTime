import {BrowserRouter} from "react-router-dom";
import AppRouter from './router/AppRouter'
import 'react-toastify/dist/ReactToastify.css';
import Toast from './components/Toast'
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser} from "./redux/AuthSlice";
import ClipLoader from "react-spinners/ClipLoader";
// import {socket} from '../services/Socket';
function App() {
    const dispatch = useDispatch();
    const {account} = useSelector((state) => state.auth);
    useEffect(() => {
        if (window.location.pathname === "/login" || window.location.pathname === "/register") {
        } else {
            dispatch(fetchUser());
        }
    }, [dispatch]);
    return (
        <>
            {account.isLoading ?
                <ClipLoader/>
                :
                <>
                    <Toast/>
                    <BrowserRouter>
                        <AppRouter/>
                    </BrowserRouter>
                </>
            }

        </>
    );
}

export default App;
