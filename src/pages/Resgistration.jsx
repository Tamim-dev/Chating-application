import React, { useState, useEffect } from "react";
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
    updateProfile,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import LoadingButton from "@mui/lab/LoadingButton";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userData } from "../components/slices/users/userSlice";

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
    const db = getDatabase();
    let navigate = useNavigate();

    let loginUser = useSelector((state) => state.loggedUser.loginUser);

    
    useEffect(() => {
        if (loginUser != null) {
            navigate("/chatting/home");
        }
    }, []);
    

    const notify = (mas) =>
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
    const notifytoo = (mas) =>
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

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
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

        // let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        // if (!password || !pattern.test(password)) {
        //     setValues({
        //         ...values,
        //         error: "Enter an password includes capital lower symbol number",
        //     });
        //     return;
        // }
        if (!password) {
            setValues({
                ...values,
                error: "Enter an password",
            });
            return;
        }

        setValues({
            ...values,
            Loading: true,
        });

        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                updateProfile(auth.currentUser, {
                    displayName: values.fullname,
                    photoURL: "https://i.ibb.co/QkwmM1v/Png-Item-1468479.png",
                }).then(() => {
                    // sendEmailVerification(auth.currentUser).then(() => {
                    //     set(ref(db, "users/" + user.user.uid), {
                    //         username: values.fullname,
                    //         email: values.email,
                    //         profile_picture: user.user.photoURL,
                    //     });
                    // });
                    set(ref(db, "users/" + user.user.uid), {
                        username: values.fullname,
                        email: values.email,
                        profile_picture: user.user.photoURL,
                    });
                });
                notifytoo("Resgistration successfull");
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode.includes("auth/invalid-email")) {
                    notify("Invalid email");
                    setValues({
                        ...values,
                        loading: false,
                        email: "",
                        fullname: "",
                        password: "",
                    });
                }
                if (errorCode.includes("auth/email-already-in-use")) {
                    notify("email already in use");
                    setValues({
                        ...values,
                        loading: false,
                        email: "",
                        fullname: "",
                        password: "",
                    });
                }
            });
    };

    return (
        <Grid container spacing={0}>
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
                            onChange={handleValues}
                            name="email"
                            value={values.email}
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                        />
                        {values.error.includes("Email") && (
                            <Alert className="alerterror" severity="error">
                                {values.error}
                            </Alert>
                        )}
                    </div>
                    <div className="textfield">
                        <TextField
                            onChange={handleValues}
                            name="fullname"
                            value={values.fullname}
                            id="outlined-basic"
                            label="Full name"
                            variant="outlined"
                        />
                        {values.error.includes("Fullname") && (
                            <Alert className="alerterror" severity="error">
                                {values.error}
                            </Alert>
                        )}
                    </div>
                    <div className="textfield passtextfield">
                        <TextField
                            onChange={handleValues}
                            name="password"
                            type={values.eye ? "text" : "password"}
                            value={values.password}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                        />
                        <div
                            onClick={() =>
                                setValues({ ...values, eye: !values.eye })
                            }
                            className="eye"
                        >
                            {values.eye ? <VscEye /> : <VscEyeClosed />}
                        </div>
                        {values.error.includes("password") && (
                            <Alert className="alerterror" severity="error">
                                {values.error}
                            </Alert>
                        )}
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
