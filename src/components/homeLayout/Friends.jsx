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

const Friends = () => {
    const db = getDatabase();

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
        });
    }, []);

    let handelBlcok = (item)=>{
        if(userData.uid == item.senderid){
            set(push(ref(db, "block")),{
                blockId : item.receiverid,
                blockName: item.receivername,
                blockById : item.senderid,
                blockByName : item.sendername,
            }).then(()=>{
                remove(ref(db, "friends/" + item.id));
            })
            
        }else{
            set(push(ref(db, "block")),{
                blockId : item.senderid,
                blockName: item.sendername,
                blockById : item.receiverid,
                blockByName : item.receivername,
        }).then(()=>{
            remove(ref(db, "friends/" + item.id));
        })
        
        }
        
    }

    let handelUnfriend= (item)=>{
        remove(ref(db, "friends/" + item.id));
    }

    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">Friends</h3>
            </div>
            {friends.map((item) => (
                <div className="list">
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
                        <Button
                            onClick={()=>handelUnfriend(item)}
                            className="btncolor"
                            size="small"
                            variant="contained"
                        >
                            Unfriend
                        </Button>
                        <Button
                            onClick={()=>handelBlcok(item)}
                            className="btncolorerror"
                            size="small"
                            variant="contained"
                        >
                            Block
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friends;
