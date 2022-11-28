import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Games from './component/games/Games';
import Home from './component/home/Home';
import LoginForm from './component/login/LoginForm';
import FormProtect from './component/protect-route/FormProtected';
import ProtectRoute from './component/protect-route/ProtectRoute';
import RegisterForm from './component/register/RegisterForm';
import GameDetails from './component/view-container/GameDetails';
import ErrorPage from './routes/error-page';
import Root from './routes/Root';

export const StatusContext = createContext();
export const UserDataContext = createContext();

const App = () => {

  const [Status, setStatus] = useState(
    window.location.pathname.split('/').includes('register') ?
      'register'
      :
      'login'
  );
  const [User, setUser] = useState({});

  const getUserData = _ => {
    const Token = window.localStorage.getItem('userToken');

    setStatus(Token ? 'loggedin'
      :
      window.location.pathname.split('/').includes('register') ?
        'register'
        :
        'login'
    )
    setUser(Token ? jwtDecode(Token) : {});
  };

  useEffect(_ => {
    getUserData();
  }, [])

  const routes = createHashRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <Root />,
      children: [
        {
          path: '/',
          children: [
            {
              index: true,
              element: <ProtectRoute><Home /></ProtectRoute>
            },
            {
              path: '/games',
              children: [
                {
                  path: 'all',
                  element: <ProtectRoute><Games /></ProtectRoute>,
                  errorElement: <ErrorPage />
                },
                {
                  path: ':filter/:type',
                  element: <ProtectRoute><Games /></ProtectRoute>,
                  errorElement: <ErrorPage />
                },{
                  path:'game-details/:id',
                  element:<ProtectRoute><GameDetails /></ProtectRoute>,
                  errorElement: <ErrorPage />
                }
              ]
            }
          ]
        },
        {
          path: '/auth',
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <FormProtect> <LoginForm /></FormProtect>
            },
            {
              path: 'register',
              element: <FormProtect> <RegisterForm /></FormProtect>
            }
          ]
        }
      ]
    }
  ])

  return (
    <StatusContext.Provider value={{ Status, setStatus }} >
      <UserDataContext.Provider value={{ User, setUser }}>
          <RouterProvider router={routes} />
      </UserDataContext.Provider>
    </StatusContext.Provider>
  );
}

export default App;
