import React from "react";
import Grid from "@mui/material/Grid";
import Friends from "../components/homeLayout/Friends";
import Group from "../components/homeLayout/Group";

const Messages = () => {
  return (
    <Grid container spacing={2}>
            <Grid item xs={4}>
            <Friends/>
            <Group/>
            </Grid>
            <Grid item xs={8}>
            dffd
            </Grid>
        </Grid>
  );
};

export default Messages;
