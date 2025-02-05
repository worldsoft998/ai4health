import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import questions from './questions.json';

const MedicalHistory = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cookies] = useCookies(['username']);
  const router = useRouter();

  const symptomsOptions = [
    "Fever",
    "Headache",
    "Cough",
    "Acidity",
    "Joint Pain",
    "Diabetes",
    "Common Cold",
    "Stomach Pain",
    "Period Problems",
    "Mood Swings",
    "Runny Nose",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => {
      const selectedOptions = prev[questionId]?.selected || [];
      const isSelected = selectedOptions.includes(option);
      const newSelectedOptions = isSelected
        ? selectedOptions.filter(opt => opt !== option)
        : [...selectedOptions, option];

      return {
        ...prev,
        [questionId]: {
          selected: newSelectedOptions,
          details: newSelectedOptions.length === 0 ? "" : (prev[questionId]?.details || "")
        }
      };
    });
  };

  const handleDetailChange = (questionId, details) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        details
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/activecomplaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: cookies.username, answers })
      });

      if (response.ok) {
        console.log('Active complaint added successfully');
        router.push('/medicaldata/history');
      } else {
        throw new Error('Failed to save active complaint');
      }
    } catch (error) {
      console.error('Error saving active complaint:', error);
      alert('Error saving active complaint');
    }
  };

  if (!isClient) {
    return null;
  }

  if (showSummary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-300 p-6">
        <div className="w-11/12 md:w-2/3 lg:w-1/2 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-teal-600 mb-6 text-center">Medical History Summary</h2>
          {Object.entries(answers).map(([questionId, answer]) => (
            <div key={questionId} className="mb-4">
              <h3 className="text-lg font-bold text-gray-800">{questions.find(q => q.id === parseInt(questionId)).description}</h3>
              <p>Response: {answer.selected.join(", ")}</p>
              {answer.details && <p>Details: {answer.details}</p>}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-teal-500 text-white hover:bg-teal-600 font-semibold py-2 px-4 rounded-lg transition w-full mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-300">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-lg text-teal-600 font-semibold">
            {questions[currentQuestion].title}
          </h2>
          <p className="text-sm text-gray-500">
            {currentQuestion + 1}/{questions.length}
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-lg">
            {questions[currentQuestion].description}
          </p>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          {currentQuestion === 0 ? (
            <div className="flex flex-wrap justify-center">
              {symptomsOptions.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleOptionSelect(questions[currentQuestion].id, symptom)}
                  className={`${
                    answers[questions[currentQuestion].id]?.selected?.includes(symptom)
                      ? "bg-teal-500 text-white" // Active button styling
                      : "bg-gray-200 text-teal-700 hover:bg-gray-300" // Default styling
                  } font-semibold py-2 px-4 m-2 rounded-lg shadow transition`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          ) : (
            questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(questions[currentQuestion].id, option)}
                className={`${
                  answers[questions[currentQuestion].id]?.selected === option
                  ? "bg-teal-500 text-white" // Active button styling
                  : "bg-gray-200 text-teal-700 hover:bg-gray-300" // Default styling
                } font-semibold py-2 px-4 rounded-lg shadow transition`}
              >
                {option}
              </button>
            ))
          )}
        </div>

        {answers[questions[currentQuestion].id]?.selected && currentQuestion !== 0 && (
          <div className="mt-6">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={questions[currentQuestion].detailPrompt}
              value={answers[questions[currentQuestion].id]?.details || ""}
              onChange={(e) => handleDetailChange(questions[currentQuestion].id, e.target.value)}
              rows={3}
            />
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`${
              currentQuestion === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-gray-500 text-white hover:bg-gray-600"
            } font-semibold py-2 px-4 rounded-lg transition`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-teal-500 text-white hover:bg-teal-600 font-semibold py-2 px-4 rounded-lg transition"
          >
            {currentQuestion === questions.length - 1 ? "Show Summary" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
