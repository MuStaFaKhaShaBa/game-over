import Joi from 'joi';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Forms, { sentDataToAPI, User } from '../forms/Forms';
import Loader from '../loader/Loader';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [HideLoader, setHideLoader] = useState(true);
    const [UserData, setUserData] = useState(new User());

    // To Hold Errors [0]=> true there no Problem , false There is.
    // [1]=> Message
    const [ErrorList, setErrorList] = useState(new User(
        [true, ''],
        [true, ''],
        [true, ''],
        [true, ''],
        [true, '']
    ));

    const schema = Joi.object(new User(
        Joi.string().min(3).required(),
        Joi.string().min(3).required(),
        Joi.string().pattern(/^([a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,})$/).email({ tlds: ['com', 'net'] }).required(),
        Joi.string().min(8).pattern(/[A-Z]+[a-z]+/).required(),
        Joi.number().min(18).required()
    ));

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
            const { data: { errors = false } } = await sentDataToAPI('signup', UserData);
            // if there errors found
            if (errors) {
                const details = Object.entries(errors).map(([key, { message }]) => ({ context: { key }, message }))
                handleErrorsResponse({ details });
            } else {
                navigate('/');
            }
        }
        setHideLoader(true);
    }

    return (
        <div className='text-center py-4'>
            <Loader hide={HideLoader} />
            <h1 className="text-white text-muted fs-3">Create My Account!</h1>

            <form className='container mt-4 text-muted' onSubmit={handleSubmitData}>
                <div className='row gx-0 gx-md-3 gy-4 gy-sm-3'>
                    <div className='col-md-6'>
                        <input className={`form-control rounded-1 py-3 text-white 
                        bg-black bg-opacity-50 border-dark ${ErrorList.first_name[0] === false && 'is-invalid'}`}
                            type="text" name='first_name' value={UserData.first_name} placeholder="First Name"
                            onChange={handleChange} aria-label="mostafa" />

                        <p className='invalid-feedback text-danger fs-7 text-start mb-0'>
                            {
                                ErrorList.first_name[1]
                            }
                        </p>
                    </div>

                    <div className='col-md-6'>
                        <input className={`form-control rounded-1 py-3 text-white 
                        bg-black bg-opacity-50 border-dark ${ErrorList.last_name[0] === false && 'is-invalid'}`}
                            type="text" name='last_name' value={UserData.last_name} placeholder="Last Name"
                            onChange={handleChange} aria-label="maher" />

                        <p className='invalid-feedback text-danger fs-7 text-start mb-0'>
                            {
                                ErrorList.last_name[1]
                            }
                        </p>
                    </div>

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
                        bg-black bg-opacity-50 border-dark ${ErrorList.age[0] === false && 'is-invalid'}`}
                            type="number" name='age' value={UserData.age || ''} placeholder="Age"
                            onChange={handleChange} ria-label="18" />

                        <p className='invalid-feedback text-danger fs-7 text-start mb-0'>
                            {
                                ErrorList.age[1]
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
                        <button type='submit' className='btn btn-dark shadow-md w-100 py-2 rounded-1'
                        >
                            Create Account
                        </button>
                    </div>

                    <div className='col-12'>
                        <p className='fs-7'>
                            This site is protected by reCAPTCHA and the
                            Google <a className='text-decoration-underline' href="https://policies.google.com/privacyhttps://policies.google.com/privacy">Privacy
                                Policy</a> and <a className='text-decoration-underline' href='https://policies.google.com/terms'>Terms</a> of <a className='text-decoration-underline' href='https://policies.google.com/terms'>Service</a> apply.
                        </p>
                    </div>

                    <hr className='m-0' />

                    <div className='col-12 d-flex-center gap-2'>
                        Already a member? <Link to='/auth' className='btn btn-outline-bgTransparent'>
                            Login
                        </Link>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default Forms(RegisterForm);
