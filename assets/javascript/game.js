
// Game State object containing the state of the game
// and functions used to process and update the game
// when the player enters letters
var game_state = {
    won_games: 0,
    secret: {},
    displayed_letters: [],
    attempts_left: 0,
    total_attempts_allowed: 10,
    used_letters: [],
    victory_text: "CONGRADULATIONS! You did it!",
    defeat_text: "GAME OVER! You lost, loser!",
    reset:                function() { alert("reset not implemented"); },
    update_game_play:     function() { alert("update_game_play not implemented"); },
    update_game_info:     function() { alert("update_game_info not implemented"); },
    user_won_game:        function() { alert("user_won_game not implemented"); },
    user_lost_game:       function() { alert("user_lost_game not implemented"); },
    letter_used:          function() { alert("letter_used not implemented"); },
    apply_letter:         function() { alert("apply_letter not implemented"); },
    process_player_input: function() { alert("process_player_input not implemented"); },
}

// Resets the game with new word and game variables
game_state.reset = function()
{
    this.attempts_left = this.total_attempts_allowed;
    this.used_letters = [];

    var word_index = Math.floor(Math.random() * secret_words.length);
    this.secret = secret_words[word_index];

    this.displayed_letters = [];
    for (var i = 0; i < this.secret.word.length; i++)
    {
        if (this.secret.word[i] === " ")
        {
            this.displayed_letters.push(" ");
        }
        else
        {
            this.displayed_letters.push("_");
        }
    }
}

// Updates the document text with current game 
// play section with the number of wins, remaining
// attempts, the correctly guessed letters and the
// letters that have been used so far.
game_state.update_game_play = function()
{
    document.getElementById("wins-indicator").textContent = "Wins: " + this.won_games;

    document.getElementById("guesses-indicator").textContent = this.attempts_left;

    var displayed_word_string = "";
    for (var i = 0; i < this.displayed_letters.length; i++)
    {
        displayed_word_string += this.displayed_letters[i];
    }
    document.getElementById("word-entry").textContent = displayed_word_string;

    var used_letters_string = "";
    for (var i = 0; i < this.used_letters.length; i++)
    {
        used_letters_string += this.used_letters[i] + " ";
    }
    document.getElementById("guessed-letters").textContent = used_letters_string;
}

// Updates the game info section with a victory or
// defeat message and displays the secret word along
// with a description and image of the character.
game_state.update_game_info = function(win_or_lost_msg)
{
    var game_text = win_or_lost_msg + " ";
    game_text += this.secret.word + ": ";
    game_text += this.secret.description;
    document.getElementById("game-text").textContent = game_text;

    document.getElementById("game-image").src = this.secret.image;
}

// Check if user won the game by seeing if there
// are any remaining blanks/underscores
game_state.user_won_game = function()
{
    for (var i = 0; i < this.displayed_letters.length; i++)
    {
        if (this.displayed_letters[i] === '_')
        {
            return false;
        }
    }
    return true;
}

// Check if user lost the game (what a loser!)
game_state.user_lost_game = function()
{
    return this.attempts_left === 0;
}

// Check if the letter has already been used
game_state.letter_used = function(letter)
{
    for (var i = 0; i < this.used_letters.length; i++)
    {
        if (letter === this.used_letters[i])
        {
            return true;
        }
    }
    return false;
}

// Attempts to apply the guessed letter
// If the letter was correctly guessed,
// returns true and updates the displayed letters
// If the letter isn't in the secret word,
// returns false
game_state.apply_letter = function(letter)
{
    var did_swap = false;
    for (var i = 0; i < this.secret.word.length; i++)
    {
        if (letter === this.secret.word[i])
        {
            this.displayed_letters[i] = letter;
            did_swap = true;
        }
    }
    return did_swap;
}

// Processes the players guess, checks if the letter
// was already used and, if so, tries to apply it.
// After that, determines if the player has already won
// or lost the game and updates the game information.
game_state.process_player_input = function(letter)
{
    if (!this.letter_used(letter))
    {
        this.used_letters.push(letter);

        // Try to apply the letter to the secret.
        // If fail, reduce the number of attempts left.
        if (!this.apply_letter(letter))
        {
            this.attempts_left -= 1;
        }

        if (this.user_won_game())
        {
            this.won_games += 1;
            this.update_game_info(this.victory_text);
            this.reset();
        }
        else if (this.user_lost_game())
        {
            this.update_game_info(this.defeat_text);
            this.reset();
        }

        this.update_game_play();
    }
}

// Check if text is letter or number
function is_letter_or_number(text)
{
    var letterNumber = /^[0-9a-zA-Z]$/;
    if(text.match(letterNumber)) 
    {
        return true;
    }
    else
    { 
        return false; 
    }
}

// Grab keystrokes and apply them to the game
document.onkeyup = function(event)
{
    var letter = event.key.toUpperCase();
    console.log("User entered: " + letter);
    if (is_letter_or_number(letter))
    { 
        game_state.process_player_input(letter);
    }
}

// Initialize the game and display
game_state.reset();
game_state.update_game_play();