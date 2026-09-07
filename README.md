# Wordle

A custom browser-based clone of Wordle, built with vanilla HTML, CSS, and JavaScript. Guess the 5-letter word in 6 tries, get color-coded feedback, and play with a couple of fun visual twists (Staircase and Checkboard modes) not found in the original game.

Made by Kero.

## Features

- **Classic Wordle gameplay** — guess a 5-letter word in 6 attempts, with tile-by-tile color feedback (green = correct spot, yellow = wrong spot, gray = not in word).
- **On-screen keyboard** — click letters, backspace, or enter directly in the UI; the keyboard also updates colors to reflect guessed letters.
- **Physical keyboard support** — type, backspace, and press Enter as you would in the real game.
- **Flip-tile animations** — guessed rows animate with a staggered flip reveal as each tile's result comes in.
- **Shake feedback** — submitting an incomplete guess shakes the row and shows a "Not enough letters" message.
- **Hint system** — reveal a random consonant and/or vowel from the answer (one of each per game).
- **Alternate board modes**:
  - **Staircase mode** — an overlay of stair-stepped boxes across the board.
  - **Checkboard mode** — an overlay in a checkerboard pattern across the board.
- **New Game / landing page flow** — a landing page with logo and title links into a fresh game via a `?new=true` query param.
- **Toast-style messages** — temporary pop-up messages for game events (win, loss, invalid guess).

## Planned Features (To Do)

- **Difficulty modes** — a "Very Hard" mode that forces previously revealed green letters to stay locked in their correct position on later guesses.
- **Themes** — support for multiple visual themes (the theme button currently exists but isn't functional yet).
- **Statistics tracking** — a working Statistics panel showing games played, games won, win percentage, and guess distribution.
- **Daily streak tracking** — track and display the player's current and longest daily win streak.
- **Configurable guess count** — let players choose how many guesses they get, from 3 to 10.
- **Configurable word length** — let players choose word length, from 3 to 10 letters.
- **Dictionary validation** — restrict guesses to real words found in a valid dictionary/word list, rejecting nonsense input.

## Project Structure

```
├── wordle_landing.HTML     # Landing page (logo, title, start button)
├── wordle_landing.css      # Landing page styles
├── wordle_game.HTML        # Main game page (board, keyboard, modals)
├── wordle_game.css         # Game page styles (tiles, keyboard, animations, modes)
├── wordle.js               # Core game logic (guessing, scoring, hints, modes)
└── words5.js                # Word list used to pick the answer (referenced, not included above)
```

> Note: `wordle_game.HTML` expects assets at `styles/wordle_game.css`, `javascript/words5.js`, `javascript/wordle.js`, and `icons/WordleLogo.png` — organize files into matching folders (`styles/`, `javascript/`, `icons/`) when deploying.

## How to Play

1. Open `wordle_landing.HTML` in a browser.
2. Click **Start Game** to load the board with a new random word.
3. Type a 5-letter guess using your keyboard or the on-screen keys.
4. Press **Enter** to submit your guess.
5. Use tile colors to narrow down the answer:
   - 🟩 Green — correct letter, correct spot
   - 🟨 Yellow — correct letter, wrong spot
   - ⬛ Gray — letter not in the word
6. Solve the word within 6 guesses to win!

### Extras

- Click **?** (Hints) for a free consonant and vowel from the answer.
- Click **Select Mode** to toggle the Staircase or Checkboard visual overlays.
- Click **New Game** at any time to reset and start over.
