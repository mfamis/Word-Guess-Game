secret_words = [
    {
        word: "SNES",
        image: "assets/images/games/snes.jpg",
        description: "The Super Nintendo Game Console"
    },
    {
        word: "MARIO",
        image: "assets/images/games/mario.jpg",
        description: "Mario the Italian plumber"
    }
];

var ATTEMPTS_PER_GAME = 10;

// Game tracking variables
var secret_word;
var displayed_word = [];
var number_of_attempts;
var number_of_wins = 0;
var used_letters = [];

// Resets the game with new word and game variables
function reset_game()
{
    number_of_attempts = ATTEMPTS_PER_GAME;
    used_letters = [];

    var word_index = Math.floor(Math.random() * secret_words.length);
    secret_word = secret_words[word_index];

    displayed_word = [];
    for (var i = 0; i < secret_word.word.length; i++)
    {
        displayed_word.push("_");
    }
}

// Updates the document text with current game information
function update_document_text()
{
    document.getElementById("wins-indicator").textContent = number_of_wins;

    document.getElementById("guesses-indicator").textContent = number_of_attempts;

    var displayed_word_string = "";
    for (var i = 0; i < displayed_word.length; i++)
    {
        displayed_word_string += displayed_word[i];
    }
    document.getElementById("word-entry").textContent = displayed_word_string;

    var used_letters_string = "";
    for (var i = 0; i < used_letters.length; i++)
    {
        used_letters_string += used_letters[i] + " ";
    }
    document.getElementById("guessed-letters").textContent = used_letters_string;
}

function update_game_over_screen(win_or_lost_msg)
{
    var game_text = win_or_lost_msg + " ";
    game_text += secret_word.word + ": ";
    game_text += secret_word.description;
    document.getElementById("game-text").textContent = game_text;

    document.getElementById("game-image").src = secret_word.image;
}

// Check if user won the game
function user_won_game()
{
    for (var i = 0; i < displayed_word.length; i++)
    {
        if (displayed_word[i] === '_')
        {
            return false;
        }
    }
    return true;
}

// Check if user lost the game (what a loser!)
function user_lost_game()
{
    return number_of_attempts === 0;
}

// Check if the letter has already been used
function is_letter_used(letter)
{
    for (var i = 0; i < used_letters.length; i++)
    {
        if (letter === used_letters[i])
        {
            return true;
        }
    }
    return false;
}

// Check if the letter is in the secret word
function is_letter_in_secret_word(letter)
{
    for (var i = 0; i < secret_word.word.length; i++)
    {
        if (letter === secret_word.word[i])
        {
            return true;
        }
    }
    return false;
}

// Adds the correct guessed letter to the displayed word
function add_letters_to_displayed_word(letter)
{
    for (var i = 0; i < secret_word.word.length; i++)
    {
        if (letter === secret_word.word[i])
        {
            displayed_word[i] = letter;
        }
    }
}

// Grab keystrokes and apply them to the game
document.onkeyup = function(event)
{
    var letter = event.key.toUpperCase();
    console.log("User entered: " + letter);
    if (!is_letter_used(letter))
    {
        used_letters.push(letter);
        if (is_letter_in_secret_word(letter))
        {
            add_letters_to_displayed_word(letter);
        }
        else
        {
            number_of_attempts -= 1;
        }

        if (user_won_game())
        {
            number_of_wins += 1;
            update_game_over_screen("CONGRADULATIONS! You did it!");
            reset_game();
        }
        else if (user_lost_game())
        {
            update_game_over_screen("GAME OVER! You lost, loser!");
            reset_game();
        }
        update_document_text();
    }
}

// Initialize the game and display
reset_game();
update_document_text();