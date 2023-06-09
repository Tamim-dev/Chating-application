import React from "react";
import Button from "@mui/material/Button";
import Image from "../layout/Image";
import profile from "../../assets/profile.png";

const Mygroups = () => {
    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">My Groups</h3>
                <Button className="btncolor" size="small" variant="contained">
                    Create Group
                </Button>
            </div>
            <div className="list">
                <div>
                    <Image className="imgprofile" imgsrc={profile} />
                </div>
                <div>
                    <h3>Friends Reunion</h3>
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                <p className="time">Today, 8:56pm</p>
                </div>
            </div>
            <div className="list">
                <div>
                    <Image className="imgprofile" imgsrc={profile} />
                </div>
                <div>
                    <h3>Friends Reunion</h3>
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                <p className="time">Today, 8:56pm</p>
                </div>
            </div>
            <div className="list">
                <div>
                    <Image className="imgprofile" imgsrc={profile} />
                </div>
                <div>
                    <h3>Friends Reunion</h3>
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                <p className="time">Today, 8:56pm</p>
                </div>
            </div>
            <div className="list">
                <div>
                    <Image className="imgprofile" imgsrc={profile} />
                </div>
                <div>
                    <h3>Friends Reunion</h3>
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                <p className="time">Today, 8:56pm</p>
                </div>
            </div>
            <div className="list">
                <div>
                    <Image className="imgprofile" imgsrc={profile} />
                </div>
                <div>
                    <h3>Friends Reunion</h3>
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                <p className="time">Today, 8:56pm</p>
                </div>
            </div>
            <div className="list">
                <div>
                    <Image className="imgprofile" imgsrc={profile} />
                </div>
                <div>
                    <h3>Friends Reunion</h3>
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                <p className="time">Today, 8:56pm</p>
                </div>
            </div>
            <div className="list">
                <div>
                    <Image className="imgprofile" imgsrc={profile} />
                </div>
                <div>
                    <h3>Friends Reunion</h3>
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                <p className="time">Today, 8:56pm</p>
                </div>
            </div>
            <div className="list">
                <div>
                    <Image className="imgprofile" imgsrc={profile} />
                </div>
                <div>
                    <h3>Friends Reunion</h3>
                    <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                <p className="time">Today, 8:56pm</p>
                </div>
            </div>
        </div>
    );
};

export default Mygroups;
