import React from "react";
import { Grid, TextField } from "@mui/material";
import Image from "../components/layout/Image";
import loginimg from "../assets/loginimg.jpg";
import googleimg from "../assets/Google.png";
import HadingText from "../components/layout/HadingText";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className="regisContainer">
                    <div>
                        <HadingText title="Login to your account!" />
                    </div>
                    <Image className="googleimg" imgsrc={googleimg} />
                    <div className="textfield">
                        <TextField
                            id="standard-basic"
                            label="Email Addres"
                            variant="standard"
                        />
                    </div>
                    <div className="textfield">
                        <TextField
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                        />
                    </div>
                    <button className="singupbtn">Login to Continue</button>
                    <h4 className="alreadyAccount">
                        Don't have an account ?{" "}
                        <Link to={"/"} className="alreadyAccountA">
                            Sign up
                        </Link>
                    </h4>
                </div>
            </Grid>
            <Grid item xs={6}>
                <Image className="registrationImg" imgsrc={loginimg} />
            </Grid>
        </Grid>
    );
};

export default Login;
