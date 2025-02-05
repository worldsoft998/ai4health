import React, { useState } from "react";
import axios from "axios";

export default function ModelGarden() {
  const [selectedModel, setSelectedModel] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [aiContent, setAiContent] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const models = [
    {
      name: "Pneumonia",
      endpoint: "http://127.0.0.1:8000/pneumonia_detection",
    },
    {
      name: "Brain Tumor",
      endpoint: "http://127.0.0.1:8000/braintumor_detection",
    },
    {
      name: "Skin Cancer",
      endpoint: "http://127.0.0.1:8000/skincancer_detection",
    },
    {
      name: "Skin Infection",
      endpoint: "http://127.0.0.1:8000/skindisease_classification",
    },
    {
      name: "Skin Lesion",
      endpoint: "http://127.0.0.1:8000/skinlesion_classification",
    },
    { name: "Diabetic Retinopathy", endpoint: "https://api-inference.huggingface.co/models/retina" },
  ];

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
    setResults(null);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (!uploadedFile || !uploadedFile.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    setFile(uploadedFile);
    setFileUrl(URL.createObjectURL(uploadedFile));
    setResults(null);
  };

  const handleSubmit = async () => {
    if (!selectedModel || !file) {
      alert("Please select a model and upload a file.");
      return;
    }

    setLoading(true);
    setResults(null);

    const formData = new FormData();
    formData.append("file", file);

    const selectedEndpoint = models.find((model) => model.name === selectedModel)?.endpoint;

    try {
      const response = await axios.post(selectedEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;
      setResults({
        class: result.predicted_class,
        confidence: (result.confidence * 100).toFixed(2) + "%",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error performing diagnosis:", error);

      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.detail}`);
      } else {
        alert("An error occurred while performing the diagnosis. Please check your backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAIContent = async (tab) => {
    if (!results) {
      alert("Please run a diagnosis first.");
      return;
    }

    setAiLoading(true);
    setAiContent(null);

    const prompt =
      tab === "Interpretation"
        ? `Assume role of Specialist AI Doctor, explain the disease and provide an interpretation for the diagnostic result: ${results.class} with ${results.confidence} confidence in short, patient-friendly way.`
        : `Assume role of Specialist AI Doctor, provide an consultation advise for the diagnostic result: ${results.class} with ${results.confidence} confidence in short, patient-friendly way. Donot prescribe any drug, only ayurvedic or home remedies. If severe, make them consult specialist doctor.`;

    try {
      const response = await axios.post("http://127.0.0.1:8001/generate", { prompt });
      setAiContent(response.data.response);
    } catch (error) {
      console.error("Error fetching AI content:", error);
      alert("Failed to fetch content from AI.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgb(129,230,217)] via-[rgb(198,246,213)] to-[rgb(104,211,145)] flex items-center justify-center font-mono">
      <div className="w-4/5 h-[90vh] max-w-6xl p-8 bg-white/30 backdrop-blur-md rounded-[50px] shadow-lg">
        <h1 className="text-5xl font-bold text-center mb-8">Garden of Diagnostic Models</h1>
        <div className={`grid gap-8 ${submitted ? "grid-cols-2" : "grid-cols-1 justify-center"}`}>
          <div className="space-y-6 place-items-center">
            <div>
              <label htmlFor="model" className="block text-gray-800 font-semibold mb-2">
                Select a Model and Upload an Image:
              </label>
              <select
                className="text-xl w-full p-3 bg-white/70 border border-gray-300 rounded-lg shadow-sm"
                onChange={handleModelChange}
                value={selectedModel}
              >
                <option value="">Select a Model</option>
                {models.map((model, index) => (
                  <option key={index} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            {!file && (
              <div className="w-1/3 h-4/5 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center flex place-items-center">
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer block text-blue-600 font-medium place-items-center"
                >
                  <img src="/disk.png" alt="Disk" className="" />
                  Click here to upload or drop files here
                </label>
              </div>
            )}
            {file && (
              <div className="mt-4 place-items-center">
                <img
                  src={fileUrl}
                  alt="Uploaded Medical"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
            {!submitted && (
              <button
                className={`py-2 px-4 text-white rounded-3xl ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Run Diagnosis"}
              </button>
            )}
          </div>
          {submitted && (
            <div className="space-y-6">
              {results && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Diagnosis Results</h2>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Predicted Class:</span>
                      <span className="font-bold">{results.class}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="font-bold">{results.confidence}</span>
                    </li>
                  </ul>
                </div>
              )}
              <div>
                <div className="flex border-b border-gray-300">
                  <button
                    className={`px-4 py-2 font-bold ${activeTab === "Interpretation" ? "text-gray-800 border-b-2 border-black" : "text-gray-600"}`}
                    onClick={() => {
                      setActiveTab("Interpretation");
                      fetchAIContent("Interpretation");
                    }}
                  >
                    Interpretation
                  </button>
                  <button
                    className={`px-4 py-2 font-bold ${activeTab === "Consultation" ? "text-gray-800 border-b-2 border-black" : "text-gray-600"}`}
                    onClick={() => {
                      setActiveTab("Consultation");
                      fetchAIContent("Consultation");
                    }}
                  >
                    Consultation
                  </button>
                </div>
                <div className="p-4 bg-white/70 rounded-lg shadow-md">
                  {aiLoading ? (
                    <p className="text-gray-800">Loading...</p>
                  ) : aiContent ? (
                    <p className="text-gray-800">{aiContent}</p>
                  ) : (
                    <p className="text-gray-800">Select a tab to view content.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
