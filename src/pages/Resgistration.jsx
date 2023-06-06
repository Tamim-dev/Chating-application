import React, { useState } from "react";
import resgistrationLogin from "../design/resgistrationLogin.css";
import { Grid, TextField, Alert } from "@mui/material";
import Image from "../components/layout/Image";
import registrationimg from "../assets/registrationimg.png";
import HadingText from "../components/layout/HadingText";
import { useNavigate, Link } from "react-router-dom";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

let initialValue = {
    email: "",
    fullname: "",
    password: "",
    error: "",
    Loading: false,
    eye: false,
};

const Resgistration = () => {
    let [values, setValues] = useState(initialValue);
    const auth = getAuth();
    let navigate = useNavigate();

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    let handleClick = () => {
        let { email, fullname, password } = values;

        if (!email) {
            setValues({
                ...values,
                error: "Enter your Email",
            });
            return;
        }

        if (!fullname) {
            setValues({
                ...values,
                error: "Enter your Fullname",
            });
            return;
        }

        if (!password) {
            setValues({
                ...values,
                error: "Enter your Password",
            });
            return;
        }

        setValues({
            ...values,
            Loading: true,
        });

        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            sendEmailVerification(auth.currentUser).then(() => {
                console.log("email gece");
            });
            setValues({
                email: "",
                fullname: "",
                password: "",
                Loading: false,
            });
            navigate("/Login");
        });
    };

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
                        {values.error.includes("Email") ? (
                            <TextField
                                onChange={handleValues}
                                name="email"
                                error
                                id="outlined-error"
                                label="Email Address"
                                helperText="Enter your email"
                            />
                        ) : (
                            <TextField
                                onChange={handleValues}
                                name="email"
                                value={values.email}
                                id="outlined-basic"
                                label="Email Address"
                                variant="outlined"
                            />
                        )}
                    </div>
                    <div className="textfield">
                        {values.error.includes("Fullname") ? (
                            <TextField
                                onChange={handleValues}
                                name="fullname"
                                error
                                id="outlined-error"
                                label="Full name"
                                helperText="Enter your Fullname"
                            />
                        ) : (
                            <TextField
                                onChange={handleValues}
                                name="fullname"
                                value={values.fullname}
                                id="outlined-basic"
                                label="Full name"
                                variant="outlined"
                            />
                        )}
                    </div>
                    <div className="textfield passtextfield">
                       
                        {values.error.includes("Fullname") ? (
                            <TextField
                                onChange={handleValues}
                                name="password"
                                error
                                id="outlined-error"
                                label="Password"
                                helperText="Enter your Fullname"
                            />
                        ) : (
                            <TextField
                                onChange={handleValues}
                                name="password"
                                value={values.password}
                                type={values.eye ? "text" : "password"}
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                            />
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
                            Sign up
                        </LoadingButton>
                    ) : (
                        <button onClick={handleClick} className="singupbtn">
                            Sign up
                        </button>
                    )}

                    <h4 className="alreadyAccount">
                        Already have an account ?{" "}
                        <Link to={"/Login"} className="alreadyAccountA">
                            Sign In
                        </Link>
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
