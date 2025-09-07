import axios from "axios";

const geminiResponse = async (command,assistantName,userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
    you are not google. you will now behave like a voice-enabled Assistant.

    your task is to understand the user's natural language input and respond with a
    JSON object like this:
    {
        "type":"general" | "google-search" | "youtube-search" | "youtube play" |
        "get-time" | "get-data" | "get-month" | "calculator-open" |
        "instagram-open" | "facebook-open" | "weather-show",

        
        "userInput": "<original user input>"{only remove your name from userInput 
        if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only o search vala text jaye ,
        "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the internet of the user.
- "userInput":original sentence the user spoke.
- "response": A short voice-friendly Remote Playback,e.g., "sure,playing it now","Here
What I found", "Today is Sunday",etc.

Type meanings:
-"general":if it's a factual or informational question.
agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
-"google-search":if user wants to search something on google.
-"youtube-search":if user wants to search something on youtube.
-"youtube-play":if user wants to directly play a video or song.
-"calculator-open":if user wants to open a calculator.
-"instagram-open":if user wants to open a instagram.
-"facebook-open":if user wants to open a facebook.
-"weather-show": if user wants to show weather.
-"get-time":if user asks for current time.
-"get-date":if user asks for today's date.
-"get-day":if user asks what day it is.
-"get-month":if user asks for the current month.

Important:
- use ${userName} agar koi puche tume kisne banaya
- only respond with the JSON object,nothing else.

now your userInput-${command}`



    const result = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [{ "text": prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
      }
    );

    return result.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return null;
  }
};

export default geminiResponse;
