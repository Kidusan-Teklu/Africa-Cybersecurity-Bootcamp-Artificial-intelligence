

# Flappy Bird Game

A simple **Flappy Bird** game created using **JavaScript**, **HTML**, **CSS**, and **Python (Flask)** for backend support. This game allows users to control a bird through obstacles with adjustable difficulty levels.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Game Mechanics](#game-mechanics)
- [How It Was Created](#how-it-was-created)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project is a browser-based version of the classic **Flappy Bird** game where the objective is to navigate a bird through a series of pipes without hitting them. The game features customizable difficulty levels, score tracking, and an easy-to-use replay option.

## Technologies Used

- **HTML**: Structure of the webpage.
- **CSS**: Styling for the game elements and UI components.
- **JavaScript**: Main game logic, including rendering, movement, and collision detection.
- **Python (Flask)**: Backend for serving the HTML, CSS, and JavaScript files.

## Features

- **Click and Spacebar Controls**: Control the bird by tapping on the screen or pressing the spacebar.
- **Score Counter**: Tracks the number of successful pipe passages.
- **Difficulty Levels**: Three levels — Easy, Medium, and Hard — each with different pipe gap widths and speeds.
- **Replay Button**: Allows players to restart the game after losing.

## Installation

### Prerequisites

- Python 3.x
- Flask (`pip install flask`)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone "https://github.com/Kidusan-Teklu/Africa-Cybersecurity-Bootcamp-Artificial-intelligence"
   cd flappy_bird

2. **Install Flask**:
   ```bash
   python -m pip install flask
   ```

3. **Run the Backend Server**:
   - Navigate to the project directory and run:
     ```bash
     python backend.py
     ```
   - This will start the server on `http://127.0.0.1:5000/`.

4. **Open the Game**:
   - Open a web browser and go to `http://127.0.0.1:5000/` to play the game.

## Usage

1. Open the game in your browser.
2. Choose a difficulty level from the dropdown menu.
3. Tap on the screen or press the spacebar to make the bird fly.
4. Avoid the pipes and try to achieve a high score.
5. When the game ends, click the **Replay** button to start over.

## Game Mechanics

- **Gravity and Jump**: The bird has gravity acting on it, causing it to fall. Tapping or pressing the spacebar gives the bird a jump, allowing it to move upward.
- **Pipes**: Pipes appear periodically from the right side of the screen. Each successful pass through pipes increases the score.
- **Difficulty Levels**:
  - **Easy**: Wider gaps between pipes and slower movement.
  - **Medium**: Moderate gap and speed.
  - **Hard**: Narrower gaps and faster movement.

## How It Was Created

1. **HTML/CSS**: Built the layout and styled the main elements like the game canvas, score counter, and replay button.
2. **JavaScript**:
   - Core game logic, including bird physics, pipe generation, collision detection, and scoring.
   - Event listeners for click and spacebar controls.
   - Difficulty adjustment based on `pipeGap` and `pipeSpeed`.
3. **Flask (Python)**: Serves the HTML, CSS, and JavaScript files as a lightweight backend.
4. **Replay Button**: Shows up when the game is over, allowing players to reset the game without refreshing the page.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements.

## License

This project is open source and available under the **GNU General Public License (GPL) Version 3, 29 June 2007**. See the [LICENSE](LICENSE) file for more details.
