import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { createWorker } from "tesseract.js";
import Nav from "@/components/nav";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm your personal AI Assistant Doctor.",
      timestamp: "10:25",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState("");

  const sampleQuestions = [
    "What are the symptoms of pneumonia?",
    "How can I manage sugar spikes after dinner?",
    "What are the early signs before heart attack?",
  ];

  const [showSampleQuestions, setShowSampleQuestions] = useState(true);

  const handleSampleQuestionClick = (question) => {
    setInput(question);
    setShowSampleQuestions(false);
  };

  useEffect(() => {
    setIsTyping(!!input.trim());
  }, [input]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = {
        type: "user",
        content: input.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await axios.post("http://127.0.0.1:8001/generate", {
          prompt: `Assume role of Specialist AI Doctor, Provide a short, precise response for the query: ${input.trim()}`,
        });
        const botResponse = {
          type: "bot",
          content: response.data.response,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        const botResponse = {
          type: "bot",
          content: "Sorry, I couldn't process your request at the moment.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const newMessage = {
            type: "user",
            content: reader.result, // Base64 encoded image data
            isImage: true,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);

          const worker = await createWorker();
          await worker.load();
          await worker.loadLanguage("eng");
          await worker.initialize("eng");
          const { data } = await worker.recognize(reader.result);
          const ocrMessage = {
            type: "bot",
            content: data.text,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prevMessages) => [...prevMessages, ocrMessage]);
          await worker.terminate();
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setSpeechResult(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInput(speechResult); // Set the input value to the speech result
    };

    recognition.start();
  };

  const handleAudioRecord = () => {
    if (isListening) {
      setIsListening(false);
      setInput(speechResult); // Set the input value to the speech result
    } else {
      setSpeechResult("");
      handleVoiceInput();
    }
  };

  const handleTextToSpeech = (text) => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Chatbot</title>
      </Head>
      <div className="flex flex-col h-screen font-sans bg-gray-100">
        <Nav />

        <main className="flex flex-col flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col flex-1 mb-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "bot" ? "" : "flex-row-reverse"
                } items-start space-x-2`}
              >
                <span className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {message.type === "bot" ? "SL" : "U"}
                </span>
                <div
                  className={`max-w-xs px-4 py-2 rounded-3xl shadow relative ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-teal-500 to-green-400 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {message.isImage ? (
                    <>
                      <img
                        src={message.content}
                        alt="Uploaded content"
                        className="rounded-lg max-w-full"
                      />
                      {message.type === "bot" && (
                        <p className="text-gray-600 mt-2">{message.content}</p>
                      )}
                    </>
                  ) : (
                    <p>{message.content}</p>
                  )}
                  <span className="text-xs text-gray-500">
                    {message.timestamp}
                  </span>
                  {message.type === "bot" && (
                    <button
                      onClick={() => handleTextToSpeech(message.content)}
                      className="absolute  bottom-1 right-1 px-3 py-0.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    >
                      {isSpeaking ? "Stop" : "🔊"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  SL
                </span>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                </div>
              </div>
            )}
            {isTyping && (
              <div className="flex flex-row-reverse items-start space-x-2">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  U
                </span>
                <div className="max-w-xs px-4 py-2 rounded-3xl shadow bg-gradient-to-r from-teal-500 to-green-400 text-white">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showSampleQuestions && (
            <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-3">
              {sampleQuestions.map((question, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/70 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => handleSampleQuestionClick(question)}
                >
                  <p className="text-gray-800">{question}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-2 sticky bottom-0">
            <button
              className={`p-2 bg-gray-200 rounded-full focus:outline-none ${
                isListening ? "animate-pulse" : ""
              }`}
              onClick={handleAudioRecord}
            >
              <img src="/mic.svg" alt="Record Audio" className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-gray-200 rounded-full focus:outline-none"
              onClick={handleFileUpload}
            >
              <img
                src="/attachfile.svg"
                alt="Attach File"
                className="w-5 h-5"
              />
            </button>
            <div className="relative flex-1">
              <input
                id="inputchatbox"
                type="text"
                placeholder="Take a follow-up on your health by asking queries..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring focus:ring-teal-400"
              />
            </div>
            <button
              className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-3xl hover:bg-blue-600 focus:outline-none"
              onClick={handleSend}
            >
              Send
              <img src="/sendtext.svg" alt="Send" className="w-5 h-5 ml-2" />
            </button>
          </div>
        </main>
        {isListening && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg font-bold mb-4">Listening...</p>
              <p className="text-gray-700">{speechResult}</p>
              <button
                className="mt-4 px-6 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition"
                onClick={handleAudioRecord}
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
