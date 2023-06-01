import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import Image from "../components/layout/Image";
import loginimg from "../assets/loginimg.jpg";
import googleimg from "../assets/Google.png";
import HadingText from "../components/layout/HadingText";
import { Link } from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";

let initialValue = {
    email: "",
    password: "",
    error: "",
    Loading: false,
};

const Login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    let [values, setValues] = useState(initialValue);

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    let handleClick = () => {
        let { email, password } = values;

        setValues({
            ...values,
            Loading: true,
        });

        signInWithEmailAndPassword(auth, email, password).then((user) => {
            setValues({
                email: "",
                password: "",
                Loading: false,
            });
            console.log(user);
        });
    };

    let handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log(result);
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div className="regisContainer">
                    <div>
                        <HadingText title="Login to your account!" />
                    </div>
                    <Image
                        onClick={handleGoogleLogin}
                        className="googleimg"
                        imgsrc={googleimg}
                    />
                    <div className="textfield">
                        <TextField
                            onChange={handleValues}
                            name="email"
                            value={values.email}
                            id="standard-basic"
                            label="Email Addres"
                            variant="standard"
                        />
                    </div>
                    <div className="textfield">
                        <TextField
                            onChange={handleValues}
                            name="password"
                            value={values.password}
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                        />
                    </div>
                    {values.Loading ? (
                        <LoadingButton
                            className="loadingbtn"
                            loading
                            variant="outlined"
                        >
                            Login to Continue
                        </LoadingButton>
                    ) : (
                        <button onClick={handleClick} className="singupbtn">
                            Login to Continue
                        </button>
                    )}
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
