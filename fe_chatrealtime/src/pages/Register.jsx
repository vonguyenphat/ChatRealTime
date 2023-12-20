import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {registerNewUser} from '../services/AuthService'
import {toast} from 'react-toastify';

const Register = () => {
    let navigate = useNavigate();
    const {register, handleSubmit, setError, getValues, formState: {errors},} = useForm({
        mode: "onTouched",
        defaultValues: {
            name: "",
            username: "",
            password: ""
        },
        criteriaMode: "firstError",
    })
    const onSubmit = async (data) => {
        let res = await registerNewUser(data.name, data.username, data.password);
        if (res && res.EC === 5) {
            setError("username", {type: "usernameExists", message: "Tên người dùng đã tồn tại"});
        }
        if (res && res.EC === 0) {
            toast.success("Đăng kí tài khoảng thành công");
            navigate('/login');
        }
    }
    return (
        <div className='login container mx-auto flex items-center justify-center'>
            <div className='w-[456px] p-[40px] shadow-2xl absolute top-[15%] left-[50%] ml-[-228px] '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-[26px] text-center font-[500] uppercase '>Đăng kí</h1>
                    <p className='mt-[15px] text-center text-[#777E90]'> Bạn đã có tài khoảng?
                        <NavLink to='/login' className='text-[#f5b70c]'> Đăng nhập </NavLink></p>
                    <div className={'mt-[24px]'}>
                        <label className="block text-sm font-medium mb-2 dark:text-white">Tên người dùng</label>
                        <div className="relative">
                            <input type="text"
                                   className={`py-3 px-4 block w-full  border ${errors.name ? ' border-red-500' : 'border-[#C4C4C4]'}
                                    rounded-lg text-sm focus:border-[#f5b70c] focus:ring-[#f5b70c] focus:ring-1 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                                   placeholder="Nhập tên của bạn"
                                   {...register('name', {
                                       required: "Vui lòng nhập tên người dùng",
                                       maxLength: {value: 10, message: 'Tên người dùng quá dài'},
                                       validate: {
                                           blankCharacter: (value) => {
                                               return !value.includes(' ')
                                           },
                                       }
                                   })}
                            />
                            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                {errors.name ?
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
                        {errors.name &&
                            <p className="text-sm text-red-600 mt-2">{errors.name.message}</p>}
                        {errors.name && errors.name.type === "blankCharacter" &&
                            <p className="text-sm text-red-600 mt-2">Không được có kí tự trống</p>}
                    </div>
                    <div className={'mt-[24px]'}>
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
                                   autoComplete="username"/>
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
                        {errors.username && errors.username.type === "usernameExists" &&
                            <p className="text-sm text-red-600 mt-2">{errors.username.message}</p>}
                    </div>
                    <div className={'mt-[24px]'}>
                        <label className="block text-sm font-medium mb-2 dark:text-white">Mật khẩu</label>
                        <div className="relative">
                            <input type="password"
                                   className={`py-3 px-4 block w-full  border ${errors.password ? ' border-red-500' : 'border-[#C4C4C4]'}
                                    rounded-lg text-sm focus:border-[#f5b70c] focus:ring-[#f5b70c] focus:ring-1 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                                   placeholder="Nhập mật khẩu"
                                   {...register('password', {
                                       required: "Vui lòng nhập mật khẩu",
                                       validate: {
                                           blankCharacter: value => {
                                               return !value.includes(' ')
                                           },
                                       }
                                   })}
                                   autoComplete="new-password"/>
                            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                {errors.password ?
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
                        {errors.password && errors.password.type === "required" &&
                            <p className="text-sm text-red-600 mt-2">{errors.password.message}</p>}
                        {errors.password && errors.password.type === "blankCharacter" &&
                            <p className="text-sm text-red-600 mt-2">Không được có kí tự trống</p>}
                    </div>
                    <div className={'mt-[24px]'}>
                        <label className="block text-sm font-medium mb-2 dark:text-white">Xác nhận mật khẩu</label>
                        <div className="relative">
                            <input type="password"
                                   className={`py-3 px-4 block w-full  border ${errors.re_password ? ' border-red-500' : 'border-[#C4C4C4]'}
                                    rounded-lg text-sm focus:border-[#f5b70c] focus:ring-[#f5b70c] focus:ring-1 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                                   placeholder="Nhập xác nhận mật khẩu"
                                   {...register('re_password',
                                       {
                                           required: "Vui lòng xác nhận mật khẩu",
                                           validate: {
                                               checkPassword: value => {
                                                   return value === getValues("password")
                                               },
                                               blankCharacter: value => {
                                                   return !value.includes(' ')
                                               },
                                           },
                                       })}
                                   autoComplete="new-password"/>
                            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                {errors.re_password ?
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
                        {errors.re_password && errors.re_password.type === "required" &&
                            <p className="text-sm text-red-600 mt-2">{errors.re_password.message}</p>}
                        {errors.re_password && errors.re_password.type === "checkPassword" &&
                            <p className="text-sm text-red-600 mt-2">Mật khẩu xác nhận không trùng khớp </p>}
                        {errors.re_password && errors.re_password.type === "blankCharacter" &&
                            <p className="text-sm text-red-600 mt-2">Không được có kí tự trống</p>}
                    </div>
                    <button
                        className='text-[#ffff] text-[16px] mt-[24px] text-center font-[500] w-[100%] bg-[#f5b70c] p-[8px] border  rounded-[8px]'>
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;