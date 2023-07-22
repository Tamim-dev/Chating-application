import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Group from "../components/homeLayout/Group";
import home from "../design/home.css";
import Friendrequest from "../components/homeLayout/Friendrequest";
import Friends from "../components/homeLayout/Friends";
import Mygroups from "../components/homeLayout/Mygroups";
import Userlist from "../components/homeLayout/Userlist";
import Blockedusers from "../components/homeLayout/Blockedusers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();
    let loginUser = useSelector((state) => state.loggedUser.loginUser);


    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Group />
                <Friendrequest />
            </Grid>
            <Grid item xs={4}>
                <Friends />
                <Mygroups />
            </Grid>
            <Grid item xs={4}>
                <Userlist />
                <Blockedusers />
            </Grid>
        </Grid>
    );
};

export default Home;
