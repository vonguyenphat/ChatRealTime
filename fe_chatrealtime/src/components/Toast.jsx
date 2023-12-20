import React from 'react';
import {ToastContainer} from 'react-toastify';
function Toast() {
    return (
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                        closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    );
}

export default Toast;