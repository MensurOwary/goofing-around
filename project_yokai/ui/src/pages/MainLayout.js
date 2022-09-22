import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useToken } from "./customHooks";

const AppContainer = styled.div`
    display: grid;
    grid-template-columns: 25% 50% 25%;
    min-height: 100vh;
`;

const LeftContainer = styled.div`
    min-width: 25vw;
    top: 0;
    left: 0;
    position: fixed;
    height: 100%;
    padding-left: 2%;
`;

const RightContainer = styled.div`
    min-width: 25vw;
    right: 0;
    top: 0;
    position: fixed;
    min-height: 100vh;
    text-align: right;
    padding-right: 5%;
`;

const PostsContainer = styled.div`
    padding-top: 2%;
    width: 50vw;
    top: 0;
    left: 25vw;
    position: absolute;
    box-sizing: border-box;
`;

const LinkStyling = {
    textDecoration: "none",
    color: "black",
};

const PostScrollbar = styled.div`
    width: 65%;
    margin: 0 auto;
`;

export const MainLayout = ({ children }) => {
    const [, , clearToken] = useToken()
    const navigate = useNavigate()

    const handleLogout = () => {
        clearToken()
        navigate('/login')
    }

    return (
        <AppContainer>
            <LeftContainer>
                <Link to="/" style={{ ...LinkStyling }}>
                    <h1>koneko</h1>
                </Link>
            </LeftContainer>
            <PostsContainer>
                <PostScrollbar>{children}</PostScrollbar>
            </PostsContainer>
            <RightContainer>
                <Link to="/me" style={{ ...LinkStyling }}>
                    <h1>profile</h1>
                </Link>
                <h1 onClick={handleLogout} style={{
                    cursor: "pointer"
                }}>logout</h1>
            </RightContainer>
        </AppContainer>
    );
};
