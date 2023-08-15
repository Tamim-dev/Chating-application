import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Image from "../layout/Image";
import profile from "../../assets/profile.png";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 240,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 3,
    px: 4,
    pb: 3,
};

let initialValue = {
    groupName: "",
    groupTagline: "",
    error: "",
    loading: false,
};

const Group = () => {
    const db = getDatabase();
    const [open, setOpen] = useState(false);
    const [groupInfo, setGroupInfo] = useState(initialValue);
    let [groups, setGroups] = useState([]);
    let [groupRequest, setGroupRequest] = useState([]);
    let [groupMembers, setGroupMembers] = useState([]);

    let userData = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        // ==== groups data ==== //
        onValue(ref(db, "groups/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid != item.val().adminId) {
                    arr.push({ ...item.val(), groupId: item.key });
                }
            });
            setGroups(arr);
        });

        // ==== groupjoinrequest data ==== //

        onValue(ref(db, "groupjoinrequest/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().userId == userData.uid) {
                    arr.push(item.val().groupId);
                }
            });
            setGroupRequest(arr);
        });

        // ==== members data ==== //

        onValue(ref(db, "members/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().userId == userData.uid) {
                    arr.push(item.val().groupId);
                }
            });
            setGroupMembers(arr);
        });
    }, []);

    // ==== input value ==== //

    let handlechange = (e) => {
        setGroupInfo({
            ...groupInfo,
            [e.target.name]: e.target.value,
            error: "",
        });
    };

    let handelClick = () => {
        let { groupName, groupTagline } = groupInfo;
        if (!groupName) {
            setGroupInfo({
                ...groupInfo,
                error: "GroupName",
            });
            return;
        }
        if (!groupTagline) {
            setGroupInfo({
                ...groupInfo,
                error: "GroupTagline",
            });
            return;
        }
        setGroupInfo({
            ...groupInfo,
            loading: true,
        });

        set(push(ref(db, "groups")), {
            groupName: groupInfo.groupName,
            groupTagline: groupInfo.groupTagline,
            adminId: userData.uid,
            adminName: userData.displayName,
        }).then(() => {
            setGroupInfo({
                ...groupInfo,
                groupName: "",
                groupTagline: "",
                loading: false,
            });
            setOpen(false);
        });
    };

    let handelGroupJoin = (item) => {
        set(push(ref(db, "groupjoinrequest/")), {
            adminId: item.adminId,
            adminName: item.adminName,
            groupId: item.groupId,
            groupName: item.groupName,
            userId: userData.uid,
            userName: userData.displayName,
        });
    };

    let handelGroupJoinRemove = (mes) => {
        let cencel = "";
        onValue(ref(db, "groupjoinrequest/"), (snapshot) => {
            snapshot.forEach((item) => {
                if (
                    item.val().userId == userData.uid &&
                    mes.groupId == item.val().groupId
                ) {
                    cencel = item.key;
                }
            });
        });
        remove(ref(db, "groupjoinrequest/" + cencel));
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">Groups List</h3>
                <Button
                    onClick={handleOpen}
                    className="btncolor"
                    size="small"
                    variant="contained"
                >
                    Create Group
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 200 }}>
                        <h2 className="grouppopupname">Create Your Group</h2>
                        <TextField
                            value={groupInfo.groupName}
                            name="groupName"
                            onChange={handlechange}
                            margin="dense"
                            id="outlined-basic"
                            label="Group Name"
                            variant="outlined"
                        />
                        {groupInfo.error?.includes("GroupName") && (
                            <Alert className="alerterror" severity="error">
                                Enter your Group Name
                            </Alert>
                        )}
                        <TextField
                            value={groupInfo.groupTagline}
                            name="groupTagline"
                            onChange={handlechange}
                            margin="dense"
                            id="outlined-basic"
                            label="Group Tagline"
                            variant="outlined"
                        />
                        {groupInfo.error?.includes("GroupTagline") && (
                            <Alert className="alerterror" severity="error">
                                Enter your Group Tagline
                            </Alert>
                        )}
                        {groupInfo.loading ? (
                            <LoadingButton
                                className="groupbtn"
                                loading
                                variant="outlined"
                            >
                                Create
                            </LoadingButton>
                        ) : (
                            <Button
                                className="groupbtn btncolor"
                                onClick={handelClick}
                                variant="contained"
                            >
                                Create
                            </Button>
                        )}
                    </Box>
                </Modal>
            </div>
            {groups.map((item, index) => (
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
                    <div className="profileBtn">
                        {groupRequest.indexOf(item.groupId) != -1 ? (
                            <Button
                                onClick={() => handelGroupJoinRemove(item)}
                                className="btncolor"
                                size="small"
                                variant="contained"
                            >
                                Request
                            </Button>
                        ) : groupMembers.indexOf(item.groupId) != -1 ? (
                            <Button
                                className="btncolorsuccess"
                                size="small"
                                variant="contained"
                            >
                                Joined
                            </Button>
                        ) : (
                            <Button
                                className="btncolor"
                                size="small"
                                variant="contained"
                                onClick={() => handelGroupJoin(item)}
                            >
                                Join
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Group;
