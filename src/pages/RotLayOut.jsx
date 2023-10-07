import React, { useEffect, createRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import rotlayout from "../design/rotlayout.css";
import profile from "../assets/profile.jpg";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FiLogOut, FiSettings,FiEdit } from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../components/slices/users/userSlice";
import { activeChat } from "../components/slices/activeChat/activeChatSlice";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import { getDatabase, ref as imgref, set } from "firebase/database";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const RotLayOut = () => {
    const auth = getAuth();
    const db = getDatabase();
    let navigate = useNavigate();
    let location = useLocation();
    const dispatch = useDispatch();
    let loginUser = useSelector((state) => state.loggedUser.loginUser);
    const storage = getStorage();
    const storageRef = ref(storage, loginUser.uid);
    const [image, setImage] = useState(loginUser.photoURL);
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const handleCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(
                cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
            );
            const message4 = cropperRef.current?.cropper
                .getCroppedCanvas()
                .toDataURL();
            uploadString(storageRef, message4, "data_url").then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    set(imgref(db, "users/" + loginUser.uid), {
                        username: loginUser.displayName,
                        email: loginUser.email,
                        profile_picture: downloadURL,
                    })
                        .then(() => {
                            localStorage.setItem(
                                "user",
                                JSON.stringify({ ...loginUser, photoURL: downloadURL })
                            );
                            dispatch(userData({ ...loginUser, photoURL: downloadURL }));
                        })
                        .then(() => {
                            setOpen(false);
                            setImage("");
                        });
                });
            });
        }
    };

    useEffect(() => {
        if (loginUser == null) {
            navigate("/login");
        }
    }, []);

    if (loginUser == null) {
        navigate("/login");
        return;
    }

    let handelClick = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("activeChat");
            dispatch(userData(null));
            dispatch(activeChat(null));
            navigate("/login");
        });
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <div className="navber">
                        <div className="navcontainer">
                            <div className="routimg">
                                <img
                                    onClick={handleOpen}
                                    src={loginUser.photoURL}
                                    style={{width:"70px",height:"70px",objectFit:"cover"}}
                                />
                                <FiEdit className="routediticon"/>
                            </div>
                            <div className="displayname">
                                {loginUser.displayName}
                            </div>
                            <div className="routul">
                                <ul>
                                    <ol>
                                        <Link
                                            to={"/chatting/home"}
                                            className={
                                                location.pathname ==
                                                "/chatting/home"
                                                    ? "active"
                                                    : "icon"
                                            }
                                        >
                                            <AiOutlineHome />
                                        </Link>
                                    </ol>
                                    <ol>
                                        <Link
                                            to={"/chatting/messages"}
                                            className={
                                                location.pathname ==
                                                "/chatting/messages"
                                                    ? "active"
                                                    : "icon"
                                            }
                                        >
                                            <BsFillChatDotsFill />
                                        </Link>
                                    </ol>
                                    <ol>
                                        <Link
                                            to={"/chatting/notification"}
                                            className={
                                                location.pathname ==
                                                "/chatting/notification"
                                                    ? "active"
                                                    : "icon"
                                            }
                                        >
                                            <MdOutlineNotificationsActive />
                                        </Link>
                                    </ol>
                                    <ol>
                                        <Link
                                            to={"/chatting/settings"}
                                            className={
                                                location.pathname ==
                                                "/chatting/settings"
                                                    ? "active"
                                                    : "icon"
                                            }
                                        >
                                            <FiSettings />
                                        </Link>
                                    </ol>
                                    <ol>
                                        <FiLogOut
                                            onClick={handelClick}
                                            className="icon"
                                        />
                                    </ol>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={11}>
                    <Outlet />
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Change your profile
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="imgbox">
                            <div className="img-preview"></div>
                        </div>
                        <input type="file" onChange={onChange} />
                        <Cropper
                            ref={cropperRef}
                            style={{ height: 400, width: "100%" }}
                            zoomTo={0}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={100}
                            minCropBoxWidth={100}
                            background={true}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={true}
                            guides={true}
                        />
                        <Button onClick={handleCropData}>Upload</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default RotLayOut;
