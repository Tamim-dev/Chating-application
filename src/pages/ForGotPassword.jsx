import React, { useState } from "react";
import resgistrationLogin from "../design/resgistrationLogin.css";
import { TextField, Button, Alert } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForGotPassword = () => {
    const auth = getAuth();

    let [text, setText] = useState();
    let [error, setError] = useState(false);
    let navigate = useNavigate()

    let handelForgotPassword = () => {
        sendPasswordResetEmail(auth, text)
            .then(() => {
                navigate("/login")
            })
            .catch((error) => {
                setError(true);
            });
    };

    return (
        <div className="forgotpassword">
            <div className="box">
                <h2 className="forgottitle">Forgot Password</h2>

                <div>
                    <TextField
                        onChange={(e) => setText(e.target.value)}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                    />
                    {error && (
                        <Alert className="alertforgotpassword" severity="error">
                           Enter your email
                        </Alert>
                    )}
                </div>

                <Button onClick={handelForgotPassword} variant="contained">
                    Confirm
                </Button>
            </div>
        </div>
    );
};

export default ForGotPassword;
