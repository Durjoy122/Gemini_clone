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

  const delayPara = (index , nextWord) => {
      setTimeout(() => {
          setResultData((prev) => prev + nextWord);
      }, index * 75);
  }

  const newChat = () => {
      setLoading(false);
      setShowResult(false);
  }

  const onSent = async (prompt) => {
      setResultData(""); // clear previous result
      setLoading(true);
      setShowResult(true);
      let response;
      if(prompt !== undefined) {
          response = await runChat(prompt);
          setRecentPrompt(prompt); 
      }
      else {
         setRecentPrompt(input); // set recent prompt to display
         setPrevPrompts((prev) => [...prev, input]); // add input to history
         response = await runChat(input);
      }
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
      let newResponseArray = newResponse2.split(" ");
      for(let i = 0; i < newResponseArray.length; i++) {
          delayPara(i, newResponseArray[i] + " ");
      }
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
      setInput,
      newChat
  };

  return (
    <Context.Provider value={contextValue}>
       {children}
    </Context.Provider>
  );
};

export default ContextProvider;
