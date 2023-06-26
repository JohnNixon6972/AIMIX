import * as React from "react";
import "./App.css";
import axios from "axios";
import Typewriter from "typewriter-effect/dist/core";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import BoltIcon from "@mui/icons-material/Bolt";

function App() {
  const baseURL = "http://localhost:5000";

  const [post, setPost] = React.useState("");
  const [tech, setTech] = React.useState("");
  const [budget, setBudget] = React.useState("");

  const handleSubmit = () => {
    console.log("Tech : ", tech);
    axios
      .get(baseURL + "/tech/getTech/" + tech + "/" + budget)
      .then((response) => {
        let strprompt = response.data.replace(/(\n)/g, "<br>");
        strprompt = strprompt.replace("As an AI language model,", " ");
        setPost(strprompt);
      });
  };

  let promptAnswer, promptWriter;
  React.useEffect(() => {
    if (post.length > 0) {
      promptAnswer = document.getElementById("promptAnswer");
      promptWriter = new Typewriter(promptAnswer, {
        loop: true,
        delay: 1,
      });

      promptWriter.pauseFor(1).typeString(post).start().pauseFor(200000);
    }
  });

  return (
    <div className="App">
      <div className="container main">
        <div className="left">
          <div className="left-content">
            <div className="left-main-title">Welcome to TECH GPT</div>
            <div id="subtext" className="left-main-sub-title">
              <b>
                Given a tech product and a budget, I can crunch data real nice
                and provide you exactly what you're looking for as you deserve
                nothing but the best in the market!
              </b>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-content">
            <div class="right-glass">
              <center className="right-title">
                Looking to buy something ?
              </center>
              <div className="right-top">
                <div className="input-wrap">
                  <div className="input-tech">
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Tech Item/ Gadget
                      </InputLabel>
                      <OutlinedInput
                        placeholder="Monitor"
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">💻</InputAdornment>
                        }
                        value={tech}
                        onChange={(event) => {
                          setTech(event.target.value);
                        }}
                        label="Tech Item/ Gadget"
                      />
                    </FormControl>
                  </div>
                  <div className="input-budget">
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                      </InputLabel>
                      <OutlinedInput
                        placeholder="50000"
                        id="outlined-adornment-amount"
                        type="number"
                        startAdornment={
                          <InputAdornment position="start">₹</InputAdornment>
                        }
                        value={budget}
                        onChange={(event) => {
                          setBudget(event.target.value);
                        }}
                        label="Amount"
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="right-bottom">
                <div className="right-button">
                  <Button
                    className="crunchButton"
                    onClick={() => {
                      handleSubmit();
                    }}
                    variant="contained"
                    endIcon={<BoltIcon />}
                  >
                    Crunch IT!
                  </Button>
                </div>
                <div className="right-answer">
                  {post.length > 0 ? (
                    <>
                      <div
                        id="promptAnswer"
                        className="righ-answer-content"
                      ></div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
