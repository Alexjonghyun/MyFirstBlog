import React from "react";
import {Route, Redirect, Link} from "react-router-dom";
import LoginPage from "./pages/LoginPage";


function AuthRoute({ authenticated, component: Component, render, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated ? (
                    render ? (
                        render(props)
                    ) : (
                        <Component {...props} />
                    )
                ) : (
                    <Link to='/'></Link>
                )
            }
        />
    );
}

export default AuthRoute;