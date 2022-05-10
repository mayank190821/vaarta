import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/api.routes';
import { Buffer } from 'buffer';
import loader from "../assets/loader.gif";
function SetAvatar() {
    const api = "https://api.multiavatar.com";
    const navigate = useNavigate();
    const [avatars, setAvatar] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark"
    }
    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
        }
    }, [])
    const setProfilePicture = async () => {
        console.log("clicked")
        console.log(selectedAvatar)
        if (selectedAvatar.length == 0) {
            toast.error("please select an avatar", toastOptions)
        }
        else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                nagivate("/")
            }
            else {
                toast.error("Error setting avatar Try again")
            }
        }
    };
    useEffect(() => {
        async function fetchData() {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 10000)}`
                );
                console.log("yha")
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatar(data);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    return (
        <>
            {
                isLoading ? (
                    <Container>
                        <img src={loader} style={{ width: "20rem", height: "20rem" }} alt="loader" />

                    </Container>
                ) :
                    (
                        <Container>
                            <div className="title-container">
                                <h1>
                                    Pick an Avatar as your profile picture
                                </h1>
                            </div>
                            <div className="avatars">
                                {avatars.map((avatar, index) => {
                                    return (
                                        <div
                                            className={`avatar ${selectedAvatar === index ? "selected" : ""
                                                }`}
                                        >{
                                            }
                                            <img
                                                src={`data:image/svg+xml;base64,${avatar}`}
                                                alt="avatar"
                                                key={index}
                                                onClick={() => setSelectedAvatar(index)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <button className='submit-btn' onClick={setProfilePicture}> Set Picture</button>
                        </Container>
                    )
            }
            <ToastContainer />
        </>
    )
}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader {
  max-inline-size: 100%;
}
.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;
  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
`
export default SetAvatar