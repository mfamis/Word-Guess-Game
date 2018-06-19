# Word-Guess-Game
A hang-man style game featuring all of your favorite games from the 90s!

## How to play
Load the page and you can play right away by typing the letters to the secret word or phrase!
You get 10 wrong guesses before you lose. Hope you brushed up on your retro gaming knowledge!
If you win the game, you will be treated to a victory message and music!
If you lose the game, you will get the dreaded defeat message and sad music!
After guessing or not guessing the secret word or phrase, the answer will be revealed, along with a image and description of the character!

## How it works
This game uses HTML, CSS, and Javascript to run. The Javascript only uses built in functions, and is designed around a game state object. Player input is intercepted via key presses (binding game functions to the document.keyup event).
There are two Javascript files used in this game: game.js and secrets.js. game.js includes all of the game runtime behavior. secret.js has all of the possible secret words and phrases to be guessed by the player (no peaking!).