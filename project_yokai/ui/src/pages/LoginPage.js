import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useToken } from "./customHooks";

const AppContainer = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
`;

const LoginForm = styled.div`
    width: 30vw;
    max-height: 60vh;
    background-color: white;
    align-self: center;
    border: 3px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 90%;
    margin-bottom: 1%;
    padding: 2%;
    border: 3px solid black;
    font-family: "Noto Sans", sans-serif;
    font-weight: bolder;
`;

const Actions = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 2%;
`;

const ActionBtn = styled.div`
    border: 3px solid black;
    padding: 2% 5%;
    font-family: "Noto Sans", sans-serif;
    font-weight: bolder;
    cursor: pointer;
`;

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setToken] = useToken()

    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate("/sign-up");
    };

    const handleLogin = async () => {
        const resp = await fetch(`http://localhost:8080/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        const { token } = await resp.json();
        setToken(token)
        navigate("/me")
    };

    return (
        <AppContainer>
            <LoginForm>
                <h1
                    style={{
                        textAlign: "center",
                    }}
                >
                    login
                </h1>

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Actions>
                    <ActionBtn onClick={handleLogin}>login</ActionBtn>
                    <ActionBtn onClick={goToSignUp}>sign up</ActionBtn>
                </Actions>
            </LoginForm>
        </AppContainer>
    );
};
