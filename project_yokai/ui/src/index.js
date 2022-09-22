import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useToken } from "./pages/customHooks";
import "./index.css";

const AppRoutes = () => {
    const [token] = useToken()

    const routes = [
        { path: '/', element: <MainPage />, exact: true, isPrivate: true },
        { path: '/me', element: <ProfilePage />, exact: true, isPrivate: true },
        { path: '/sign-up', element: <SignUpPage />, exact: true, isPrivate: false },
        { path: '/login', element: <LoginPage />, exact: true, isPrivate: false }
    ]

    const createRoute = props => {
        const {isPrivate, ...other} = props
        if (isPrivate) {
            const element = token ? other.element : <Navigate to={'/login'} replace />   
            const passedProps = {...other, element}
            return <Route {...passedProps}/>
        }
        return <Route {...other}/>
    }


    return (
        <BrowserRouter>
            <Routes>
                {routes.map(createRoute)}
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppRoutes />
    </React.StrictMode>
);

reportWebVitals();
