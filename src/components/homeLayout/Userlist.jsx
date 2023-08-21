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
    let [block, setblock] = useState([]);
    const db = getDatabase();
    const auth = getAuth();

    let userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {

        onValue(ref(db, "friendrequest/"), (snapshot) => {
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

        onValue(ref(db, "users/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid != item.key) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setUserList(arr);
        });
        onValue(ref(db, "block/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid != item.key) {
                    arr.push(item.val().blockById + item.val().blockId);
                }
            });
            setblock(arr);
        });

    }, []);


    let handelFriendrequest = (item) => {
        set(push(ref(db, "friendrequest/" )), {
            senderid: auth.currentUser.uid,
            sendername: auth.currentUser.displayName, 
            receiverid: item.id,
            receivername: item.username,
        });
    };

    let handelcencel = (items) => {
        let cencel = "";
        onValue(ref(db, "friendrequest/"), (snapshot) => {
            snapshot.forEach((item) => {
                if (
                    item.val().senderid == userData.uid &&
                    items.id == item.val().receiverid
                ) {
                    cencel = item.key;
                }
            });
        });
        remove(ref(db, "friendrequest/" + cencel));
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
                        ) : block.includes(
                            auth.currentUser.uid + item.id
                        ) || block.includes (item.id + auth.currentUser.uid) ? (
                          <Button
                              className="btncolorerror"
                              size="small"
                              variant="contained"
                          >
                              Block
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
