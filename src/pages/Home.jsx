import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


const Home = () => {
  const auth = getAuth();
  let navigate =useNavigate()

  let handelClick =()=>{
    signOut(auth).then(() => {
      navigate("/login")
    })
  }
    return (
        <div>
            <Button onClick={handelClick}  variant="contained">Log out</Button>
        </div>
    );
};

export default Home;
