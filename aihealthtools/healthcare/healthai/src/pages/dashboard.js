import React from "react";
import { Heart, Circle, Brain } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Nav from "@/components/nav";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const PatientDashboard = () => {
  const router = useRouter();

  const handleChatWithAIDoctor = () => {
    router.push("/chatbot");
  };

  // State for login and user details
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // State for medical history
  const [data, setData] = useState(null);
  const [cookies] = useCookies(["username"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const generateTopSuggestions = async (userData) => {
    const prompt = `Generate top 4 remedies from the following user data (personal history, family history, medical history, allergies) in 7 words each:\n${JSON.stringify(
      userData
    )}`;
    try {
      const response = await fetch("http://127.0.0.1:8001/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const result = await response.json();
      return result.response.split("\n").slice(0, 4); // Get top 4 suggestions
    } catch (error) {
      console.error("Error generating suggestions:", error);
      return [];
    }
  };

  // Fetch user session on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session");
        const result = await response.json();
        if (result.success) {
          setIsLoggedIn(true);
          setUser(result.user);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Failed to fetch user session:", err);
        setIsLoggedIn(false);
      }
    };

    fetchSession();
  }, []);

  // Fetch medical history
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn || !cookies.username) return; // Ensure conditions are checked inside the hook

      try {
        setLoading(true); // Start loading
        const response = await fetch(
          `/api/userdata?username=${cookies.username}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
        const suggestions = await generateTopSuggestions(result.data);
        setSuggestions(suggestions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [isLoggedIn, cookies.username]);

  // Handle render logic
  if (!isLoggedIn) {
    return <div>Please log in to access the dashboard.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }
  const bodyCompositionData = {
    oxygen: 45,
    nitrogen: 10,
    carbon: 20,
    calcium: 7,
    hydrogen: 16,
    other: 5,
  };
  const bmiValue = 25; // Replace with dynamic BMI value
  let bmiColor;

  // Set BMI level colors
  if (bmiValue < 18.5) {
    bmiColor = "#1E90FF"; // Underweight - Blue
  } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
    bmiColor = "#4CAF50"; // Normal - Green
  } else if (bmiValue >= 25 && bmiValue < 29.9) {
    bmiColor = "#FFC107"; // Overweight - Yellow
  } else {
    bmiColor = "#FF5722"; // Obese - Red
  }

  const monthlyData = [
    8.0, 9.5, 2.0, 4.0, 7.0, 1.0, 5.0, 4.5, 3.0, 2.0, 5.0, 6.0,
  ];

  return (
    <div>
      <Nav />

      <div className="min-h-screen  bg-[#e6f2ee] p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <div className="flex">
            {/* Patient Info Card */}
            <div className="w-2/3 bg-white p-6  rounded-xl backdrop-blur-lg shadow-xl hover:border-2 hover:border-green-500 flex justify-between items-start space-x-4">
              {/* Left Section: Patient Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <img
                    src="/user.png"
                    alt="Doctor"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {user ? user.username : "Guest"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Last Checkup: 04 Jan 2022
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sex:</span>
                    <span>{user ? user.sex : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span>{user ? user.age : "N/A"}</span>
                  </div>
                </div>
                <div className="mt-16">
                  <h3 className="text-lg font-medium text-gray-800">
                    Latest Diagnosis
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="text-gray-800">Heart Disease</p>
                      <p className="text-gray-500 text-sm">
                        Dilate Cardiomyopathy
                      </p>
                    </div>
                  </div>
                  <a href="/userinfo">
                    <button className="mt-4 w-full bg-orange-50 text-orange-500 py-2 px-4 rounded-lg hover:bg-orange-100 transition-colors">
                      Illness History
                    </button>
                  </a>
                </div>
              </div>
            </div>
            {/* Right Section: BMI Gauge */}
            <div className="w-1/3 bg-white p-6 ml-4 rounded-xl backdrop-blur-lg shadow-xl hover:border-2 hover:border-green-500  space-x-4 items-center">
              <h3 className="text-gray-800 font-medium mb-4 text-center">
                BMI Gauge
              </h3>
              <div className="w-24 h-24 items-center">
                <CircularProgressbar
                  value={bmiValue}
                  maxValue={40} // Set max BMI value for reference
                  text={`${bmiValue} BMI`}
                  styles={buildStyles({
                    rotation: 0.75, // Rotate for a half-circle
                    strokeLinecap: "round",
                    pathColor: bmiColor,
                    trailColor: "#e0e0e0",
                    textColor: bmiColor,
                    textSize: "14px",
                  })}
                />
              </div>
              <h4 className="text-gray-800 font-medium mt-4 text-center">
                BMI Gauge
              </h4>
            </div>
          </div>

          {/* Body Composition Card */}
          <div className="bg-white p-6 rounded-xl backdrop-blur-lg shadow-xl hover:border-2 hover:border-green-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Body Composition
            </h2>
            <div className="flex justify-between items-center">
              <div className="w-1/2">
                <img src="download.jpg" alt="Body" className="w-full h-auto" />
              </div>
              <div className="w-1/2">
                <div className="relative w-32 h-32 border-8 border-teal-500 rounded-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-gray-800">
                        45
                      </span>
                      <span className="block text-sm text-gray-500">
                        Oxygen
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {Object.entries(bodyCompositionData).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="capitalize text-gray-600">{key}</span>
                      <span>{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Organ Health Card */}

          <div className="bg-white p-6 rounded-xl backdrop-blur-lg shadow-xl hover:border-2 hover:border-green-500">
            <div className="mb-6">
              {/* Remedies Box */}
              <div className="bg-green-50 rounded-lg p-4 backdrop-blur-lg shadow-xl mb-4">
                <div>
                  <h3>Health Histories</h3>
                  {data.healthHistories?.map((history, index) => (
                    <div key={history._id || index}>
                      <p>
                        <strong>Personal History:</strong>{" "}
                        {history.personalHistory.join(", ") || "None"}
                      </p>
                      <p>
                        <strong>Family History:</strong>{" "}
                        {history.familyHistory.join(", ") || "None"}
                      </p>
                      <p>
                        <strong>Medical History:</strong>{" "}
                        {history.medicalHistory.join(", ") || "None"}
                      </p>
                      <p>
                        <strong>Allergies:</strong>{" "}
                        {history.allergies.join(", ") || "None"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Top Recommendations Box */}
              <div className="bg-green-50 rounded-lg p-4 backdrop-blur-lg shadow-xl">
                <span className="font-semibold text-gray-700">
                  Top Recommendations:
                </span>
                <ul className="list-none list-inside text-gray-600 mt-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-6">
          {/* Health Risk Scores */}
          <div className="col-span-2 bg-white p-6 rounded-xl backdrop-blur-lg shadow-xl hover:border-2 hover:border-green-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Health Risk Scores
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800 font-medium">
                    Heart Disease Risk
                  </span>
                  <span className="text-gray-800 font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-red-400 h-4 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800 font-medium">
                    Diabetes Risk
                  </span>
                  <span className="text-gray-800 font-medium">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-yellow-400 h-4 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800 font-medium">
                    Obesity Risk
                  </span>
                  <span className="text-gray-800 font-medium">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-400 h-4 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat with AI */}
          <div className="col-span-2 bg-white p-6 rounded-xl backdrop-blur-lg shadow-xl hover:border-2 hover:border-green-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chat with AI
            </h2>
            <div className="space-y-4">
              <div className="flex items-center bg-green-50 p-4 rounded-lg shadow-md">
                <div className="flex-shrink-0">
                  <img
                    src="personal-ai-doctor.4cac7154.svg"
                    alt="AI Doctor"
                    className="w-12 h-12"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    Chat with AI Doctor
                  </p>
                  <p className="text-sm text-gray-600">
                    Get instant health advice and insights from our AI-powered
                    doctor assistant.
                  </p>
                  <button
                    onClick={handleChatWithAIDoctor}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Calories Stats with variable width */}
          <div className="col-span-4 bg-white p-6 rounded-xl backdrop-blur-lg shadow-xl hover:border-2 hover:border-green-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Calories Stats
            </h2>
            <div className="h-64">
              <div className="flex h-full items-end space-x-2">
                {monthlyData.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-green-100 rounded-t transition-all duration-500"
                    style={{ height: `${value * 10}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
