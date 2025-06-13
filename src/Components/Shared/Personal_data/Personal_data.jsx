import personData from '../../../assets/personData.png'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDTION, PASSWORD_VALIDTION } from '../Validtion/Validtion.js';
import { useContext, useEffect, useState } from 'react';
import { axiosInstance, USERS_URLS } from '../baseUrl/baseUrl.js';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/authContext/AuthContextProvider.jsx';

export default function Personal_data() {
    const { LogData } = useContext(AuthContext);

    // شرط حماية:
    if (!LogData) return <p>Loading...</p>
    let [lodingPage, setLodingPage] = useState(false)
    let [dataPersons, setDataPerson] = useState(null)
    let [btnLoad, setBtnLoad] = useState(false)
    const [show, setShow] = useState(false)


    let { register, handleSubmit, formState: { errors }, setValue } = useForm();



    async function GetUser() {
        setLodingPage(true)
        try {
            let response = await axiosInstance.get(USERS_URLS.CURRENT_USER)
            setDataPerson(response.data);
            setLodingPage(false)
        }
        catch (error) {
            toast.error(error.response.data)
            setLodingPage(false)
        }
    }


    async function onSubmit(data) {

        setBtnLoad(true)
        try {
            let response = await axiosInstance.put(USERS_URLS.UPDATE_PROFILE, data)
            toast.success('profile updated successfully.');
            setBtnLoad(false)
        }
        catch (error) {
            toast.error(error.response.data.message || "Invalid password");
            setBtnLoad(false)

        }
    }
    useEffect(() => {
        GetUser()
    }, []);

    useEffect(() => {
        if (dataPersons) {
            setValue("userName", dataPersons.userName);
            setValue("email", dataPersons.email);
            setValue("country", dataPersons.country);
            setValue("phoneNumber", dataPersons.phoneNumber);
        }
    }, [dataPersons, setValue]);

    return (
        <>
            {lodingPage ? <div className="d-flex justify-content-center align-items-center  pt-5 vh-50 bg_loadCategory">
                <span class="spin-Persone"></span>
            </div>
                : <div className="container ">

                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* /userName/ */}
                                <div>
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
                                <div>
                                    <div className="input-group mt-3">
                                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                                        <input {...register('email', EMAIL_VALIDTION)}
                                            type="mail" name='email' className="form-control input_height" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />

                                    </div>
                                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                                </div>
                                {/* /Country/ */}
                                <div>
                                    <div className="input-group mt-3">
                                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-earth-americas"></i></span>
                                        <input {...register('country', { required: 'country  is require' })} type="text" name='country' className="form-control input_height" placeholder="country" aria-label="country" aria-describedby="basic-addon1" />
                                    </div>
                                    {errors.country && <span className='text-danger'>{errors.country.message}</span>}
                                </div>
                                {/* /phone/ */}
                                <div>
                                    <div className="input-group mt-3">
                                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></span>
                                        <input {...register('phoneNumber', {
                                            required: 'phoneNumber is require',
                                        })} type="text" name='phoneNumber' className="form-control input_height" placeholder="PhoneNumber" aria-label="phoneNumber" aria-describedby="basic-addon1" />

                                    </div>
                                    {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
                                </div>
                                <div >
                                    <div className="input-group mt-3 position-relative all_pass ">
                                        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                        <input   {...register('confirmPassword', PASSWORD_VALIDTION)} type={show ? "text" : "password"} name='confirmPassword' className="form-control input_height bord_pass" placeholder="confirmPassword" aria-label="password" aria-describedby="basic-addon1" />
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
                                <button type="submit" className="btn btn-primary mt-3 w-100 ">{btnLoad ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Update"}</button>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="img">
                                <img src={personData} className='w-100' alt="" />
                            </div>
                        </div>

                    </div>

                </div>}



        </>
    )
}
