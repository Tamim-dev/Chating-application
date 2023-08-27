import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Image from "./layout/Image";
import profile from "../assets/profile.png";
import { useSelector,useDispatch } from "react-redux";
import { activeChat } from "./slices/activeChat/activeChatSlice";
import {
    getDatabase,
    ref,
    onValue,
} from "firebase/database";


const Mesgroups = () => {
    const db = getDatabase();
    let dispatch =useDispatch()
    let [groups, setGroups] = useState([]);
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

    let handelMagBtn=(item)=>{
        if(userData.uid == item.receiverid){
            dispatch(activeChat({
                type: "groupmsg",
                name: item.groupName,
                id:item.groupId
            }))
            localStorage.setItem("activeChat" ,JSON.stringify({
                type: "groupmsg",
                name: item.groupName,
                id:item.groupId
            }))
        }else{
            dispatch(activeChat({
                type: "groupmsg",
                name: item.groupName,
                id:item.groupId
            }))
            localStorage.setItem("activeChat" ,JSON.stringify({
                type: "groupmsg",
                name: item.groupName,
                id:item.groupId
            }))
        }
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
                                            onClick={()=>handelMagBtn(item)}
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
