import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import rotlayout from "../design/rotlayout.css";
import profile from "../assets/profile.jpg";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../components/slices/users/userSlice";
import { activeChat } from "../components/slices/activeChat/activeChatSlice";

const RotLayOut = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let location = useLocation();
    const dispatch = useDispatch();
    let loginUser = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        if (loginUser == null) {
            navigate("/login");
        }
    }, []);

    if (loginUser == null) {
        navigate("/login");
        return
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
                                <img src={loginUser.photoURL} />
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
        </>
    );
};

export default RotLayOut;
