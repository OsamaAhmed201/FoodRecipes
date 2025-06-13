import React, { useState } from 'react'
import logoimg from '../../../assets/foodRecipe.png'
import { data, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { axiosInstance, USERS_URLS } from '../../Shared/baseUrl/baseUrl.js'
import {  EMAIL_VALIDTION, PASSWORD_VALIDTION } from '../../Shared/Validtion/Validtion.js'
export default function Register() {
  let [loding, setLoding] = useState(false)
  let navigate = useNavigate()
  let { register, handleSubmit, formState: { errors } ,watch} = useForm()
  const [show, setShow] = useState(false)


  // call ApiForget
  const onSubmit = async (data) => {
    try {
      setLoding(true)
      let respons = await axiosInstance.post(USERS_URLS.REGISTER, data)
      console.log(respons);

      if (respons.data.message === 'Account created successfully. A verification code has been sent to your email address.') {

        toast.success(`Account created successfully`)
        setLoding(false)
        navigate('/verify')

      }

    } catch (error) {
      toast.error(error.response.data.message)
      setLoding(false)
    }
  }


  return (
    <>
      {loding && (
        <div className="d-flex justify-content-center align-items-center vh-100 bg_load">
          <div className="loader"></div>
        </div>
      )}


      <div className='All_AuthContant'>
        <div className="container-fluid overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-7 bg-white  rounded-3 py-5 px-3">
              <div>
                {/* /logoimg/ */}
                <div className="log_img text-center ">
                  <img src={logoimg} className='w-50' alt="food-logo" />
                </div>
                {/* /title/ */}
                <div className="title_auth">
                  <h2> Register </h2>
                  <p className='text-muted'>Welcome Back! Please enter your details</p>
                </div>
                {/* /form/ */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    {/* /UserName/ */}
                    <div className="col-md-6">
                      <div className="input-group mt-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
                        <input {...register('userName', {
                          required: 'userName  is require', pattern: {
                            value: /^[A-Za-z]+[A-Za-z0-9]*[0-9]$/,
                            message: 'The userName must contain characters and end with numbers without spaces'
                          }
                        })} type="text" name='userName' className="form-control input_height" placeholder="UserName " aria-label="userName " aria-describedby="basic-addon1" />

                      </div>
                      {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
                    </div>
                    {/* /email/ */}
                    <div className="col-md-6">
                      <div className="input-group mt-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                        <input {...register('email', EMAIL_VALIDTION)} type="mail" name='email' className="form-control input_height" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />

                      </div>
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    </div>
                    {/* /Country/ */}
                    <div className="col-md-6">
                      <div className="input-group mt-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-earth-americas"></i></span>
                        <input {...register('country', { required: 'country  is require' })} type="text" name='country' className="form-control input_height" placeholder="country" aria-label="country" aria-describedby="basic-addon1" />
                      </div>
                      {errors.country && <span className='text-danger'>{errors.country.message}</span>}
                    </div>
                    {/* /phone/ */}
                    <div className="col-md-6">
                      <div className="input-group mt-3">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></span>
                        <input {...register('phoneNumber', {
                          required: 'phoneNumber is require',
                        })} type="text" name='phoneNumber' className="form-control input_height" placeholder="PhoneNumber" aria-label="phoneNumber" aria-describedby="basic-addon1" />

                      </div>
                      {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
                    </div>
                    {/* //password// */}
                    <div className="col-md-6">
                      <div className="input-group mt-3 position-relative all_pass ">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                        <input   {...register('password',PASSWORD_VALIDTION)} type={show ? "text" : "password"} name='password' className="form-control input_height bord_pass" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" />
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
                      {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                    </div>
                    {/* //confirmPassword// */}
                    <div className="col-md-6">
                      <div className="input-group mt-3 position-relative all_pass ">
                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
                        <input
                          {...register('confirmPassword', {
                            required: 'confirmPassword is require',
                            validate: (val) => {
                              if (watch('password') !== val) {
                                return "Your passwords do no match"
                              }
                            }
                          })}
                          type={show ? "text" : "password"} name='confirmPassword' className="form-control input_height bord_pass" placeholder="Confirm-Password" aria-label="password" aria-describedby="basic-addon1" />
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
                      {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
                    </div>
                    <div className="">
                      <Link to={'/login'} className='d-flex justify-content-end links_Log  mt-3 text-decoration-none text-success'>Login Now?</Link>
                    </div>
                    <button className='bnt_submit w-50 m-auto mt-4'>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>






    </>


  )
}
