import React from 'react';
import {useForm} from "react-hook-form";
import {forgotPassword} from '../services/AuthService'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
function ForgotPassword(props) {
    let navigate = useNavigate();
    const {register, handleSubmit, setError, getValues, formState: {errors},} = useForm({
        mode: "onTouched",
        defaultValues: {
            username: "",
            password: ""
        },
        criteriaMode: "firstError",
    })
    const onSubmit = async (data) => {
        let res = await forgotPassword(data);
        if (res && res.EC === 4) {
            setError("username", {type: "usernameNotExists", message: "Tên người dùng không  tồn tại"});
        }
        if (res && res.EC === 0) {
            toast.success("Đổi mật khẩu thành công");
            navigate('/login');
        }
    }
    return (
        <>
            <div className='login container mx-auto flex items-center justify-center'>
                <div className='w-[456px] p-[40px] shadow-2xl absolute top-[15%] left-[50%] ml-[-228px]'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-[26px] text-center font-[500] uppercase '>Đổi mật khẩu</h1>
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
                            {errors.username && errors.username.type === "usernameNotExists" &&
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
                        <button type={"submit"}
                                className='text-[#ffff] text-[16px] mt-[24px] text-center font-[500] w-[100%] bg-[#f5b70c] p-[8px] border  rounded-[8px]'>
                            Xác nhận thay đổi
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;