import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Image from "./layout/Image";
import profile from "../assets/profile.png";
import Box from "@mui/material/Box";
import { TextField, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 240,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 3,
    px: 4,
    pb: 3,
};

let initialValue = {
    groupName: "",
    groupTagline: "",
    error: "",
    loading: false,
};

const Mesgroups = () => {
    const db = getDatabase();
    const [open, setOpen] = useState(false);
    const [groupInfo, setGroupInfo] = useState(initialValue);
    let [groups, setGroups] = useState([]);
    let [groupRequest, setGroupRequest] = useState([]);
    let [groupMembers, setGroupMembers] = useState([]);

    let userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        // ==== groups data ==== //
        onValue(ref(db, "groups/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), groupId: item.key });
            });
            setGroups(arr);
        });

        // ==== members data ==== //

        onValue(ref(db, "members/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val());
            });
            setGroupMembers(arr);
        });
    }, []);

    let handelMagBtn =(item)=>{
        console.log(item);
    }
    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">Groups</h3>
            </div>
            {groups.map((item, index) =>
                userData.uid == item.adminId ? (
                    <div key={index} className="list">
                        <div className="profileImg">
                            <Image className="imgprofile" imgsrc={profile} />
                        </div>
                        <div className="profileName">
                            <p style={{ fontSize: "10px" }}>
                                Admin: {item.adminName}
                            </p>
                            <h3>{item.groupName}</h3>
                            <p>{item.groupTagline}</p>
                        </div>
                        <div className="friendsBtn">
                            <Button
                                className="btncolor"
                                size="small"
                                variant="contained"
                                onClick={()=>handelMagBtn(item)}
                            >
                                Messages
                            </Button>
                        </div>
                    </div>
                ) : (
                    groupMembers.map(
                        (mes) =>
                            mes.userId == userData.uid &&
                            item.groupId == mes.groupId && (
                                <div key={index} className="list">
                                    <div className="profileImg">
                                        <Image
                                            className="imgprofile"
                                            imgsrc={profile}
                                        />
                                    </div>
                                    <div className="profileName">
                                        <p style={{ fontSize: "10px" }}>
                                            Admin: {mes.adminName}
                                        </p>
                                        <h3>{mes.groupName}</h3>
                                        <p>{mes.groupTagline}</p>
                                    </div>
                                    <div className="friendsBtn">
                                        <Button
                                            className="btncolor"
                                            size="small"
                                            variant="contained"
                                        >
                                            Messages
                                        </Button>
                                    </div>
                                </div>
                            )
                    )
                )
            )}
        </div>
    );
};

export default Mesgroups;