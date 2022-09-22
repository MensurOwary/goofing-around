import { useEffect, useState } from "react";

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem("token");
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setTokenInternal(token);
        }
    }, []);

    const setToken = newToken => {
        setTokenInternal(newToken);
        localStorage.setItem("token", newToken);
    }

    const clearToken = () => {
        setTokenInternal(null);
        localStorage.removeItem("token");
    }

    return [token, setToken, clearToken];
};

export const useUser = () => {
    const [token, setToken] = useToken();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            const { sub: name, email } = JSON.parse(
                window.atob(token.split(".")[1])
            );
            setUser({
                name,
                email,
            });
        } else {
            setUser(null)
        }
    }, [token]);

    return user;
};
