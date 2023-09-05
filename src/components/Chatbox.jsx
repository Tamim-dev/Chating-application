import React, { useState, useEffect } from "react";
import messages from "../design/messages.css";
import Image from "./layout/Image";
import resgisrationimg from "../assets/registrationimg.png";
import profile from "../assets/profile.png";
import ModalImage from "react-modal-image";
import { Button } from "@mui/material";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";

const Chatbox = () => {
    const db = getDatabase();
    let [meg, setMeg] = useState("");
    let chatData = useSelector((state) => state.activeChat.activeChat);
    let userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        onValue(ref(db, "singlmsg/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val());
            });
            setGroups(arr);
        });
    }, []);

    let handelmeg = () => {
        if (meg != "") {
            if (chatData.type == "singlemsg") {
                set(push(ref(db, "singlmsg")), {
                    getmegid: chatData.id,
                    getmegname: chatData.name,
                    sendmegid: userData.uid,
                    sendmegname: userData.displayName,
                    meg: meg,
                });
            } else {
                console.log("group");
            }
        }
    };

    return (
        <div className="boxs">
            <div className="chatprofile">
                <Image width="60" className="chatprofileimg" imgsrc={profile} />
                <div className="circlebox"></div>
                <div className="chatname">
                    <h3>{chatData.name}</h3>
                    <p>Online</p>
                </div>
            </div>

            <div className="chattext">
                <div>
                    <p className="chattextmes box3 sb14">Hey There !</p>
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div className="sendmess">
                    <p className="sendchattextmes sendbox3 sendsb14">
                        Hey There !
                    </p>
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                {/*
                <div>
                    <ModalImage
                        className="sendimg"
                        small={resgisrationimg}
                        large={resgisrationimg}
                    />
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div className="sendmess">
                    <ModalImage
                        className="sendimg"
                        small={resgisrationimg}
                        large={resgisrationimg}
                    />
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                
                <div>
                    <audio style={{ marginTop: "2px" }} controls></audio>
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div className="sendmess">
                    <audio style={{ marginTop: "2px" }} controls></audio>
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div>
                    <video width="360" height="240" controls></video>
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div className="sendmess">
                    <video width="360" height="240" controls></video>
                    <p className="chattime">Today, 2:01pm</p>
                </div>*/}
            </div>
            <div className="chatinputbox">
                <input
                    className="chatinput"
                    onChange={(e) => setMeg(e.target.value)}
                />
                <Button
                    className="chatbtn"
                    variant="contained"
                    onClick={handelmeg}
                >
                    <RiSendPlaneFill />
                </Button>
            </div>
        </div>
    );
};

export default Chatbox;
