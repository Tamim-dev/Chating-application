import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Image from "../layout/Image";
import profile from "../../assets/profile.png";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const Userlist = () => {
    let [userList, setUserList] = useState([]);
    let [friendRequest, setFriendRequest] = useState([]);
    let [friends, setFriends] = useState([]);
    const db = getDatabase();
    const auth = getAuth();

    let userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        const usersRef = ref(db, "friendrequest/");
        onValue(usersRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid);
            });
            setFriendRequest(arr);
        });

        onValue(ref(db, "friends/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid);
            });
            setFriends(arr);
        });
    }, []);

    useEffect(() => {
        const usersRef = ref(db, "users/");
        onValue(usersRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid != item.key) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setUserList(arr);
        });
    }, []);

    let handelFriendrequest = (item) => {
        set(ref(db, "friendrequest/" + item.id), {
            senderid: auth.currentUser.uid,
            sendername: auth.currentUser.displayName,
            receiverid: item.id,
            receivername: item.username,
        });
    };

    let handelcencel = (item) => {
        remove(ref(db, "friendrequest/" + item.id));
    };

    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">User List</h3>
            </div>
            {userList.map((item, index) => (
                <div key={index} className="list">
                    <div className="profileImg">
                        <Image
                            className="imgprofile"
                            imgsrc={item.profile_picture}
                        />
                    </div>
                    <div className="profileName">
                        <h3>{item.username}</h3>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    <div className="profileBtn">
                        {friendRequest.includes(
                            item.id + auth.currentUser.uid
                        ) ? (
                            <Button
                                onClick={() => handelcencel(item)}
                                className="btncolor"
                                size="small"
                                variant="contained"
                            >
                                cencel
                            </Button>
                        ) : friendRequest.includes(
                              auth.currentUser.uid + item.id
                          ) ? (
                            <Button
                                className="btncolor"
                                size="small"
                                variant="contained"
                            >
                                pending
                            </Button>
                        ) : friends.includes(
                              auth.currentUser.uid + item.id
                          ) || friends.includes (item.id + auth.currentUser.uid) ? (
                            <Button
                                className="btncolorsuccess"
                                size="small"
                                variant="contained"
                            >
                                Friend
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handelFriendrequest(item)}
                                className="btncolor"
                                size="small"
                                variant="contained"
                            >
                                +
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Userlist;
