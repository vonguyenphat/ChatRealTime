import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {fetchLogin} from '../redux/AuthSlice'
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from "react-hook-form";

const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let [isShowPassword, setIsShowPassword] = useState(false);
    let iConLogin = ['button.png', 'google.png', 'tw.png'];
    const {account} = useSelector((state) => state.auth);
    const {register, handleSubmit, setError, watch, clearErrors, formState: {errors},} = useForm({
        mode: "onTouched",
        defaultValues: {
            username: "",
            password: ""
        },
        criteriaMode: "firstError",
    })
    useEffect(() => {
        document.title = "Đăng nhập";
    }, []);

    useEffect(() => {
        if (account.error) {
            if (account.data.EC !== 0) {
                setError("errorLogin", {type: "failLogin", message: "Tên đăng nhập hoặc mật khẩu không đúng"});
            }
        }
        if (!account.error) {
            if (account.data.EC === 0) {
                navigate('/home')
            }
        }
    }, [account, setError, navigate]);


    useEffect(() => {
        clearErrors("errorLogin");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('username'), watch('password')]);
    const onSubmit = (data) => {
        dispatch(fetchLogin(data));
    }
    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }
    return (
        <div className='login container mx-auto flex items-center justify-center'>
            <div className='w-[456px] p-[40px] shadow-2xl absolute top-[15%] left-[50%] ml-[-228px] '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='header-logn'>
                        <h1 className='text-[26px] text-center font-[500] uppercase'> Đăng nhập </h1>
                    </div>
                    <p className='mt-[15px] text-center text-[#777E90]'> Bạn chưa có tài khoảng? <NavLink to='/register'
                                                                                                          className='text-[#f5b70c]'> Đăng
                        kí </NavLink></p>
                    <div className='flex justify-between mt-[24px]'>
                        {iConLogin.map((item, index) =>
                            <button key={index}>
                                <img src={require(`../images/${item}`)} alt=''/>
                            </button>
                        )}
                    </div>
                    <p className="text-center mt-[24px] text-[#777E90] text-[14px]">Hoặc đăng nhập bằng tài khoảng</p>
                    <div className={'mt-[25px]'}>
                        <label className="block text-sm font-medium mb-2 dark:text-white">Tên đăng nhâp</label>
                        <div className="relative">
                            <input type="text"
                                   className={`py-3 px-4 block w-full  border ${errors.username ? ' border-red-500' : 'border-[#C4C4C4]'}
                                    rounded-lg text-sm focus:border-[#f5b70c] focus:ring-[#f5b70c] focus:ring-1 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                                   placeholder="Nhập tên của bạn"
                                   {...register('username', {
                                       required: "Vui lòng nhập tên đăng nhâp",
                                       validate: {
                                           blankCharacter: value => {
                                               return !value.includes(' ')
                                           },
                                       }
                                   })}
                                   autoComplete="username"
                            />
                            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                {errors.username ?
                                    <svg className="flex-shrink-0 h-4 w-4 text-red-500"
                                         xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="12" x2="12" y1="8" y2="12"/>
                                        <line x1="12" x2="12.01" y1="16" y2="16"/>
                                    </svg> : ''}
                            </div>
                        </div>
                        {errors.username && errors.username.type === "required" &&
                            <p className="text-sm text-red-600 mt-2">{errors.username.message}</p>}
                        {errors.username && errors.username.type === "blankCharacter" &&
                            <p className="text-sm text-red-600 mt-2">Không được có kí tự trống</p>}
                    </div>
                    <div className={'mt-[25px]'}>
                        <label className="block text-sm font-medium mb-2 dark:text-white">Mật khẩu</label>
                        <div className="relative">
                            <button type="button"
                                    className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    onClick={handleShowPassword}>
                                <img
                                    src={isShowPassword ? require('../images/Vector.png') : require('../images/hide.png')}
                                    alt={isShowPassword ? 'Hiển thị mật khẩu' : 'Ẩn mật khẩu'}/>
                            </button>
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                className={`py-3 px-4 block w-full  
                                border ${errors.password ? ' border-red-500' : 'border-[#C4C4C4]'}
                                    rounded-lg text-sm focus:border-[#f5b70c] focus:ring-[#f5b70c] 
                                    focus:ring-1 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                                    placeholder: `}
                                placeholder="*********"
                                {...register('password', {
                                    required: "Vui lòng nhập mật khẩu",
                                    validate: {
                                        blankCharacter: value => {
                                            return !value.includes(' ')
                                        },
                                    }
                                })}
                                autoComplete="current-password"/>
                        </div>
                        {errors.password && errors.password.type === "required" &&
                            <p className="text-sm text-red-600 mt-2">{errors.password.message}</p>}
                        {errors.password && errors.password.type === "blankCharacter" &&
                            <p className="text-sm text-red-600 mt-2">Không được có kí tự trống</p>}
                        {errors.errorLogin && errors.errorLogin.type === "failLogin" &&
                            <p className="text-sm text-red-600 mt-2">{errors.errorLogin.message}</p>}
                    </div>
                    <button className='text-[#f5b70c] text-[14px] mt-[18px] text-center'>
                        <NavLink to={'/forgot-password'}>Quên mật khẩu ?</NavLink></button>
                    <br/>
                    <button
                        className='text-[#ffff] text-[16px] mt-[24px]
                        text-center font-[500] w-[100%] bg-[#f5b70c] p-[8px] border  rounded-[8px]'
                        type="submit">Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    )
};

export default Login;