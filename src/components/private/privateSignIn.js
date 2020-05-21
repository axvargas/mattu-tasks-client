import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/context';

const PrivateSignIn = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { authentication, getAuthUser, signedIn, token } = authContext;

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
                props => authentication && signedIn ?
                    <Redirect to="/projects" />
                    :
                    <Component {...props} />
            }
        />
    );
}
export default PrivateSignIn;