import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Image from "../layout/Image";
import profile from "../../assets/profile.png";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";

const Mygroups = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loggedUser.loginUser);

    let [groups, setGroups] = useState([]);

    useEffect(() => {
        onValue(ref(db, "groups/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().adminId) {
                    arr.push(item.val());
                }
            });
            setGroups(arr);
        });
    }, []);

    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">My Groups</h3>
                <Button className="btncolor" size="small" variant="contained">
                    Create Group
                </Button>
            </div>
            {groups.map((item,index) => (
                <div key={index} className="list">
                    <div className="profileImg">
                        <Image className="imgprofile" imgsrc={profile} />
                    </div>
                    <div className="profileName">
                        <p style={{fontSize:"10px"}}>Admin: {item.adminName}</p>
                        <h3>{item.groupName}</h3>
                        <p>{item.groupTagline}</p>
                    </div>
                    <div className="friendsBtn">
                        <Button
                            className="btncolor"
                            size="small"
                            variant="contained"
                        >
                            request
                        </Button>
                        <Button
                            className="btncolorsuccess"
                            size="small"
                            variant="contained"
                        >
                            memder
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Mygroups;
