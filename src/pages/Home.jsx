import React from "react";
import Grid from "@mui/material/Grid";
import Group from "../components/layout/Group";
import home from "../design/home.css"

const Home = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Group/>
            </Grid>
            <Grid item xs={4}>
                xs=4
            </Grid>
            <Grid item xs={4}>
                xs=4
            </Grid>
        </Grid>
    );
};

export default Home;
