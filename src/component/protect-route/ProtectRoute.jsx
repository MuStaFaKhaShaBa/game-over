import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StatusContext } from '../../App';

const ProtectRoute = ({ children }) => {
    const { pathname } = useLocation();
    const { Status } = useContext(StatusContext);
    const navigate = useNavigate();

    useEffect(_ => {
        if (Status !== 'loggedin' && !window.localStorage.getItem('userToken')) {
            if (pathname.split('/').includes('register')) {
                navigate('/auth/register');
            } else {
                navigate('/auth');
            }
        }
    }, [Status, pathname, navigate])

    return children
}

export default ProtectRoute;
