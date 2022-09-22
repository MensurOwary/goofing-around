import { Post } from "./Post";
import { MainLayout } from "./MainLayout";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useToken } from "./customHooks";

const PostBlock = styled.div`
        padding: 2%;
        max-height: 60vh;
        background-color: white;
        align-self: center;
        border: 3px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2%;
    `;

    const Actions = styled.div`
        display: flex;
        flex: 1;
        width: 100%;
        justify-content: space-evenly;
    `;

    const ActionBtn = styled.div`
        border: 3px solid black;
        padding: 2% 5%;
        font-family: "Noto Sans", sans-serif;
        font-weight: bolder;
        cursor: pointer;
    `;

    const PostContent = styled.textarea`
        width: 90%;
        margin-bottom: 1%;
        padding: 2%;
        border: 3px solid black;
        font-family: "Noto Sans", sans-serif;
        font-weight: bolder;
        resize: none;
        min-height: 10vh;
    `;

export const CreatePostBlock = () => {

    const [content, setContent] = useState("");
    const [token] = useToken();

    const createPost = async () => {
        const resp = await fetch(`http://localhost:8080/posts`, {
            method: "POST",
            body: JSON.stringify({
                content,
            }),
            headers: {
                "content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (resp.status === 201) {
            clearPost();
        } else {
            console.log(`Error: ${resp.status}`);
        }
    };

    const clearPost = () => {
        setContent("");
    };

    return (
        <PostBlock>
            <PostContent
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
                placeholder="What's on your mind?"
            />
            <Actions>
                <ActionBtn onClick={clearPost}>clear</ActionBtn>
                <ActionBtn onClick={createPost}>post</ActionBtn>
            </Actions>
        </PostBlock>
    );
};

export const MainPage = () => {
    const [token] = useToken()
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const resp = await fetch(`http://localhost:8080/posts`, {
            headers: {
                "content-type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const posts = await resp.json()
        setPosts(posts)
    }

    useEffect(() => {
        (async () => fetchPosts())()
    }, [])


    return (
        <MainLayout>
            <CreatePostBlock />
            {posts.map(({id, content, date}) => {
                return (
                    <Post 
                        key={id}
                        text={content}
                        date={new Date(date).toLocaleDateString()}
                    />
                )
            })}
        </MainLayout>
    );
};
