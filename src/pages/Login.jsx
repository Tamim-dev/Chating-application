import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../components/slices/users/userSlice";

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
    const dispatch = useDispatch();
    let loginUser = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        if (loginUser != null) {
            navigate("/chating/home");
        }
    }, []);

    const notify = (mas) =>
        toast.success(mas, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    const notifytoo = (mas) =>
        toast.warn(mas, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
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
                // if (user.user.emailVerified) {
                //     dispatch(userData(user.user));
                //     localStorage.setItem("user", JSON.stringify(user.user));
                //     notify("Login successfull");
                //     navigate("/chating/home");
                // } else {
                //     notifytoo("Please verify for email");
                //     setValues({
                //         email: "",
                //         password: "",
                //         Loading: false,
                //     });
                // }
                dispatch(userData(user.user));
                localStorage.setItem("user", JSON.stringify(user.user));
                notify("Login successfull");
                navigate("/chating/home");
            })
            .catch((error) => {
                if (error.code.includes("auth/invalid-email")) {
                    setValues({
                        ...values,
                        email: "",
                        password: "",
                        Loading: false,
                    });
                    notifytoo("Invalid email");
                }
                if (error.code.includes("too-many-requests")) {
                    notifytoo("too many requests,please try again later");
                }
                setValues({
                    ...values,
                    password: "",
                    Loading: false,
                });
                if (error.code.includes("auth/user-not-found")) {
                    setValues({
                        ...values,
                        email: "",
                        password: "",
                        error: "user not found",
                    });
                }
                if (error.code.includes("auth/wrong-password")) {
                    setValues({
                        ...values,
                        error: "wrong",
                    });
                }
            });
    };

    let handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then((user) => {
            dispatch(userData(user.user));
            localStorage.setItem("user", JSON.stringify(user.user));
            notify("Login successfull");
            navigate("/chating/home");
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
                    {values.error && values.error?.includes("user") && (
                        <Alert className="alerterror" severity="error">
                            user not found
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
                        {values.error && values.error?.includes("wrong") && (
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
