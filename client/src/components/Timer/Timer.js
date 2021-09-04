import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Timer(props) {
  
  const [allsecs, setallsecs] = useState(
    parseInt(props.mins) * 60 + parseInt(props.secs)
  );
  const [mins, setmins] = useState(props.mins);
  const [secs, setsecs] = useState(props.secs);
  const [helper, sethelper] = useState(0);
  let history = useHistory();

  const handle = () => {
    setallsecs(allsecs - 1);
    if (allsecs == 0) props.submithandler();
    else {
      let altmins = Math.floor(allsecs / 60).toString();
      if (altmins.length == 1) altmins = "0" + altmins;
      let altsecs = (allsecs % 60).toString();
      if (altsecs.length == 1) altsecs = "0" + altsecs;
      setmins(altmins);
      setsecs(altsecs);
    }
  };
  
  useEffect(() => {
      let altmins = Math.floor(allsecs / 60).toString();
      if (altmins.length == 1) altmins = "0" + altmins;
      let altsecs = (allsecs % 60).toString();
      if (altsecs.length == 1) altsecs = "0" + altsecs;
      setmins(altmins);
      setsecs(altsecs);
      
      return () => {
      //   window.onblur = function() {
      //     var flag = window.confirm("Please don't leave!  Click OK if you really want to leave.  I hope you click cancel and stay with me.");
      //     if (flag) {
      //         window.onblur = undefined;
      //         alert("Ok you can leave now.  **sob**");
      //         props.submithandler();
      //     }
      // }
      // if (window.performance) {
      //   if (performance.navigation.type == 1 || performance.navigation.type == 2) {
      //     alert('reloaded encountered, Submitting the test');
      //     props.submithandler();
      //   } 
      // }
      
    }
  });

  useEffect(() => {
    sethelper(setInterval(handle, 1000));
    return () => {
      clearInterval(helper);
    };
  }, [allsecs]);
  // if (window.performance.navigation.type == 1) {
  //   alert('reloaded encountered, Submitting the test');
  //   props.submithandler();
  // } 
  // if (window.performance.navigation.type == 2) {
  //   alert('backward encountered, Submitting the test');
  // }
  return (
    <div
      style={{
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "white",

          padding: "2% 2% 2% 2%",
         
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>{mins}</h1>
      </div>
      <div
        style={{
          color: "white",

          padding: "2% 2% 2% 2%",
          // borderRadius: "8px",
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>:</h1>
      </div>
      <div
        style={{
      
          color: "white",
          padding: "2% 2% 2% 2%",
          // borderRadius: "8px",
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>{secs}</h1>
      </div>
    </div>
  );
}

export default Timer;
