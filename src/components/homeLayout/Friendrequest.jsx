import Button from "@mui/material/Button";
import Image from "../layout/Image";
import profile from "../../assets/profile.png";
import React, { useEffect, useState } from "react";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const Friendrequest = () => {
    const db = getDatabase();

    let [reqList, setReqList] = useState([]);
    let [empty, setEmpty] = useState();
    let userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        const usersRef = ref(db, "friendrequest/");
        onValue(usersRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().receiverid == userData.uid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setReqList(arr);
        });
    }, []);

    let handelReject = (item) => {
        remove(ref(db, "friendrequest/" + item.id));
    };

    let handelAccept = (item) => {
        set(push(ref(db, "friends")), {
            ...item,
        }).then(()=>{
            remove(ref(db, "friendrequest/" + item.id));
        })
    };

    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">Friend Request</h3>
            </div>
            {reqList.map((item) => (
                <div className="list">
                    <div className="profileImg">
                        <Image className="imgprofile" imgsrc={profile} />
                    </div>
                    <div className="profileName">
                        <h3>{item.sendername}</h3>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    <div className="btnflex">
                        <Button
                            onClick={() => handelAccept(item)}
                            className="btncolor"
                            size="small"
                            variant="contained"
                        >
                            Accept
                        </Button>
                        <Button
                            onClick={() => handelReject(item)}
                            className="btncolorerror"
                            size="small"
                            variant="contained"
                        >
                            reject
                        </Button>
                    </div>
                </div>
            ))}

            {reqList.length == 0 ? (
                <p className="nofrientmassage">No friend requests available</p>
            ) : (
                ""
            )}
        </div>
    );
};

export default Friendrequest;
