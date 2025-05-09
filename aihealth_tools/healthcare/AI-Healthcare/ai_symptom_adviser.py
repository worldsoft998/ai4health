def symptom_checker(symptom):
    symptom = symptom.lower()

    if "fever" in symptom:
        medicine = "Panadol"
        precautions = "Rest, drink plenty of fluids, and consult a doctor if necessary."
    elif "headache" in symptom:
        medicine = "Aspirin or panadol"
        precautions = "Ensure you are well-hydrated and get enough rest."
    elif "sore throat" in symptom:
        medicine = "Strepsils or any other throat lozenges"
        precautions = "Stay hydrated and avoid irritants like smoking."
    elif "nausea" in symptom:
        medicine = "Onset tablets or any anti-nausea medication"
        precautions = "Avoid heavy meals and try eating smaller, more frequent meals."
    elif "low sugar" in symptom or "hypoglycemia" in symptom:
        medicine = "Consume glucose tablets or a sugary drink"
        precautions = "Eat small, balanced meals throughout the day and monitor blood sugar levels."
    elif "high blood pressure" in symptom or "hypertension" in symptom:
        medicine = "Prescription antihypertensive medication"
        precautions = "Adopt a healthy lifestyle, including a low-sodium diet and regular exercise."
    elif "low blood pressure" in symptom or "hypotension" in symptom:
        medicine = "Increase salt and fluid intake, and consult a doctor for further evaluation"
        precautions = "Stand up slowly, avoid prolonged standing, and wear compression stockings if advised."
    elif "diarrhea" in symptom:
        medicine = "Over-the-counter anti-diarrheal medication (e.g, Zincat-Od syrup)"
        precautions = "Stay hydrated, avoid dairy products, and follow the BRAT diet (bananas, rice, applesauce, and toast)."
    elif "coughing" in symptom:
        medicine = "Any cough syrup"
        precautions = "Stay hydrated, use a humidifier, and consider over-the-counter cough drops."
    elif "muscle aches" in symptom:
        medicine = "Over-the-counter pain relievers (e.g., ibuprofen)"
        precautions = "Rest, apply ice or heat, and consider gentle stretching exercises."
    elif "runny nose" in symptom:
        medicine = "Nasal spray or decongestants"
        precautions = "Stay hydrated, use a humidifier, and avoid irritants like smoking."
    elif "weakness" in symptom:
        medicine = "Take multivitamin tablets and consult a doctor for further evaluation"
        precautions = "Get adequate rest, eat a balanced diet, and stay hydrated."
    elif "fatigue" in symptom:
        medicine = "Rest and maintain a balanced diet"
        precautions = "Avoid excessive physical and mental exertion, and ensure adequate sleep."
    elif "chest pain" in symptom:
        medicine = "Immediate medical attention is required"
        precautions = "Call emergency services or go to the nearest hospital."
    elif "shortness of breath" in symptom:
        medicine = "Immediate medical attention is required"
        precautions = "Call emergency services or go to the nearest hospital."
    elif "vomiting" in symptom:
        medicine = "Onset tablets or any anti-emetic medication"
        precautions = "Stay hydrated with clear fluids, avoid solid foods, and rest."
    elif "stomachache" in symptom or "abdominal pain" in symptom:
        medicine = "Antacids like Spasler-P"
        precautions = "Avoid spicy or fatty foods, eat small meals, and apply a warm compress to the abdomen."
    elif "back pain" in symptom:
        medicine = "Over-the-counter pain relievers (e.g., acetaminophen)"
        precautions = "Apply ice or heat, maintain good posture, and avoid lifting heavy objects."
    elif "dizziness" in symptom:
        medicine = "Lie down, avoid sudden movements, and stay hydrated"
        precautions = "Rest until the dizziness subsides, and avoid operating machinery or driving."
    elif "constipation" in symptom:
        medicine = "Over-the-counter laxatives like Duphalac or stool softeners"
        precautions = "Increase fiber intake, drink plenty of fluids, and engage in regular physical activity."
    elif "insomnia" in symptom:
        medicine = "Over-the-counter sleep aids (e.g., melatonin)"
        precautions = "Establish a regular sleep schedule, limit caffeine and electronic device use before bedtime."
    elif "anxiety" in symptom:
        medicine = "Anti-anxiety medication or therapy"
        precautions = "Practice relaxation techniques, engage in regular physical activity, and maintain a healthy lifestyle."
    elif "depression" in symptom:
        medicine = "Antidepressant medication or therapy"
        precautions = "Seek support from friends and family, engage in pleasurable activities, and talk to a mental health professional."
    elif "itchy eyes" in symptom or "eye irritation" in symptom:
        medicine = "Over-the-counter antihistamine eye drops"
        precautions = "Avoid rubbing the eyes, use cool compresses, and limit exposure to allergens."
    elif "rash" in symptom or "skin irritation" in symptom:
        medicine = "Topical corticosteroids or antihistamines"
        precautions = "Avoid scratching the affected area, keep the skin clean and moisturized."
    elif "fracture" in symptom:
        medicine = "Immediate medical attention is required"
        precautions = "Avoid moving the affected area, keep it elevated, and apply ice to reduce swelling."
    elif "frostbite" in symptom:
        medicine = "Gradually warm the affected area"
        precautions = "Avoid rubbing the area, immerse it in warm (not hot) water, and seek medical attention if severe."
    elif "blood in saliva" in symptom:
        medicine = "Consult a doctor for further evaluation"
        precautions = "Avoid smoking, spicy foods, and alcohol, and maintain good oral hygiene."
    elif "blood in vomit" in symptom:
        medicine = "Immediate medical attention is required"
        precautions = "Do not eat or drink anything, and seek emergency medical assistance."
    elif "food poisoning" in symptom:
        medicine = "Stay hydrated with clear fluids"
        precautions = "Avoid solid foods, rest, and gradually reintroduce bland foods when symptoms improve."
    elif "cardiac arrest" in symptom or "heart attack" in symptom:
        medicine = "Immediate medical attention is required"
        precautions = "Call emergency services or go to the nearest hospital."
    elif "flu" in symptom:
        medicine = "Antiviral medication"
        precautions = "Rest, drink plenty of fluids, and avoid contact with others to prevent spreading the virus."
    elif "obesity" in symptom or "fat" in symptom:
        medicine = "decrease your calorie intake and consult a doctor for personalized treatment options"
        precautions = "Adopt a healthy diet and exercise regimen under medical supervision."
    elif "difficulty breathing" in symptom or "shortness of breath" in symptom:
        medicine = "Immediate medical attention is required"
        precautions = "Call emergency services or go to the nearest hospital."
    elif "lost taste" in symptom:
        medicine = "No specific medication"
        precautions = "Monitor symptoms and consult a doctor if they persist."
    elif "lost smell" in symptom:
        medicine = "No specific medication"
        precautions = "Monitor symptoms and consult a doctor if they persist."
    elif "skinny" in symptom:
        medicine = "increase your calorie intake consult a doctor for further evaluation"
        precautions = "Ensure a balanced diet and regular exercise routine."
    else:
        medicine = "No specific medicine recommended for this symptom"
        precautions = "This symptom is not in my dictionary "

    return medicine, precautions


__all__ = ['symptom_checker']
