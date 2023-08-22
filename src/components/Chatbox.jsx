import React from "react";
import messages from "../design/messages.css";
import Image from "./layout/Image";
import resgisrationimg from "../assets/registrationimg.png";
import profile from "../assets/profile.png";
import ModalImage from "react-modal-image";
import { Button } from "@mui/material";
import {RiSendPlaneFill} from "react-icons/ri"

const Chatbox = () => {
    return (
        <div className="boxs">
            <div className="chatprofile">
                <Image width="60" className="chatprofileimg" imgsrc={profile} />
                <div className="circlebox"></div>
                <div className="chatname">
                    <h3>Swathi</h3>
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
                </div>
            </div>
            <div className="chatinputbox">
            <input className="chatinput"/>
            <Button variant="contained" ><RiSendPlaneFill/></Button>
            </div>
        </div>
    );
};

export default Chatbox;
