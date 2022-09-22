import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken } from "./customHooks";

const AppContainer = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
`;

const SignUpForm = styled.div`
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

export const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();
    const [, setToken] = useToken();

    const goToLogin = () => {
        navigate("/login");
    };

    const isPasswordValid = () =>
        password1 &&
        password2 &&
        password1 === password2 &&
        password1.trim().length > 4;

    const handleSignUp = async () => {
        if (isPasswordValid() && name && email) {
            const resp = await fetch(`http://localhost:8080/auth/register`, {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password: password1,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            const { token } = await resp.json();
            setToken(token);
            navigate("/me");
        }
    };

    useEffect(() => {
        setPasswordError(password1 !== password2);
    }, [password1, password2]);

    return (
        <AppContainer>
            <SignUpForm>
                <h1
                    style={{
                        textAlign: "center",
                    }}
                >
                    sign up
                </h1>

                <Input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    style={
                        passwordError
                            ? {
                                  borderColor: "red",
                              }
                            : {
                                  borderColor: "black",
                              }
                    }
                />
                <Input
                    type="password"
                    placeholder="confirm password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    style={
                        passwordError
                            ? {
                                  borderColor: "red",
                              }
                            : {
                                  borderColor: "black",
                              }
                    }
                />

                <Actions>
                    <ActionBtn onClick={handleSignUp}>sign up</ActionBtn>
                    <ActionBtn onClick={goToLogin}>login</ActionBtn>
                </Actions>
            </SignUpForm>
        </AppContainer>
    );
};
