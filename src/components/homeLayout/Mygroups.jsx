import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Image from "../layout/Image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import profile from "../../assets/profile.png";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { getDatabase, ref, onValue,remove } from "firebase/database";

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
const Mygroups = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loggedUser.loginUser);

    let [groups, setGroups] = useState([]);
    let [groupRequest, setGroupRequest] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        onValue(ref(db, "groups/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().adminId) {
                    arr.push({ ...item.val(), groupId: item.key });
                }
            });
            setGroups(arr);
        });
    }, []);

    const handleOpen = (item) => {
        // ===== groupjoinrequest data ==== //

        onValue(ref(db, "groupjoinrequest"), (snapshot) => {
            let arr = [];
            snapshot.forEach((items) => {
                if (
                    userData.uid == items.val().adminId &&
                    items.val().groupId == item.groupId
                ) {
                    arr.push({...items.val(), id:items.key});
                }
            });
            setGroupRequest(arr);
        });

        setOpen(true);
    };

    let handelReject =(item)=>{
        remove(ref(db, "groupjoinrequest/" + item.id))
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="box">
            <div className="heading">
                <h3 className="groupheading">My Groups</h3>
                <Button className="btncolor" size="small" variant="contained">
                    Create Group
                </Button>
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
                    <div className="friendsBtn">
                        <Button
                            className="btncolor"
                            size="small"
                            variant="contained"
                            onClick={() => handleOpen(item)}
                        >
                            request
                        </Button>
                        <Button
                            className="btncolorsuccess"
                            size="small"
                            variant="contained"
                        >
                            memder
                        </Button>
                    </div>
                </div>
            ))}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Group Request List
                    </Typography>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                        }}
                    >
                        {groupRequest.map((item,index) => (
                            <>
                                <ListItem key={index} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="/static/images/avatar/1.jpg"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.userName}
                                        secondary={
                                            <React.Fragment>
                                                {"wants to join your group"}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <div className="reqbtn">
                                <Button
                                    className="btncolorsuccess"
                                    size="small"
                                    variant="contained"
                                >
                                    Accept
                                </Button>
                                <Button
                                    className="btncolorerror"
                                    size="small"
                                    variant="contained"
                                    onClick={()=>handelReject(item)}
                                >
                                    reject
                                </Button>
                                </div>
                                <Divider variant="inset" component="li" />
                            </>
                        ))}
                    </List>
                </Box>
            </Modal>
        </div>
    );
};

export default Mygroups;
