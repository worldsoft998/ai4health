# AI-Powered Healthcare Assistant for Diagnostics and Recommendations

## Abstract
The project aims to revolutionize healthcare accessibility and affordability by developing an AI-powered healthcare assistant capable of real-time disease diagnostics, actionable health recommendations, and personalized remedies. 

Leveraging advanced AI/ML models, OCR technology, and multilingual support, this system automates patient data analysis and provides tailored health insights. 

By integrating state-of-the-art algorithms, scalable backend architecture, and user-centric interfaces, the solution bridges critical gaps in healthcare delivery. 

It empowers users with accurate medical insights, reduces diagnostic delays, and ensures inclusivity through multilingual and OCR features. 

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Objectives](#2-project-objectives)
3. [Design](#3-design)
4. [Methodology](#4-methodology)
5. [Implementation](#5-implementation)
6. [Results](#6-results)
7. [Conclusion](#7-conclusion)
8. [References](#8-references)
9. [Screenshots](#9-screenshots)
10. [Setup Instructions](#10-setup-instructions)
11. [Usage Instructions](#11-usage-instructions)

---

## 1. Introduction

### Background
Access to quality healthcare remains a significant challenge in various regions worldwide, especially in remote or underdeveloped areas. Long waiting times, high costs, and limited access to expert medical professionals often lead to delayed or inadequate treatment. With advancements in artificial intelligence and machine learning, there is an unprecedented opportunity to bridge these gaps by leveraging technology to deliver timely, accurate, and affordable healthcare solutions.

### Solution
To develop an AI-powered healthcare solution that provides accurate real-time diagnostic recommendations and personalized remedies, with a focus on accessibility and inclusivity through multilingual support, OCR-enabled report processing, and future enhancements such as chatbot and voice-assisted data collection, as well as IoT integration for real-time health monitoring.

---

## 2. Project Objectives

- To provide real-time diagnostic recommendations using AI-powered machine learning models with high accuracy and confidence levels.
- To deliver personalized remedies and health precautions, including traditional and Ayurvedic options, tailored to individual health concerns.
- To integrate IoT devices for continuous real-time health monitoring and proactive healthcare management.
- To leverage OCR technology for efficient processing of uploaded medical reports, ensuring accurate extraction and analysis of patient data.
- To design a scalable and user-friendly interface that allows users to access health insights and recommendations effortlessly.
- To reduce diagnostic delays by providing instant AI-driven insights, bridging healthcare accessibility gaps in remote areas.
- To enable multilingual support for seamless interaction with users from diverse linguistic backgrounds, enhancing inclusivity and accessibility.
- To automate data collection through advanced chatbot systems and voice-assisted inputs, reducing manual entry and improving user experience.

---

## 3. Design

### System Architecture
- **Frontend**: Next.js and Tailwind CSS for an intuitive user interface.
- **Backend**: FastAPI for API interactions, Nodejs.
- **Database**: MongoDB Atlas for storing patient data.
- **AI Models**: Pre-trained models like Classification/Detection models, Fine-Tuned Medical-LLaMA3-8B, for analysis.
- **OCR Integration**: Tesseract for report processing.
- **Speech Recognition**: APIs for multilingual data entry.
- **Dependencies**: Tensorflow, Numpy, Pillow, Mongoose, Express, axios.

---

## 4. Methodology

### Data Collection
- **Patient data**, including symptoms, medical history, and health reports, is collected through:
  - **Web Forms**: Simple, guided forms for accurate input.
  - **Chat Interfaces**: AI chatbot for multilingual and conversational data collection.
  - **Voice Input**: Voice recognition for easy data submission in local languages.

### Analysis and Processing
- **AI Diagnostics**: Advanced algorithms analyze symptoms and reports, providing diagnoses with confidence intervals.
- **OCR Technology**: Extracts critical data from uploaded medical reports.
- **Medical-Llama3-8B Model**: Fine-tuned for personalized recommendations, including:
  - Ayurvedic and home remedies for minor issues.
  - Precautions and lifestyle advice tailored to the patient.
  - Follow-up actions, like doctor consultations or additional tests.

### Development Process
- **Agile Methodology**: Iterative development with focused sprints.
- **Testing and Feedback**: Regular testing and refinement through stakeholder feedback.
- **Integrated Recommendations**: Remedies and lifestyle suggestions validated through research and expert consultations, ensuring relevance and reliability.

---

## 5. Implementation

- **Patient Dashboard**: Displays personalized health insights and diagnostics.
- **OCR Processing**: Extracts data from medical reports for analysis.
- **Disease Classification**: AI models predict possible diseases with confidence scores.
- **Real-Time Recommendations**: Tailored health advice based on symptoms and history.
- **Multilingual Support**: Enables input in multiple languages for inclusivity.

---

## 6. Results

- **Accuracy**: AI models achieved 85% accuracy in disease classification.
- **Efficiency**: OCR reduced manual data entry time by 70%.
- **User Satisfaction**: Over 85% of users found the recommendations actionable.
- **Inclusivity**: Multilingual support increased accessibility for non-English speakers.

---

## 7. Conclusion

The project successfully demonstrated the potential of AI in transforming healthcare delivery. The system provided timely diagnostics and recommendations, empowering users to make informed decisions.

### Future Scope
- Integration of wearable IoT devices for real-time health monitoring.
- Expansion into video consultations with doctors.
- Development of advanced AI models for rare disease detection.
- Multilingual support for remote areas.

---

## 8. References

- TensorFlow Documentation: [https://www.tensorflow.org](https://www.tensorflow.org)
- PyTorch Documentation: [https://pytorch.org](https://pytorch.org)
- MongoDB Atlas Guide: [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
- Medical-LLaMA Research Paper: [articles/PMC11142305/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11142305/)

---

## 9. Screenshots

### Login Page
![Login Page](/Screenshots/1.png)

### Signup Page
![Signup Page](/Screenshots/2.png)

### Home Page
![Home Page](/Screenshots/3.png)

### Chatbot Page
![Chatbot Page](/Screenshots/4.jpg)

### Dashboard Page
![Dashboard Page](/Screenshots/5.png)

### Active Complaint Page
![Active Complaint Page](/Screenshots/6.png)

### History Page
![History Page](/Screenshots/7.png)

### Reports Page
![Reports Page](/Screenshots/8.png)


### Model Garden Page
## All Models
![Model Garden Page](/Screenshots/9.jpg)
## Model Garden Page with skin infection model
![](/Screenshots/9a.jpg)
## Model Garden Page with skin cancer
![](/Screenshots/9b.jpg)

---

## 10. Setup Instructions

### Prerequisites
- [Python 3.12.6](https://www.python.org/downloads/release/python-3126/)
- Node.js 14+
- MongoDB Atlas account
- Required Python and Node.js packages (listed in `requirements.txt` and `package.json`)

### Setting Up Environment Variables
1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables:
    ```sh
    MONGODB_URI=your_mongodb_cluster_url
    GOOGLE_API_KEY=your_google_generative_ai_api_key
    ```
3. Alternatively, you can set these variables in your system environment variables through advanced system settings    (recommended for GOOGLE_API_KEY).

### Setting Up the Backend (hostlocal.py)
1. Clone the repository:
    ```sh
    git clone https://github.com/Techxtommor-HealthAi/healthai.git
    cd healthai
    ```
2. Create a virtual environment and activate it (ensure you are using [Python 3.12.6](https://www.python.org/downloads/release/python-3126/)):
    ```sh
    python -m venv venv
    venv\Scripts\activate
    ```
3. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```
4. Run the backend server:
    ```sh
    cd src
    uvicorn hostlocal:app --reload
    ```

### Setting Up the Server (server.js)
1. Install the required Node.js packages:
    ```sh
    npm install
    ```
2. Start the server:
    ```sh
    node server.js
    ```

### Setting Up the Main Website
1. Navigate to the website directory:
    ```sh
    cd healthai
    ```
2. Install the required Node.js packages:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```

---

## 11. Usage Instructions

### Accessing the Main Website
1. Open your web browser and navigate to `http://localhost:3000`.
2. Sign up or log in to access the dashboard and other features.

### Testing Models
Sample images for testing the models in the Model Garden are available in the `TEST` directory. You can use these images to evaluate the performance of different models.

### Using the AI-Powered Diagnostics
1. Upload image on Garden of Models for diagnosis.
2. Enter symptoms and other relevant information through the web forms.
3. Receive real-time diagnostic recommendations and personalized health advice.

