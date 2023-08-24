import React from "react";
import Grid from "@mui/material/Grid";
import Friends from "../components/homeLayout/Friends";
import Mesgroups from "../components/Mesgroups";
import Chatbox from "../components/Chatbox";

const Messages = () => {
  return (
    <Grid container spacing={2}>
            <Grid item xs={4}>
            <Friends button="mag"/>
            <Mesgroups/>
            </Grid>
            <Grid item xs={8}>
            <Chatbox/>
            </Grid>
        </Grid>
  );
};

export default Messages;
