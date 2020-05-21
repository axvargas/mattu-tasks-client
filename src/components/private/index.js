import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/context';

const PrivateRoute = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { authentication, getAuthUser, loading, token } = authContext;

    useEffect(() => {
        if (token) {
            getAuthUser();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Route
            {...props}
            render={
                props => !authentication && !loading ?
                    <Redirect to="/" />
                    :
                    <Component {...props} />
            }
        />
    );
}
export default PrivateRoute;