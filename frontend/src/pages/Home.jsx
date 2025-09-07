import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import aiImg from '../assets/ai.gif';
import userImg from '../assets/user1.gif';
import { IoMdArrowRoundBack } from 'react-icons/io';

const placeholderImage = 'https://via.placeholder.com/300x400?text=No+Image+Selected';

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate('/signup');
    } catch (error) {
      console.error('Logout error:', error);
      setUserData(null);
      navigate('/signup');
    }
  };

  const startRecognition = () => {
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (error) {
      console.error('Recognition start error:', error);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang === 'hi-IN');
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    isSpeakingRef.current = true;
    utterance.onend = () => {
      setAiText('');
      isSpeakingRef.current = false;
      startRecognition();
    };
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    if (type === 'calculator-open') {
      window.open('https://www.google.com/search?q=calculator', '_blank');
    }

    if (type === 'instagram-open') {
      window.open('https://www.instagram.com/', '_blank');
    }

    if (type === 'facebook-open') {
      window.open('https://www.facebook.com', '_blank');
    }

    if (type === 'weather-show') {
      window.open('https://www.google.com/search?q=weather', '_blank');
    }

    if (type === 'youtube-search' || type === 'youtube-play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return console.error('SpeechRecognition API not supported');

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognitionRef.current = recognition;

    const safeRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
        } catch (err) {
          console.error('Recognition start error:', err);
        }
      }
    };

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      if (!isSpeakingRef.current) {
        setTimeout(() => safeRecognition(), 1000);
      }
    };

    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (userData?.assistantName && transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setUserText(transcript);
        setAiText('');
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setAiText(data.response);
        setUserText('');
      }
    };

    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognition();
      }
    }, 10000);

    safeRecognition();

    return () => {
      recognition.stop();
      recognitionRef.current = null;
      setListening(false);
      clearInterval(fallback);
    };
  }, [userData, getGeminiResponse]);

  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#06068a] p-6 relative flex flex-col items-center">

      {/* Top-right buttons */}
      <div className="absolute top-5 right-5 flex gap-4">
        <button
          type="button"
          className="bg-blue-800 text-white text-[18px] py-2 px-4 rounded font-semibold hover:bg-blue-600 transition"
          onClick={() => navigate('/customize')}
        >
          Customize
        </button>

        <button
          type="button"
          className="bg-red-600 text-white text-[18px] py-2 px-4 rounded font-semibold hover:bg-red-500 transition"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>

      {/* Back arrow */}
      <div className="absolute top-5 left-5 cursor-pointer" onClick={() => navigate('/customize')}>
        <IoMdArrowRoundBack className="text-white w-[30px] h-[30px]" />
      </div>

      {/* Assistant Image */}
      <div className="w-[300px] h-[400px] mt-10 flex justify-center items-center overflow-hidden rounded-4xl shadow-lg shadow-white">
        <img
          src={userData?.assistantImage || placeholderImage}
          alt="Assistant"
          className="h-full object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-white text-[24px] font-semibold text-center mt-4">I'm</h1>

      {/* Animation */}
      <div className="mt-2 flex justify-center items-center">
        <img src={aiText ? aiImg : userImg} alt="Animation" className="w-[150px] h-[150px]" />
      </div>

      {/* Spoken Text */}
      <h1 className="text-white text-[20px] font-semibold text-center mt-2">
        {userText || aiText || 'Listening for your command...'}
      </h1>
    </div>
  );
}

export default Home;
