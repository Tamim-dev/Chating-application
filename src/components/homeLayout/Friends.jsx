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
import { useSelector,useDispatch } from "react-redux";
import {activeChat} from "../slices/activeChat/activeChatSlice"
import {ImBlocked} from "react-icons/im"
import {AiOutlineUserDelete}from "react-icons/ai"
import {LuMessagesSquare}from "react-icons/lu"

const Friends = ({button}) => {
    const db = getDatabase();
    let dispatch =useDispatch()
    let userData = useSelector((state) => state.loggedUser.loginUser);
    let [friends, setFriends] = useState([]);

    useEffect(() => {
        onValue(ref(db, "friends/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (
                    item.val().receiverid == userData.uid ||
                    item.val().senderid == userData.uid
                ) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriends(arr);
            if(userData.uid == arr[0].receiverid){
                dispatch(activeChat({
                    type: "singlemsg",
                    name: arr[0].sendername,
                    id:arr[0].senderid
                }))
                localStorage.setItem("activeChat" ,JSON.stringify({
                    type: "singlemsg",
                    name: arr[0].sendername,
                    id:arr[0].senderid
                }))
            }else{
                dispatch(activeChat({
                    type: "singlemsg",
                    name: arr[0].receivername,
                    id:arr[0].receiverid
                }))
                localStorage.setItem("activeChat" ,JSON.stringify({
                    type: "singlemsg",
                    name: arr[0].receivername,
                    id:arr[0].receiverid
                }))
            }
        });
    }, []);

    let handelBlcok = (item) => {
        if (userData.uid == item.senderid) {
            set(push(ref(db, "block")), {
                blockId: item.receiverid,
                blockName: item.receivername,
                blockById: item.senderid,
                blockByName: item.sendername,
            }).then(() => {
                remove(ref(db, "friends/" + item.id));
            });
        } else {
            set(push(ref(db, "block")), {
                blockId: item.senderid,
                blockName: item.sendername,
                blockById: item.receiverid,
                blockByName: item.receivername,
            }).then(() => {
                remove(ref(db, "friends/" + item.id));
            });
        }
    };

    let handelUnfriend = (item) => {
        remove(ref(db, "friends/" + item.id));
    };

    let handelMagBtn=(item)=>{
        if(userData.uid == item.receiverid){
            dispatch(activeChat({
                type: "singlemsg",
                name: item.sendername,
                id:item.senderid
            }))
            localStorage.setItem("activeChat" ,JSON.stringify({
                type: "singlemsg",
                name: item.sendername,
                id:item.senderid
            }))
        }else{
            dispatch(activeChat({
                type: "singlemsg",
                name: item.receivername,
                id:item.receiverid
            }))
            localStorage.setItem("activeChat" ,JSON.stringify({
                type: "singlemsg",
                name: item.receivername,
                id:item.receiverid
            }))
        }
    }

    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">Friends</h3>
            </div>
            {friends.map((item, index) => (
                <div key={index} className="list">
                    <div className="profileImg">
                        <Image className="imgprofile" imgsrc={profile} />
                    </div>
                    <div className="profileName">
                        {item.receiverid == userData.uid ? (
                            <h3>{item.sendername}</h3>
                        ) : (
                            <h3>{item.receivername}</h3>
                        )}
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    <div className="friendsBtn">
                        {button == "mag" ? (
                            <Button
                                onClick={()=>handelMagBtn(item)}
                                className="btncolor"
                                size="small"
                                variant="contained"
                            >
                            <LuMessagesSquare/>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={() => handelUnfriend(item)}
                                    className="btncolorunfriend"
                                    size="small"
                                    variant="contained"
                                >
                                    <AiOutlineUserDelete/>
                                </Button>
                                <Button
                                    onClick={() => handelBlcok(item)}
                                    className="btncolorerror"
                                    size="small"
                                    variant="contained"
                                >
                                    <ImBlocked/>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friends;
