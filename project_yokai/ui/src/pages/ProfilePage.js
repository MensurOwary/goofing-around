import styled from "styled-components";
import { useUser } from "./customHooks";
import { MainLayout } from "./MainLayout";

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Profile = styled.div`
    max-height: 60vh;
    width: 100%;
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

const Bio = styled.textarea`
    width: 90%;
    margin-bottom: 1%;
    padding: 2%;
    border: 3px solid black;
    font-family: "Noto Sans", sans-serif;
    font-weight: bolder;
    resize: none;
    min-height: 10vh;
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

export const ProfilePage = () => {
    const user = useUser()

    return (
        <MainLayout>
            <ProfileWrapper>
                <Profile>
                    <h1
                        style={{
                            textAlign: "center",
                        }}
                    >
                        profile
                    </h1>

                    <Input type="text" placeholder="name" value={user ? user.name : '...'} />
                    <Bio placeholder="bio">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam beatae nam fuga tempora id consectetur suscipit
                        fugit dolore, dolorum quidem sint earum qui a ullam
                        ipsam nobis officia exercitationem expedita!
                    </Bio>

                    <Actions>
                        <ActionBtn>save</ActionBtn>
                    </Actions>
                </Profile>
            </ProfileWrapper>
        </MainLayout>
    );
};
