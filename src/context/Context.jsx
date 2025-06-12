import { createContext, useEffect } from "react";
import runChat from "../config/gemini";
import { useState } from "react";
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState(""); // takes user input 
  const [recentPrompt, setRecentPrompt] = useState(""); // display it main component
  const [prevPrompts, setPrevPrompts] = useState([]); // store input history
  const [showResult, setShowResult] = useState(false); // hide initial text and boxes
  const [loading, setLoading] = useState(false); // display loading animation
  const [resultData, setResultData] = useState(""); // display our result in page

  const delayPara = (index , next) => {
      
  }

  const onSent = async (prompt) => {
      setResultData(""); // clear previous result
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(input); // set recent prompt to display
      const response = await runChat(input);
      let responseArray = response.split("**");
      let newResponse = "";
      for(let i = 0; i < responseArray.length; i++){
         if(i == 0 || i % 2 != 1) {
            newResponse += responseArray[i];
         }
         else {
            newResponse += "<br>" + responseArray[i] + "</br>";
         }
      }
      let newResponse2 = newResponse.split("*").join("<br>");
      setResultData(newResponse2);
      setLoading(false);
      setInput(""); // clear input field after sending
  };

  const contextValue = {
      prevPrompts,
      setPrevPrompts,
      onSent,
      setRecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setInput
  };

  return (
    <Context.Provider value={contextValue}>
       {children}
    </Context.Provider>
  );
};

export default ContextProvider;
