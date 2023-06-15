import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Image from "../layout/Image";
import profile from "../../assets/profile.png";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

const Userlist = () => {
    let [userList, setUserList] = useState([]);
    let [friendRequest, setFriendRequest] = useState([]);
    const db = getDatabase();
    const auth = getAuth();

    useEffect(() => {
        const usersRef = ref(db, "friendrequest/");
        onValue(usersRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid+ item.val().senderid);
            });
            setFriendRequest(arr);
        });
    }, []);

    useEffect(() => {
        const usersRef = ref(db, "users/");
        onValue(usersRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setUserList(arr);
        });
    }, []);

    let handelFriendrequest = (item) => {
        set(ref(db, "friendrequest/"+(item.id + auth.currentUser.uid)), {
            senderid: auth.currentUser.uid,
            sendername: auth.currentUser.displayName,
            receiverid: item.id,
            receivername: item.username,
        });
    };

    let handelcencel =(item)=>{
        remove(ref(db, "friendrequest/" + (item.id + auth.currentUser.uid)))
    }

    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">User List</h3>
            </div>
            {userList.map((item, index) => (
                <div key={index} className="list">
                    <div>
                        <Image
                            className="imgprofile"
                            imgsrc={item.profile_picture}
                        />
                    </div>
                    <div>
                        <h3>{item.username}</h3>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    <div>
                        {friendRequest.includes(
                            item.id + auth.currentUser.uid
                        ) ? 
                            <Button
                                onClick={() => handelcencel(item)}
                                className="btncolor"
                                size="small"
                                variant="contained"
                            >
                                cencel
                            </Button>
                         : 
                            <Button
                                onClick={() => handelFriendrequest(item)}
                                className="btncolor"
                                size="small"
                                variant="contained"
                            >
                                +
                            </Button>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Userlist;
