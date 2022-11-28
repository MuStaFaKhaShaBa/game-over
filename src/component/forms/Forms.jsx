import axios from 'axios';
import React from 'react';
import styles from './forms.module.css'

export const sentDataToAPI = async (type,User) => {
    const Response = await axios.post(`https://route-egypt-api.herokuapp.com/${type}`,User);
    return Response;
}

export class User {
    constructor(fName = '', lName = '', email = '', password = '', age = 0) {
        this.first_name = fName;
        this.last_name = lName;
        this.email = email;
        this.password = password;
        this.age = age;
    }
}

const Forms = OriginalComponent => {
    const newComponent = _ => {

        return (
            <div className={`${styles['forms']} container d-flex-center p-4 p-sm-5 p-md-6`}>
                <div className={`${styles['container']} row bg-dark w-100 p-1 rounded-2`}>
                    <div className={`col-6 d-none d-lg-block rounded-2 ${styles['poster']}`}></div>
                    <div className='col-lg-6'>
                        <OriginalComponent />
                    </div>
                </div>
            </div>
        )
    }
    return newComponent;
}

export default Forms;
