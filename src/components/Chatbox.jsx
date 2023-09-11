import React, { useState, useEffect } from "react";
import messages from "../design/messages.css";
import Image from "./layout/Image";
import resgisrationimg from "../assets/registrationimg.png";
import profile from "../assets/profile.png";
import ModalImage from "react-modal-image";
import { Button } from "@mui/material";
import { RiSendPlaneFill } from "react-icons/ri";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";
import moment from "moment/moment";
import {
    getStorage,
    ref as imgref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { BiImage } from "react-icons/bi";
import { BsEmojiSmileFill } from "react-icons/bs";
import { MdOutlineCancel, MdOutlineDownloadDone } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import EmojiPicker from "emoji-picker-react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useSelector } from "react-redux";

const Chatbox = () => {
    const db = getDatabase();
    const storage = getStorage();
    let [meg, setMeg] = useState("");
    let [meglist, setMegList] = useState([]);
    let [groupmeglist, setGroupMegList] = useState([]);
    let [showemoji, setShowEmoji] = useState(false);
    let [audiourl, setAudiourl] = useState("");
    let [audiourlup, setAudiourlup] = useState("");
    let chatData = useSelector((state) => state.activeChat.activeChat);
    let userData = useSelector((state) => state.loggedUser.loginUser);
    const [progress, setProgress] = useState(0);

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        setAudiourl(url);
        setAudiourlup(blob);
    };

    if (chatData == null) {
        return;
    }

    useEffect(() => {
        onValue(ref(db, "singlmsg/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (
                    (item.val().sendmegid == chatData.id &&
                        item.val().getmegid == userData.uid) ||
                    (item.val().sendmegid == userData.uid &&
                        item.val().getmegid == chatData.id)
                ) {
                    arr.push(item.val());
                }
            });
            setMegList(arr);
        });

        onValue(ref(db, "groupmsg/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val());
            });
            setGroupMegList(arr);
        });
    }, [chatData.id]);

    let handleMeg = (e) => {
        setMeg(e.target.value);
    };

    let handelKyUp = (e) => {
        if (e.key == "Enter") {
            if (meg != "") {
                if (chatData.type == "singlemsg") {
                    set(push(ref(db, "singlmsg")), {
                        getmegid: chatData.id,
                        getmegname: chatData.name,
                        sendmegid: userData.uid,
                        sendmegname: userData.displayName,
                        meg: meg,
                        date: `${new Date().getFullYear()}-${
                            new Date().getMonth() + 1
                        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                    }).then(() => {
                        setMeg("");
                        setShowEmoji(false);
                    });
                } else {
                    set(push(ref(db, "groupmsg")), {
                        getmegid: chatData.id,
                        getmegname: chatData.name,
                        sendmegid: userData.uid,
                        sendmegname: userData.displayName,
                        meg: meg,
                        date: `${new Date().getFullYear()}-${
                            new Date().getMonth() + 1
                        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                    }).then(() => {
                        setMeg("");
                        setShowEmoji(false);
                    });
                }
            }
        }
    };

    let handelFile = (e) => {
        console.log(e.target.files[0].type);
        const storageRef = imgref(storage, `${e.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        break;
                    case "running":
                        break;
                }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProgress(0);
                    if (e.target.files[0].type == "image/jpeg") {
                        if (chatData.type == "singlemsg") {
                            set(push(ref(db, "singlmsg")), {
                                getmegid: chatData.id,
                                getmegname: chatData.name,
                                sendmegid: userData.uid,
                                sendmegname: userData.displayName,
                                img: downloadURL,
                                date: `${new Date().getFullYear()}-${
                                    new Date().getMonth() + 1
                                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                            });
                        } else {
                            set(push(ref(db, "groupmsg")), {
                                getmegid: chatData.id,
                                getmegname: chatData.name,
                                sendmegid: userData.uid,
                                sendmegname: userData.displayName,
                                img: downloadURL,
                                date: `${new Date().getFullYear()}-${
                                    new Date().getMonth() + 1
                                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                            });
                        }
                    } else {
                        if (chatData.type == "singlemsg") {
                            set(push(ref(db, "singlmsg")), {
                                getmegid: chatData.id,
                                getmegname: chatData.name,
                                sendmegid: userData.uid,
                                sendmegname: userData.displayName,
                                video: downloadURL,
                                date: `${new Date().getFullYear()}-${
                                    new Date().getMonth() + 1
                                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                            });
                        } else {
                            set(push(ref(db, "groupmsg")), {
                                getmegid: chatData.id,
                                getmegname: chatData.name,
                                sendmegid: userData.uid,
                                sendmegname: userData.displayName,
                                video: downloadURL,
                                date: `${new Date().getFullYear()}-${
                                    new Date().getMonth() + 1
                                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                            });
                        }
                    }
                });
            }
        );
    };

    let handelmeg = () => {
        if (meg != "") {
            if (chatData.type == "singlemsg") {
                set(push(ref(db, "singlmsg")), {
                    getmegid: chatData.id,
                    getmegname: chatData.name,
                    sendmegid: userData.uid,
                    sendmegname: userData.displayName,
                    meg: meg,
                    date: `${new Date().getFullYear()}-${
                        new Date().getMonth() + 1
                    }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                }).then(() => {
                    setMeg("");
                    setShowEmoji(false);
                });
            } else {
                set(push(ref(db, "groupmsg")), {
                    getmegid: chatData.id,
                    getmegname: chatData.name,
                    sendmegid: userData.uid,
                    sendmegname: userData.displayName,
                    meg: meg,
                    date: `${new Date().getFullYear()}-${
                        new Date().getMonth() + 1
                    }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                }).then(() => {
                    setMeg("");
                    setShowEmoji(false);
                });
            }
        }
    };

    let handelEmoji = (emo) => {
        setMeg(meg + emo.emoji);
    };

    let handelAudio = () => {
        const storageRef = imgref(storage, audiourl);
        const uploadTask = uploadBytesResumable(storageRef, audiourlup);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProgress(0);

                    if (chatData.type == "singlemsg") {
                        set(push(ref(db, "singlmsg")), {
                            getmegid: chatData.id,
                            getmegname: chatData.name,
                            sendmegid: userData.uid,
                            sendmegname: userData.displayName,
                            audio: downloadURL,
                            date: `${new Date().getFullYear()}-${
                                new Date().getMonth() + 1
                            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                        });
                    } else {
                        set(push(ref(db, "groupmsg")), {
                            getmegid: chatData.id,
                            getmegname: chatData.name,
                            sendmegid: userData.uid,
                            sendmegname: userData.displayName,
                            audio: downloadURL,
                            date: `${new Date().getFullYear()}-${
                                new Date().getMonth() + 1
                            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
                        });
                    }
                });
            }
        );
        setAudiourl("");
    };

    return (
        <div className="boxs">
            <div className="chatprofile">
                <Image width="60" className="chatprofileimg" imgsrc={profile} />
                <div className="circlebox"></div>
                <div className="chatname">
                    <h3>{chatData.name}</h3>
                    <p>Online</p>
                </div>
            </div>

            <div className="chattext">
                {chatData.type == "singlemsg"
                    ? meglist.map((item, index) =>
                          item.sendmegid == userData.uid &&
                          item.getmegid == chatData.id ? (
                              <div key={index} className="sendmess">
                                  {item.meg ? (
                                      <p className="sendchattextmes sendbox3 sendsb14">
                                          {item.meg}
                                      </p>
                                  ) : item.img ? (
                                      <div>
                                          <ModalImage
                                              className="sendimg"
                                              small={item.img}
                                              large={item.img}
                                          />
                                      </div>
                                  ) : item.audio ? (
                                      <div>
                                          <audio
                                              src={item.audio}
                                              style={{ marginTop: "2px" }}
                                              controls
                                          ></audio>
                                      </div>
                                  ) : (
                                      <div className="sendmess">
                                          <video
                                              src={item.video}
                                              width="360"
                                              height="240"
                                              controls
                                          ></video>
                                      </div>
                                  )}
                                  <p className="chattime">
                                      {moment(
                                          item.date,
                                          "YYYYMMDD hh:mm"
                                      ).fromNow()}
                                  </p>
                              </div>
                          ) : (
                              item.sendmegid == chatData.id &&
                              item.getmegid == userData.uid && (
                                  <div>
                                      {item.meg ? (
                                          <p className="chattextmes box3 sb14">
                                              {item.meg}
                                          </p>
                                      ) : item.img ? (
                                          <div>
                                              <ModalImage
                                                  className="sendimg"
                                                  small={item.img}
                                                  large={item.img}
                                              />
                                          </div>
                                      ) : item.audio ? (
                                          <div>
                                              <audio
                                                  src={item.audio}
                                                  style={{ marginTop: "2px" }}
                                                  controls
                                              ></audio>
                                          </div>
                                      ) : (
                                          <div>
                                              <video
                                                  src={item.video}
                                                  width="360"
                                                  height="240"
                                                  controls
                                              ></video>
                                          </div>
                                      )}
                                      <p className="chattime">
                                          {moment(
                                              item.date,
                                              "YYYYMMDD hh:mm"
                                          ).fromNow()}
                                      </p>
                                  </div>
                              )
                          )
                      )
                    : groupmeglist.map((item, index) =>
                          item.sendmegid == userData.uid &&
                          item.getmegid == chatData.id ? (
                              <div key={index} className="sendmess">
                                  {item.meg ? (
                                      <p className="sendchattextmes sendbox3 sendsb14">
                                          {item.meg}
                                      </p>
                                  ) : item.img ? (
                                      <div>
                                          <ModalImage
                                              className="sendimg"
                                              small={item.img}
                                              large={item.img}
                                          />
                                      </div>
                                  ) : item.audio ? (
                                      <div>
                                          <audio
                                              src={item.audio}
                                              style={{ marginTop: "2px" }}
                                              controls
                                          ></audio>
                                      </div>
                                  ) : (
                                      <div className="sendmess">
                                          <video
                                              src={item.video}
                                              width="360"
                                              height="240"
                                              controls
                                          ></video>
                                      </div>
                                  )}
                                  <p className="chattime">
                                      {moment(
                                          item.date,
                                          "YYYYMMDD hh:mm"
                                      ).fromNow()}
                                  </p>
                              </div>
                          ) : (
                              item.getmegid == chatData.id && (
                                  <div>
                                      {item.meg ? (
                                          <p className="chattextmes box3 sb14">
                                              {item.meg}
                                          </p>
                                      ) : item.img ? (
                                          <div>
                                              <ModalImage
                                                  className="sendimg"
                                                  small={item.img}
                                                  large={item.img}
                                              />
                                          </div>
                                      ) : item.audio ? (
                                          <div>
                                              <audio
                                                  src={item.audio}
                                                  style={{ marginTop: "2px" }}
                                                  controls
                                              ></audio>
                                          </div>
                                      ) : (
                                          <div>
                                              <video
                                                  src={item.video}
                                                  width="360"
                                                  height="240"
                                                  controls
                                              ></video>
                                          </div>
                                      )}
                                      <p className="chattime">
                                          <span style={{ color: "#262626" }}>
                                              {item.sendmegname}
                                          </span>{" "}
                                          by{" "}
                                          {moment(
                                              item.date,
                                              "YYYYMMDD hh:mm"
                                          ).fromNow()}
                                      </p>
                                  </div>
                              )
                          )
                      )}
                {/*
                <div>
                    <ModalImage
                        className="sendimg"
                        small={resgisrationimg}
                        large={resgisrationimg}
                    />
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div className="sendmess">
                    <ModalImage
                        className="sendimg"
                        small={resgisrationimg}
                        large={resgisrationimg}
                    />
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                
                <div>
                    <audio style={{ marginTop: "2px" }} controls></audio>
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div className="sendmess">
                    <audio style={{ marginTop: "2px" }} controls></audio>
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div>
                    <video width="360" height="240" controls></video>
                    <p className="chattime">Today, 2:01pm</p>
                </div>
                <div className="sendmess">
                    <video width="360" height="240" controls></video>
                    <p className="chattime">Today, 2:01pm</p>
                </div>*/}
            </div>
            <div className="chatinputbox">
                <input
                    className="chatinput"
                    value={meg}
                    onChange={handleMeg}
                    onKeyUp={handelKyUp}
                />
                <BsEmojiSmileFill
                    onClick={() => setShowEmoji(!showemoji)}
                    style={{
                        position: "absolute",
                        top: "21px",
                        right: "125px",
                        fontSize: "22px",
                        cursor: "pointer",
                    }}
                />
                {showemoji && <EmojiPicker onEmojiClick={handelEmoji} />}
                <label>
                    <input type="file" hidden onChange={handelFile} />
                    <BiImage
                        style={{
                            position: "absolute",
                            top: "18px",
                            right: "83px",
                            fontSize: "28px",
                            cursor: "pointer",
                        }}
                    />
                </label>
                <Button
                    className="chatbtn"
                    variant="contained"
                    onClick={handelmeg}
                >
                    <RiSendPlaneFill />
                </Button>
                <AudioRecorder
                    className="audiorecorder"
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }}
                    downloadOnSavePress={false}
                    downloadFileExtension="webm"
                />
                {audiourl && (
                    <div className="audiourl">
                        <Button
                            variant="text"
                            size="medium"
                            color="success"
                            onClick={handelAudio}
                        >
                            <MdOutlineDownloadDone className="audioicon" />
                        </Button>
                        <audio src={audiourl} controls></audio>
                        <Button
                            variant="text"
                            size="medium"
                            onClick={() => setAudiourl("")}
                            color="error"
                        >
                            <MdOutlineCancel className="audioicon" />
                        </Button>
                    </div>
                )}
            </div>
            <CircularProgress
                className="progressbar"
                variant="determinate"
                value={progress}
            />
        </div>
    );
};

export default Chatbox;
