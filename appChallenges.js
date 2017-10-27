/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// 1: Create all the variable we need for the game, set them once at the beginning 
var scores, roundScore, activePlayer, gamePlaying;
// scores = [0,0]; the scores variable is an array (one for each player) so it's easier to manipulate. 
// we declare the gamePlaying variable in the global scope so we can access it anywhere

init(); 

var lastDice; // we declare it on the global scope so we can access it anywhere

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying){
		// 1 .Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
	
		// 2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
	
		// 3. Update the round score IF the rolled number is not a "1"
		if (dice1 !== 1 && dice2 !== 1){
		// Add number 
			roundScore += dice1 + dice2; // update score with "dice" value
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
		// Next Player 
		nextPlayer();
		}
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying){
		// Add CURRENT score to GLOBAL score 
		scores[activePlayer] += roundScore;
	
		// Update the UI 
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('#setGoal').value;
		var winningScore;
		
		if(input) { 
			winningScore = input;
		} else {
			winningScore = 100; // default value is 100
		}
	
		// Check if player won the game
		if(scores[activePlayer] >= winningScore){
			// X is the winner, so stop the game and print it
			document.querySelector('#name-' + activePlayer).textContent = "Winner !!";
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			// change the UI, we add the winner class to the winner and remove the active class
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
		  nextPlayer();
		}
	}
});


function nextPlayer() {
	// Next Player 
		activePlayer === 0 ? activePlayer =1 : activePlayer = 0;
		roundScore = 0;
		
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		
		// change the UI for the active player
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		/* document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.add('active'); */
		
		// hide the dice for next player 
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}
// when someone click the "btn-new", call/ activate the function init
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	// initialize parameters at 0
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	// transform "winner" with the initial player name
	document.querySelector('#name-0').textContent = 'Player-1';
	document.querySelector('#name-1').textContent = 'Player-2';
	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	// re-assign 'active' class to player 1 at the beginning of the game
	document.querySelector('.player-0-panel').classList.add('active');
	
	
}




















