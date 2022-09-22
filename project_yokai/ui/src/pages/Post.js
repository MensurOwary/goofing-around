import styled from "styled-components";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";

export const Post = ({ text, date }) => {
    const PostBlock = styled.div`
        background-color: white;
        border: 4px solid black;
        box-sizing: border-box;
        margin-bottom: 2%;
        width: 100%;
    `;

    const Header = styled.div`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 6vh;
    `;

    const Person = styled.div`
        flex: 1;
        box-sizing: border-box;
        padding: 1%;
        overflow: hidden;
    `;

    const Time = styled.div`
        flex: 8;
        text-align: right;
        padding-right: 1%;
    `;

    const ProfilePic = styled.img`
        max-width: 100%;
        max-height: 100%;
        border-radius: 50%;
    `;

    const Content = styled.div`
        font-family: "Noto Sans", sans-serif;
        padding: 0 2%;
    `;

    const Actions = styled.div`
        display: flex;
        box-sizing: border-box;
        text-align: center;
    `;

    const ActionBtn = styled.div`
        flex: 1;
    `;

    return (
        <PostBlock>
            <Header>
                <Person>
                    <ProfilePic
                        src="https://pbs.twimg.com/profile_images/1454704596182454281/GSnffqUN_400x400.jpg"
                        alt=""
                    />
                </Person>
                <Time>
                    <p>{date}</p>
                </Time>
            </Header>

            <Content>
                <p>{text}</p>
            </Content>

            <Actions>
                <ActionBtn>
                    <AiOutlineHeart size={40} />
                </ActionBtn>
                <ActionBtn>
                    <AiOutlineShareAlt size={40} />
                </ActionBtn>
            </Actions>
        </PostBlock>
    );
};
