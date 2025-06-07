import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NEW_PASSWORD_VALIDTION, PASSWORD_VALIDTION } from '../Validtion/Validtion.js'
import { axiosInstance, USERS_URLS } from '../baseUrl/baseUrl.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {
    let { register, formState: { errors }, handleSubmit, watch } = useForm()
    const [show, setShow] = useState(false)
    let [btnLoad, setBtnLoad] = useState(false)
    let navigate = useNavigate()


    async function onSubmit(data) {
        setBtnLoad(true)
        try {
            let response = await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, data)
            toast.success(response.data.message);
            navigate('/dashboard')
            setBtnLoad(false)
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoad(false)
        }
    }

    return (
        <>

            <h2 className='text-center py-4'>Change Password</h2>
            <div className="w-75 m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mt-3 position-relative all_pass ">
                        <span className="input-group-text input_FormRecipes" id="basic-addon1"><i class="fa-solid fa-lock"></i></span>
                        <input   {...register('oldPassword', PASSWORD_VALIDTION)} type={show ? "text" : "password"} name='oldPassword' className="input_FormRecipes form-control input_email input_height bord_pass" placeholder="oldPassword" aria-label="oldPassword" aria-describedby="basic-addon1" />
                        <span
                            className="position-absolute end-0 top-50 translate-middle-y pe-2 alleye rounded-3"
                            onClick={() => setShow((prev) => !prev)}
                        >
                            {show ? (
                                <i className="fa-solid fa-eye p-2 me-1 "></i>
                            ) : (
                                <i className="fa-solid fa-eye-slash p-2 m-1"></i>
                            )}
                        </span>
                    </div>
                    {errors.oldPassword && <span className='text-danger'>{errors.oldPassword.message}</span>}

                    <div className="input-group mt-3 position-relative all_pass ">
                        <span className="input_FormRecipes input-group-text" id="basic-addon1"><i class="fa-solid fa-lock"></i></span>
                        <input   {...register('newPassword', NEW_PASSWORD_VALIDTION)} type={show ? "text" : "password"} name='newPassword' className="input_FormRecipes form-control input_email input_height bord_pass" placeholder="newPassword" aria-label="newPassword" aria-describedby="basic-addon1" />
                        <span
                            className="position-absolute end-0 top-50 translate-middle-y pe-2 alleye rounded-3"
                            onClick={() => setShow((prev) => !prev)}
                        >
                            {show ? (
                                <i className="fa-solid fa-eye p-2 me-1 "></i>
                            ) : (
                                <i className="fa-solid fa-eye-slash p-2 m-1"></i>
                            )}
                        </span>
                    </div>
                    {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}

                    <div >
                        <div className="input-group mt-3 position-relative all_pass ">
                            <span className="input_FormRecipes input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                            <input
                                {...register("confirmNewPassword", {
                                    required: "Please confirm your new password",
                                    validate: (value) =>
                                        value === watch("newPassword") || "Passwords do not match",
                                })}
                                type={show ? "text" : "password"}
                                name="confirmNewPassword" 
                                className="input_FormRecipes form-control input_height bord_pass"
                                placeholder="Confirm New Password"
                            />

                            <span
                                className="position-absolute end-0 top-50 translate-middle-y pe-2 alleye rounded-3"
                                onClick={() => setShow((prev) => !prev)}
                            >
                                {show ? (
                                    <i className="fa-solid fa-eye p-2 me-1 "></i>
                                ) : (
                                    <i className="fa-solid fa-eye-slash p-2 m-1"></i>
                                )}
                            </span>
                        </div>
                        {errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}
                    </div>


                    <button type="submit" className='btn btn-success w-100   mt-3'> {btnLoad ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Save'}</button>

                </form>
            </div>


        </>
    )
}
