/* eslint-disable*/
import "./styles/chatbox.css";
import profileImg from "./images/profile.png";
import botImg from "./images/service-2.png";
import sendMsg from "./images/send-msg.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { setIntent, removeIntent } from "./../actions/intent";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
// import ChatComponent from "./chatComponent";

const Chatbox = ({ setIntent, removeIntent, setAlert }) => {
  const intent = useSelector((state) => state.intent[0]);
  const authUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isComplete, setIsComplete] = useState(false);

  // useEffect(() => {
  //   const newChatHistory = [
  //     ...chatHistory,
  //     // { sender: "user", message },
  //     { sender: "bot", message: intent ? intent.action : undefined },
  //   ];

  //   setChatHistory(newChatHistory);
  // }, [intent]);
  // console.log(intent);
  const [message, setMessage] = useState("");
  const [report, setReport] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", message: "Hello, What seems to be the problem ?." },
  ]);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // e.stopPropagation();

    if (report) {
      const body = JSON.stringify({
        user: authUser._id,
        description: intent.action,
        status: intent.status,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("http://localhost:5000/api/v1/report/create", body, config)
        .then((report) => {
          setReport(false);
          if (intent !== null) {
            removeIntent(); //Remove previous intent before adding current Intent
          }
          //SET ALERT with 5000 timeout
          const newChatHistory = [
            ...chatHistory,
            {
              sender: "bot",
              message:
                "Report Generated. Click the button below to view Report History.",
            },
          ];
          setChatHistory(newChatHistory);
          //JUMP to report page.
          // setTimeout(() => {
          // }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (intent !== null) {
        removeIntent(); //Remove previous intent before adding current Intent
      }
      setIntent({ message })
        .then((intent) => {
          if (intent && !intent.status) {
            const newChatHistory = [
              ...chatHistory,
              {
                sender: "user",
                message: message,
              },
              { sender: "bot", message: intent.action },
            ];

            setChatHistory(newChatHistory);
            setMessage("");
          } else if (intent && intent.status) {
            const newChatHistory = [
              ...chatHistory,
              {
                sender: "user",
                message: message,
              },
              { sender: "bot", message: intent.action },
              {
                sender: "bot",
                message: `DIAGNOSIS COMPLETE !!! : Click the button below to generate the final report of this session.`,
              },
            ];

            setChatHistory(newChatHistory);
            setMessage("");
            setIsComplete(true);
          } else {
            const newChatHistory = [
              ...chatHistory,
              { sender: "user", message },
              {
                sender: "bot",
                message: "I did not understand. Please rephrase your sentence.",
              },
            ];
            setChatHistory(newChatHistory);
            setMessage("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // console.log(intent);
  };

  const handleButtons = () => {
    if (!intent && !isComplete) {
      return (
        <div className='user-input-container'>
          <input
            type='text'
            className='user-input'
            placeholder='Type your message here.'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type='submit' className='button-chatbox button--send'>
            Send
          </button>
        </div>
      );
    } else if (intent && !intent.status) {
      return (
        <div className='user-radio-container'>
          <button
            className='button-chatbox button--radio'
            name='answer'
            value='YES'
            type='radio'
            onClick={(e) => {
              setMessage(intent.affirmativeAction);
            }}
          >
            YES
          </button>
          <button
            className='button-chatbox button--radio'
            name='answer'
            value='NO'
            type='radio'
            onClick={(e) => {
              setMessage(intent.negativeAction);
            }}
          >
            NO
          </button>
        </div>
      );
    } else if (intent && intent.status) {
      return (
        <div className='user-report-container'>
          <button
            onClick={(e) => {
              setReport(true);
            }}
            type='submit'
            className='button-chatbox button-report'
          >
            GENERATE REPORT
          </button>
        </div>
      );
    } else {
      return (
        <div className='user-report-container'>
          <button type='submit' className='button-chatbox button-report'>
            <Link to='/history'> Go To Reports History</Link>
          </button>
        </div>
      );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <div className='chatbox-container'>
        <div className='sidebar'>
          <h1 className='text-white'>EASE BOT</h1>
        </div>

        <div className='chat-container'>
          <div className='chat-history'>
            {chatHistory.map((item, index) => {
              return (
                <div key={index} className='message-box'>
                  <img
                    className='message-box__icon '
                    src={require("./images/defaultUser.png")}
                    alt='User Image'
                  />
                  <div className={`chat-message chat-message--${item.sender}`}>
                    <p>{item.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {handleButtons()}
          {/* {!intent ? (
            <div className='user-input-container'>
              <input
                type='text'
                className='user-input'
                placeholder='Type your message here.'
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button type='submit' className='send-button'>
                Send
              </button>
            </div>
          ) : (
            <div className='user-radio-container'>
              <button
                className='send-button radio'
                name='answer'
                value='YES'
                type='radio'
                onClick={(e) => {
                  setMessage(intent.affirmativeAction);
                }}
              >
                YES
              </button>
              <button
                className='send-button radio'
                name='answer'
                value='NO'
                type='radio'
                onClick={(e) => {
                  setMessage(intent.negativeAction);
                }}
              >
                NO
              </button>
            </div>
          )} */}
        </div>
      </div>
    </form>
  );
};

Chatbox.proptypes = {
  setIntent: PropTypes.func.isRequired,
  removeIntent: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setIntent, removeIntent, setAlert })(Chatbox);
