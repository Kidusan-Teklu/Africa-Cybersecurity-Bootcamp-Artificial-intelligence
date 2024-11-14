import tkinter as tk
import random

# Create the main game window
window = tk.Tk()
window.title("Ping Pong Game")
window.resizable(False, False)

# Set up canvas
canvas = tk.Canvas(window, width=600, height=400, bg="black")
canvas.pack()

# Draw paddle and ball
paddle = canvas.create_rectangle(250, 370, 350, 380, fill="white")
ball = canvas.create_oval(290, 190, 310, 210, fill="red")

# Initialize variables
ball_dx = 3
ball_dy = 3
score = 0
game_running = True  # Tracks if the game is running
game_over_text = None  # Placeholder for "Game Over" text
boxes = []  # List to hold boxes
colors = ["red", "blue", "green", "yellow", "purple", "orange"]

# Initialize paddle movement
paddle_dx = 20

# Create score text at the top of the screen
score_text = canvas.create_text(50, 20, text=f"Score: {score}", fill="white", font=("Arial", 16))

# Function to reset the game
def reset_game():
    global ball_dx, ball_dy, score, game_running, game_over_text, boxes
    # Remove "Game Over" text if it exists
    if game_over_text:
        canvas.delete(game_over_text)
        game_over_text = None

    # Reset ball and paddle positions
    canvas.coords(paddle, 250, 370, 350, 380)
    canvas.coords(ball, 290, 190, 310, 210)
    ball_dx, ball_dy = 3, 3

    # Reset score
    score = 0
    canvas.itemconfig(score_text, text=f"Score: {score}")

    # Remove existing boxes and create new ones
    for box in boxes:
        canvas.delete(box)
    boxes = []

    # Restart the game
    game_running = True
    update_ball()

# Function to pause/resume the game
def toggle_pause():
    global game_running
    game_running = not game_running
    if game_running:
        update_ball()

# Function to move paddle left
def move_paddle_left(event):
    if canvas.coords(paddle)[0] > 0:
        canvas.move(paddle, -paddle_dx, 0)

# Function to move paddle right
def move_paddle_right(event):
    if canvas.coords(paddle)[2] < 600:
        canvas.move(paddle, paddle_dx, 0)

# Bind paddle movement to left and right arrow keys
window.bind("<Left>", move_paddle_left)
window.bind("<Right>", move_paddle_right)

# Function to create random boxes at random times
def create_random_box():
    if game_running:  # Only create boxes if the game is running
        x1 = random.randint(50, 550)
        y1 = random.randint(50, 250)
        box_color = random.choice(colors)  # Random color for each box
        box = canvas.create_rectangle(x1, y1, x1 + 30, y1 + 30, fill=box_color)
        boxes.append((box, box_color))
        window.after(random.randint(3000, 5000), create_random_box)  # Call again after random time

# Function to check collision with boxes and update score/color
def check_box_collision(ball_pos):
    global score
    for box, box_color in boxes[:]:  # Loop over a copy of the list
        box_pos = canvas.coords(box)
        # Check for collision with box
        if (box_pos[0] < ball_pos[2] and box_pos[2] > ball_pos[0] and
            box_pos[1] < ball_pos[3] and box_pos[3] > ball_pos[1]):
            # Collision detected
            score += 5  # Add extra points for hitting a box
            canvas.itemconfig(score_text, text=f"Score: {score}")
            canvas.delete(box)  # Remove the box
            boxes.remove((box, box_color))  # Remove from list
            # Change ball color to the color of the box
            canvas.itemconfig(ball, fill=box_color)
            break  # Only handle one collision at a time

# Function to update ball position
def update_ball():
    global ball_dx, ball_dy, score, game_running, game_over_text
    if not game_running:
        return  # Stop updating if the game is paused

    canvas.move(ball, ball_dx, ball_dy)
    ball_pos = canvas.coords(ball)
    paddle_pos = canvas.coords(paddle)

    # Ball collision with left and right walls
    if ball_pos[0] <= 0 or ball_pos[2] >= 600:
        ball_dx = -ball_dx
    # Ball collision with top wall
    if ball_pos[1] <= 0:
        ball_dy = -ball_dy

    # Ball collision with paddle
    if (paddle_pos[0] < ball_pos[2] < paddle_pos[2] and
        paddle_pos[1] < ball_pos[3] < paddle_pos[3]):
        ball_dy = -ball_dy
        # Increment the score and update the display
        score += 1
        canvas.itemconfig(score_text, text=f"Score: {score}")

    # Check collision with boxes
    check_box_collision(ball_pos)

    # Check if the ball hits the bottom wall without touching the paddle (Game Over)
    if ball_pos[3] >= 400:  # Fixed the 'elif' to 'if' here
        game_over_text = canvas.create_text(300, 200, text="Game Over", fill="white", font=("Arial", 24))
        game_running = False  # Stop the game loop
        replay_button.pack(pady=10)
        return  # End the function to stop further movement

    # Continue the game loop
    window.after(20, update_ball)

# Create Replay and Pause buttons
replay_button = tk.Button(window, text="Replay", command=lambda: [replay_button.pack_forget(), reset_game()])
pause_button = tk.Button(window, text="Pause/Resume", command=toggle_pause)

# Add buttons to the window
pause_button.pack(pady=10)

# Start creating random boxes during gameplay
create_random_box()

# Start the game loop
update_ball()
window.mainloop()
