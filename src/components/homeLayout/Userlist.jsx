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
import { useSelector } from "react-redux";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdPersonRemoveAlt1, MdPending } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const Userlist = () => {
    let [userList, setUserList] = useState([]);
    let [friendRequest, setFriendRequest] = useState([]);
    let [friends, setFriends] = useState([]);
    let [block, setblock] = useState([]);
    const db = getDatabase();

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
        set(push(ref(db, "friendrequest/")), {
            senderid: userData.uid,
            sendername: userData.displayName,
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
                            item.id + userData.uid
                        ) ? (
                            <Button
                                onClick={() => handelcencel(item)}
                                className="btncolorerror tooltip"
                                size="small"
                                variant="contained"
                            > 
                            <span class="tooltiptext">cencel</span>
                                <MdPersonRemoveAlt1 />
                            </Button>
                        ) : friendRequest.includes(
                            userData.uid+ item.id
                          ) ? (
                            <Button
                                className="btncolorunfriend tooltip"
                                size="small"
                                variant="contained"
                            >
                            <span class="tooltiptext">Pending</span>
                                <MdPending />
                            </Button>
                        ) : friends.includes(userData.uid + item.id) ||
                          friends.includes(item.id + userData.uid) ? (
                            <Button
                                className="btncolorsuccess tooltip"
                                size="small"
                                variant="contained"
                            >
                            <span class="tooltiptext">Friend</span>
                                <FaUserFriends />
                            </Button>
                        ) : block.includes(userData.uid + item.id) ||
                          block.includes(item.id + userData.uid) ? (
                            <Button
                                className="btncolorerror tooltip"
                                size="small"
                                variant="contained"
                            >
                            <span class="tooltiptext">Blocked</span>
                                <ImBlocked />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handelFriendrequest(item)}
                                className="btncolor tooltip"
                                size="small"
                                variant="contained"
                            >
                            <span class="tooltiptext">Add Friend</span>
                                <BsPersonFillAdd/>
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Userlist;
