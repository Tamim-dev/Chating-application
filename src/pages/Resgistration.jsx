import React from "react";
import { Grid, TextField } from "@mui/material";
import Image from "../components/layout/Image";
import registrationimg from "../assets/registrationimg.png";
import HadingText from "../components/layout/HadingText";

const Resgistration = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className="regisContainer">
                    <div>
                        <HadingText title="Get started with easily register" />
                        <p className="hadingtitle">
                            Free register and you can enjoy it
                        </p>
                    </div>
                    <div className="textfield">
                        <TextField
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                        />
                    </div>
                    <div className="textfield">
                        <TextField
                            id="outlined-basic"
                            label="Ful name"
                            variant="outlined"
                        />
                    </div>
                    <div className="textfield">
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                        />
                    </div>
                    <button className="singupbtn">Sign up</button>
                    <h4 className="alreadyAccount">
                        Already have an account ? <a className="alreadyAccountA" href="#">Sign In</a>
                    </h4>
                </div>
            </Grid>
            <Grid item xs={6}>
                <Image className="registrationImg" imgsrc={registrationimg} />
            </Grid>
        </Grid>
    );
};

export default Resgistration;
