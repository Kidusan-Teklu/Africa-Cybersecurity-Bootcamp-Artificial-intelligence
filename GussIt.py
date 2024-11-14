import tkinter as tk
import random

# Create main window
window = tk.Tk()
window.title("Guess the Number")
window.geometry("400x300")

# Function to generate a new random number between 0 and 15
def generate_new_number():
    return random.randint(0, 15)

# Generate a random number
target_number = generate_new_number()

# Define callback function for checking the guess
def check_guess():
    try:
        guess = int(guess_entry.get())
        if guess < target_number:
            result_label.config(text=f"Too low! The correct number was {target_number}. Try again.")
            check_button.pack_forget()  # Hide the check button after an incorrect guess
            replay_button.pack()  # Show the replay button after incorrect guess
        elif guess > target_number:
            result_label.config(text=f"Too high! The correct number was {target_number}. Try again.")
            check_button.pack_forget()  # Hide the check button after an incorrect guess
            replay_button.pack()  # Show the replay button after incorrect guess
        else:
            result_label.config(text=f"Correct! The number was {target_number}. You've guessed the number!")
            check_button.pack_forget()  # Hide the check button after guessing correctly
            replay_button.config(text="Play Again")  # Change the button text to "Play Again"
            replay_button.pack()  # Show the replay button when guessed correctly
    except ValueError:
        result_label.config(text="Please enter a valid number.")

# Define callback function for restarting the game
def replay_game():
    global target_number
    target_number = generate_new_number()  # Generate a new random number
    result_label.config(text="")
    guess_entry.delete(0, tk.END)
    check_button.pack()  # Show the check button again
    replay_button.pack_forget()  # Hide the replay button after restarting the game

# Create GUI elements
title_label = tk.Label(window, text="Guess the Number Game", font=("Arial", 18))
title_label.pack(pady=10)

instruction_label = tk.Label(window, text="Guess a number between 0 and 15")
instruction_label.pack(pady=5)

guess_entry = tk.Entry(window, font=("Arial", 14), width=5)
guess_entry.pack(pady=10)

check_button = tk.Button(window, text="Check Guess", command=check_guess)
check_button.pack(pady=5)

result_label = tk.Label(window, text="", font=("Arial", 14))
result_label.pack(pady=10)

replay_button = tk.Button(window, text="Replay Game", command=replay_game)  # Replay button

# Run the main loop
window.mainloop()
