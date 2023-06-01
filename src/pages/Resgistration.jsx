import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import Image from "../components/layout/Image";
import registrationimg from "../assets/registrationimg.png";
import HadingText from "../components/layout/HadingText";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import LoadingButton from "@mui/lab/LoadingButton";

let initialValue = {
    email: "",
    fullname: "",
    password: "",
    error: "",
    Loading: false,
};

const Resgistration = () => {
    const auth = getAuth();
    let [values, setValues] = useState(initialValue);
    let navigate = useNavigate();

    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    let handleClcik = () => {
        let { email, fullname, password } = values;

        setValues({
            ...values,
            Loading: true,
        });

        createUserWithEmailAndPassword(auth, email, password).then((user) => {
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
                        <TextField
                            onChange={handleValues}
                            name="email"
                            value={values.email}
                            id="outlined-basic"
                            label="Email Address"
                            variant="outlined"
                        />
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
                    </div>
                    <div className="textfield">
                        <TextField
                            onChange={handleValues}
                            name="password"
                            type="password"
                            value={values.password}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                        />
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
                        <button onClick={handleClcik} className="singupbtn">
                            Sign up
                        </button>
                    )}

                    <h4 className="alreadyAccount">
                        Already have an account ?{" "}
                        <Link to={"/Login"} className="alreadyAccountA">Sign In</Link>
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
