import React, { useState } from "react";
import { Alert, Grid, TextField } from "@mui/material";
import Image from "../components/layout/Image";
import loginimg from "../assets/loginimg.jpg";
import googleimg from "../assets/Google.png";
import HadingText from "../components/layout/HadingText";
import { Link, useNavigate } from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { toast } from "react-toastify";

let initialValue = {
    email: "",
    password: "",
    error: "",
    Loading: false,
};

const Login = () => {
    const auth = getAuth();
    const notify = (mas) => toast(mas);
    const provider = new GoogleAuthProvider();
    let [values, setValues] = useState(initialValue);
    let [errorCheck, setErrorCheck] = useState(false);
    let navigate = useNavigate();

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
        });
        setErrorCheck(false);
    };

    let handleClick = () => {
        let { email, password } = values;

        if (!email) {
            setValues({
                ...values,
                error: "Enter your email",
            });
            return;
        }
        if (!password) {
            setValues({
                ...values,
                error: "Enter your password",
            });
            return;
        }

        setValues({
            ...values,
            Loading: true,
        });

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                if (user.user.emailVerified) {
                    notify("Login successfull");
                    navigate("/chating/home");
                } else {
                    notify("Please verify for email");
                    setValues({
                        email: "",
                        password: "",
                        Loading: false,
                    });
                }
            })
            .catch((error) => {
                setValues({
                    ...values,
                    password: "",
                    Loading: false,
                });
                setErrorCheck(error.code);
            });
    };

    let handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log(result);
        });
    };

    return (
        <Grid container spacing={0}>
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
                        {values.error?.includes("email") && (
                            <Alert className="alerterror" severity="error">
                                Enter your email
                            </Alert>
                        )}
                    </div>
                    {errorCheck &&
                    errorCheck?.includes("auth/user-not-found") && (
                        <Alert className="alerterror" severity="error">
                            user-not-found
                        </Alert>
                    )}

                    <div className="textfield passtextfield">
                        <TextField
                            onChange={handleValues}
                            name="password"
                            type={values.eye ? "text" : "password"}
                            value={values.password}
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                        />
                        {values.error?.includes("password") && (
                            <Alert className="alerterror" severity="error">
                                Enter your password
                            </Alert>
                        )}
                        {errorCheck &&
                        errorCheck?.includes("auth/wrong-password") && (
                            <Alert className="alerterror" severity="error">
                                wrong password
                            </Alert>
                        )}
                        <div
                            onClick={() =>
                                setValues({ ...values, eye: !values.eye })
                            }
                            className="eye"
                        >
                            {values.eye ? <VscEye /> : <VscEyeClosed />}
                        </div>
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
                    <Alert
                        style={{ marginTop: "20px", width: "60%" }}
                        severity="warning"
                    >
                        Forgot password{" "}
                        <strong>
                            <Link
                                to={"/forgotpassword"}
                                style={{ textDecoration: "none" }}
                            >
                                Click here
                            </Link>
                        </strong>
                    </Alert>
                </div>
            </Grid>
            <Grid item xs={6}>
                <Image className="registrationImg" imgsrc={loginimg} />
            </Grid>
        </Grid>
    );
};

export default Login;
