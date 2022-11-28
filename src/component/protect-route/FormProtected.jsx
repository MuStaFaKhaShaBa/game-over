import  { useContext, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { StatusContext } from '../../App';

const FormProtect = ({ children }) => {
    const { Status } = useContext(StatusContext);
    const navigate = useNavigate();

    useEffect(_ => {
        if (Status === 'loggedin') {
            navigate('/game-over/games');
        }
    }, [Status,navigate])
    return children;
}

export default FormProtect;
