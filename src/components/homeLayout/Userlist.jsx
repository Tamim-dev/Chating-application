import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Image from "../layout/Image";
import profile from "../../assets/profile.png";
import { getDatabase, ref, onValue } from "firebase/database";

const Userlist = () => {
    let [userList, setUserList] = useState([]);
    const db = getDatabase();
    useEffect(() => {
        const usersRef = ref(db, "users/");
        onValue(usersRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val());
            });
            setUserList(arr);
        });
    }, []);

    let handelFriendrequest = (item)=>{
        console.log(item);
    }
    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">User List</h3>
            </div>
            {userList.map((item,index) => (
                <div key={index} className="list">
                    <div>
                        <Image
                            className="imgprofile"
                            imgsrc ={item.profile_picture}
                        />
                    </div>
                    <div>
                        <h3>{item.username}</h3>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    <div>
                        <Button
                        onClick={()=>handelFriendrequest(item)}
                            className="btncolor"
                            size="small"
                            variant="contained"
                        >
                            +
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Userlist;
