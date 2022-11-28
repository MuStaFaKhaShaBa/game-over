import Joi from 'joi';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusContext } from '../../App';
import Forms, { sentDataToAPI } from '../forms/Forms';
import styles from './css/login.module.css'
import logo from './../../assets/logo.png'
import Loader from '../loader/Loader';

const LoginForm = () => {
    const navigate = useNavigate();
    const [UserData, setUserData] = useState({ email: '', password: '' });
    const { setStatus } = useContext(StatusContext);
    const [HideLoader, setHideLoader] = useState(true);

    // To Hold Errors [0]=> true there no Problem , false There is.
    // [1]=> Message
    const [ErrorList, setErrorList] = useState({ email: [true, ''], password: [true, ''] });

    const schema = Joi.object({
        email: Joi.string().pattern(/^([a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,})$/).email({ tlds: ['com', 'net'] }).required(),
        password: Joi.string().min(8).pattern(/[A-Z]+[a-z]+/).required(),
    });

    const handleChange = e => {
        setUserData({
            ...UserData,
            [e.target.name]: e.target.value,
        })
    }

    const handleErrorsResponse = ({ details }) => {
        const Keys = Object.keys(ErrorList);

        function clipMsg(msg) {
            const clipPos = msg.split('').indexOf('"', 2);
            return msg.slice(clipPos + 1);
        }
        details.forEach(({ type, context: { key, value }, message }) => {
            // Remove Key That Already Error
            Keys.splice(Keys.indexOf(key), 1);

            ErrorList[key][0] = false;
            ErrorList[key][1] = type !== "string.pattern.base"
                ?
                clipMsg(message)
                :
                (
                    (key === 'password' &&
                        `[ ${value} ] is Invalid, Password Must Start With Capital Characters Followed With Small Characters`)
                    ||
                    (key === 'email' &&
                        `[ ${value} ] is Invalid, Email Must Be In Form aaa.a4@aaa.aaa`)
                );
        });

        Keys.forEach(error => (ErrorList[error][0] = true));

        setErrorList({ ...ErrorList });
    }

    const handleSubmitData = async e => {
        e.preventDefault();
        setHideLoader(false);

        const JoiResponse = schema.validate(UserData, { abortEarly: false });

        // call to set errors or remove errors
        handleErrorsResponse(JoiResponse.error || { details: [] });
        if (!JoiResponse.error) {
            const { data: { status = 1, message, token = '' } } = await sentDataToAPI('signin', UserData);

            // if there errors found
            if (status === 401) {
                const details =
                    ([{ context: { key: (message.split(' ').includes('email') ? 'email' : 'password') }, message }]);
                handleErrorsResponse({ details });
            } else {
                window.localStorage.setItem('userToken', token);
                setStatus('loggedin')
                navigate('/');
            }
        }
        setHideLoader(true);
    }

    return (
        <div className='text-center py-4'>
            <Loader hide={HideLoader} />
            <div className={`${styles['logo']} mx-auto`}>
                <img src={logo} className='w-100' alt='logo' />
            </div>
            <h1 className="text-white text-muted fs-2">Log in to GameOver!</h1>

            <form className='container mt-4 text-muted' onSubmit={handleSubmitData}>
                <div className='row gx-0 gx-md-2 gy-4'>

                    <div className='col-12'>
                        <input className={`form-control rounded-1 py-3 text-white 
                        bg-black bg-opacity-50 border-dark ${ErrorList.email[0] === false && 'is-invalid'}`}
                            type="email" name='email' value={UserData.email} placeholder="Email Address"
                            onChange={handleChange} aria-label="aaa.a5@aa.com" />

                        <p className='invalid-feedback text-danger fs-7 text-start mb-0'>
                            {
                                ErrorList.email[1]
                            }
                        </p>
                    </div>


                    <div className='col-12'>
                        <input className={`form-control rounded-1 py-3 text-white 
                        bg-black bg-opacity-50 border-dark ${ErrorList.password[0] === false && 'is-invalid'}`}
                            type="password" name='password' value={UserData.password} placeholder="Password"
                            onChange={handleChange} aria-label="" />

                        <p className='invalid-feedback text-danger fs-7 text-start mb-0'>
                            {
                                ErrorList.password[1]
                            }
                        </p>
                    </div>

                    <div className='col-12'>
                        <button type='submit' className='btn btn-dark shadow-md w-100 py-2 rounded-1'>
                            Login
                        </button>
                    </div>


                    <hr className='mb-0' />

                    <div className='col-12'>
                        <button type='button' className={`btn ${styles['btn-forget']} mb-3`}
                            onClick={_ => alert('هه اعمل اكونت غيره يسطا')}>
                            Forget Password?
                        </button>

                        <div className='d-flex-center gap-2'>
                            Not A Member Yet? <Link to='/auth/register' className='btn btn-outline-bgTransparent'>
                                Create Account
                            </Link>
                        </div>

                    </div>

                </div>
            </form>
        </div>
    );
}

export default Forms(LoginForm);
