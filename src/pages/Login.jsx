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
    let navigate = useNavigate();

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
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
                setValues({
                    email: "",
                    password: "",
                    Loading: false,
                });
                navigate("/Home");
            })
            .catch((error) => {
                if (error.code) {
                    setValues({
                        ...values,
                        password: "",
                        Loading: false,
                    });
                    console.log("one");
                }
                if (error) {
                    setValues({
                        ...values,
                        email:"",
                        password: "",
                        Loading: false,
                    });
                    console.log("two");
                }
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
                        {values.error.includes("email") && (
                            <Alert severity="error">Enter your email</Alert>
                        )}
                    </div>
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
                        {values.error.includes("password") && (
                            <Alert severity="error">Enter your password</Alert>
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
