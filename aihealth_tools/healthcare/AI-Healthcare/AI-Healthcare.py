import tkinter as tk
from ai_symptom_adviser import symptom_checker


def get_advice(event=None):
    user_symptom = entry.get()
    recommended_medicine, recommended_precautions = symptom_checker(user_symptom)
    result_label.config(text=f"Recommended Medicine: {recommended_medicine}\nPrecautions: {recommended_precautions}",
                        font=("Sitka Small", 18))


# Create the main window
root = tk.Tk()
root.title("Symptom Checker")

# Create and place widgets using grid
label = tk.Label(root, text="Enter your symptom:", font=("Sitka Small", 18))
label.pack()

entry = tk.Entry(root, width=60, font=('Sitka Subheading', 16))
entry.pack()

check_button = tk.Button(root, text="Get Advice", command=get_advice, width=15, height=2, font=("Sitka Small", 15))
check_button.pack()

result_label = tk.Label(root, text="", font=('Arial', 12))
result_label.pack()

# Bind the Enter key to the get_advice function
root.bind('<Return>', get_advice)

# Create and place the "Made by Skilled Squad" label in the bottom right corner
made_by_label = tk.Label(root, text="Made by Skilled Squad", font=("Sitka Small", 10))
made_by_label.pack(side="bottom", anchor="se", padx=10, pady=10)

# Start the Tkinter event loop
root.mainloop()
