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

const Blockedusers = () => {
    const db = getDatabase();

    let userData = useSelector((state) => state.loggedUser.loginUser);

    let [blockList, setBlockList] = useState([]);

    useEffect(() => {
        onValue(ref(db, "block"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if(item.val().blockById == userData.uid){
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setBlockList(arr);
        });
    }, []);

    let hadelUnBlock =(item)=>{
        remove(ref(db, "block/" + item.id))
    }

    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">Blocked Users</h3>
            </div>
            {blockList.map((item,index) => (
                <div key={index} className="list">
                    <div className="profileImg">
                        <Image className="imgprofile" imgsrc={profile} />
                    </div>
                    <div className="profileName">
                        {userData.uid == item.blockById ? (
                            <h3>{item.blockName}</h3>
                        ) : (
                            <h3>{item.blockByName}</h3>
                        )}
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    <div className="profileBtn">
                        <Button
                        onClick={()=>hadelUnBlock(item)}
                            className="btncolor"
                            size="small"
                            variant="contained"
                        >
                            unblock
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blockedusers;
