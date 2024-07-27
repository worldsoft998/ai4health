#!/usr/bin/env python
# coding: utf-8

# # **Healthcare AI Chatbot**

from google.colab import drive
drive.mount('/content/drive')


def getSeverityDict():
    global severityDictionary
    with open('/content/drive/MyDrive/Data_chatbot/Masterdata/Symptom_severity.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if len(row) < 2:  # Check if row has at least 2 columns
                continue
            try:
                severityDictionary[row[0]] = int(row[1])
            except ValueError:
                print(f"Skipping row with invalid data: {row}")


import re
import pandas as pd
import pyttsx3
from sklearn import preprocessing
from sklearn.tree import DecisionTreeClassifier, _tree
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
import csv
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

# Load datasets
training = pd.read_csv('/content/drive/MyDrive/Data_chatbot/Training.csv')
testing = pd.read_csv('/content/drive/MyDrive/Data_chatbot/Testing.csv')

# Prepare data
cols = training.columns[:-1]
x = training[cols]
y = training['prognosis']
y1 = y

# Group data by prognosis
reduced_data = training.groupby(training['prognosis']).max()

# Mapping strings to numbers
le = preprocessing.LabelEncoder()
le.fit(y)
y = le.transform(y)

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
testx = testing[cols]
testy = testing['prognosis']
testy = le.transform(testy)

# Train Decision Tree Classifier
clf1 = DecisionTreeClassifier()
clf = clf1.fit(x_train, y_train)

# Cross-validation scores
scores = cross_val_score(clf, x_test, y_test, cv=3)
print("Decision Tree Classifier cross-validation score:", scores.mean())

# Train Support Vector Classifier
model = SVC()
model.fit(x_train, y_train)
print("Support Vector Classifier score:", model.score(x_test, y_test))

# Feature importance
importances = clf.feature_importances_
indices = np.argsort(importances)[::-1]
features = cols

# Function to read text aloud
def readn(nstr):
    engine = pyttsx3.init()
    engine.setProperty('voice', "english+f5")
    engine.setProperty('rate', 130)
    engine.say(nstr)
    engine.runAndWait()
    engine.stop()

# Initialize dictionaries
severityDictionary = dict()
description_list = dict()
precautionDictionary = dict()
symptoms_dict = {symptom: index for index, symptom in enumerate(x)}

# Calculate condition severity
def calc_condition(exp, days):
    total_severity = sum(severityDictionary[item] for item in exp)
    if (total_severity * days) / (len(exp) + 1) > 13:
        print("You should take the consultation from a doctor.")
    else:
        print("It might not be that bad but you should take precautions.")

# Read CSV files and populate dictionaries
def getDescription():
    with open('/content/drive/MyDrive/Data_chatbot/Masterdata/symptom_Description.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if len(row) < 2:  # Check if row has at least 2 columns
                continue
            description_list[row[0]] = row[1]

def getSeverityDict():
    global severityDictionary
    with open('/content/drive/MyDrive/Data_chatbot/Masterdata/Symptom_severity.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if len(row) < 2:  # Check if row has at least 2 columns
                continue
            try:
                severityDictionary[row[0]] = int(row[1])
            except ValueError:
                print(f"Skipping row with invalid data: {row}")

def getprecautionDict():
    global precautionDictionary
    with open('/content/drive/MyDrive/Data_chatbot/Masterdata/symptom_precaution.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if len(row) < 5:  # Check if row has at least 5 columns
                continue
            precautionDictionary[row[0]] = row[1:]

# Get user information
def getInfo():
    print("-----------------------------------HealthCare ChatBot-----------------------------------")
    name = input("Your Name? -> ")
    print("Hello,", name)

# Check if the input pattern matches any known symptoms
def check_pattern(dis_list, inp):
    inp = inp.replace(' ', '_')
    pattern = re.compile(f"{inp}")
    matches = [item for item in dis_list if pattern.search(item)]
    return 1, matches if matches else 0, []

# Predict disease based on symptoms
def sec_predict(symptoms_exp):
    df = pd.read_csv('/content/drive/MyDrive/Data_chatbot/Training.csv')
    X = df.iloc[:, :-1]
    y = df['prognosis']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=20)
    rf_clf = DecisionTreeClassifier()
    rf_clf.fit(X_train, y_train)
    input_vector = np.zeros(len(symptoms_dict))
    for item in symptoms_exp:
        input_vector[symptoms_dict[item]] = 1
    return rf_clf.predict([input_vector])

# Print the predicted disease
def print_disease(node):
    node = node[0]
    val = node.nonzero()
    disease = le.inverse_transform(val[0])
    return list(map(lambda x: x.strip(), list(disease)))

# Generate decision tree code
def tree_to_code(tree, feature_names):
    tree_ = tree.tree_
    feature_name = [feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!" for i in tree_.feature]
    chk_dis = ",".join(feature_names).split(",")
    symptoms_present = []

    # Input symptom and days
    while True:
        disease_input = input("Enter the symptom you are experiencing -> ")
        conf, cnf_dis = check_pattern(chk_dis, disease_input)
        if conf == 1:
            print("searches related to input:")
            for num, it in enumerate(cnf_dis):
                print(num, ")", it)
            conf_inp = int(input(f"Select the one you meant (0 - {num}): "))
            disease_input = cnf_dis[conf_inp]
            break
        else:
            print("Enter a valid symptom.")

    while True:
        try:
            num_days = int(input("Okay. From how many days? : "))
            break
        except ValueError:
            print("Enter valid input.")

    # Recurse the decision tree
    def recurse(node, depth):
        indent = "  " * depth
        if tree_.feature[node] != _tree.TREE_UNDEFINED:
            name = feature_name[node]
            threshold = tree_.threshold[node]
            val = 1 if name == disease_input else 0
            if val <= threshold:
                recurse(tree_.children_left[node], depth + 1)
            else:
                symptoms_present.append(name)
                recurse(tree_.children_right[node], depth + 1)
        else:
            present_disease = print_disease(tree_.value[node])
            red_cols = reduced_data.columns
            symptoms_given = red_cols[reduced_data.loc[present_disease].values[0].nonzero()]
            print("Are you experiencing any")
            symptoms_exp = []
            for syms in list(symptoms_given):
                inp = input(f"{syms}? : ").strip().lower()
                while inp not in ["yes", "no"]:
                    inp = input("Provide proper answers i.e. (yes/no) : ").strip().lower()
                if inp == "yes":
                    symptoms_exp.append(syms)
            second_prediction = sec_predict(symptoms_exp)
            calc_condition(symptoms_exp, num_days)
            if present_disease[0] == second_prediction[0]:
                print("You may have", present_disease[0])
                print(description_list[present_disease[0]])
            else:
                print("You may have", present_disease[0], "or", second_prediction[0])
                print(description_list[present_disease[0]])
                print(description_list[second_prediction[0]])
            precution_list = precautionDictionary[present_disease[0]]
            print("Take the following measures:")

