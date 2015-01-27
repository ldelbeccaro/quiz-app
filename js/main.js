$(document).ready( function() {

	function startGame() {
		var score = 0,
			progress = 0;

		var questions = [ 
			{ question: 'Who gave Harry the resurrection stone?',
			  choices: [ 'Voldemort', 'His father', 'Dumbledore' ],
			  correct: '#option3'
			},
			{ question: 'How many kids are in the Weasley family?',
			  choices: [ '5', '7', '9' ],
			  correct: '#option2'
			},
			{ question: 'Which two teams played in the Quidditch World Cup that Harry attended?',
			  choices: [ 'Russia and England', 'Bulgaria and Ireland', 'Romania and Norway' ],
			  correct: '#option2'
			},
			{ question: 'What is the proper name for the "Liquid Luck" potion?',
			  choices: [ 'Felix Felicis', 'Venomous Tentacula', 'Mimbulus Mimbletiona' ],
			  correct: '#option1'
			},
			{ question: 'When is Harry\'s birthday?',
			  choices: [ 'May 4th', 'October 16th', 'July 31st' ],
			  correct: '#option3'
			}
		];

		function Question(q, opts, crct) {
			this.q = q;
			this.opts = opts;
			this.crct = crct;

			this.init = function() {
				$( '#question' ).text(this.q).fadeIn(400);
				$( '#option1' ).text(this.opts[0]).fadeIn(400);
				$( '#option2' ).text(this.opts[1]).fadeIn(400);
				$( '#option3' ).text(this.opts[2]).fadeIn(400);

				$(this.crct).addClass('correct');
			}

			this.init();
		}

		function clearQuestion() {
			$( '.quiz' ).children().removeClass('correct');
			$( '.quiz' ).children().not('.feedback').delay(1000).fadeOut(400);
			$( '.feedback' ).delay(700).fadeOut(400);
		}

		function nextQuestion() {
			$( '.quiz > button' ).css('background-color', 'rgb(100, 149, 237)');

			if ( progress < 5 ) {
				new Question(questions[progress].question, questions[progress].choices, questions[progress].correct);
			}
			else {
				$( '.quiz' ).append('<p class="final">Final score: ' + score + '/5</p><br><button class="start" id="again" style="display: block; top: 37%">Play again</button>');
				$( '.quiz > p' ).fadeIn(400);
				$( 'button#again' ).fadeIn(400);
				$( '.feedback' ).hide();
			}
		}

		function updateProgressBar() {
			if ( progress == 0 ) {
				$( '.circle' ).css('background-color', 'rgb(224, 224, 224)');
				$( '.bar-over' ).css('width', '0%');
			}
			else if ( progress == 1 ) {
				$( '.one' ).animate({ backgroundColor: 'cornflowerblue'}, 200);
			}
			else if ( progress == 2 ) { 
				$( '.two' ).delay(260).animate({ backgroundColor: 'cornflowerblue'}, 200);
				$( '.bar-over' ).show().animate({ width: '25%'}, 400);
			}
			else if ( progress == 3 ) { 
				$( '.three' ).delay(260).animate({ backgroundColor: 'cornflowerblue'}, 200);
				$( '.bar-over' ).animate({ width: '50%'}, 400);
			}
			else if ( progress == 4 ) { 
				$( '.four' ).delay(260).animate({ backgroundColor: 'cornflowerblue'}, 200);
				$( '.bar-over' ).animate({ width: '75%'}, 400);
			}
			else if ( progress == 5 ) { 
				$( '.five' ).delay(260).animate({ backgroundColor: 'cornflowerblue'}, 200);
				$( '.bar-over' ).animate({ width: '100%'}, 400);
			}

			$( '.progress-ratio' ).text( progress + '/5' );
			$( '.score-ratio' ).text( score + '/' + progress );
		}

		$( '.quiz > button' ).click(function () {
			if ( $(this).hasClass('correct') ) {
				$( '.feedback' ).text('Correct!').css('color', 'rgb(0, 230, 180)').fadeIn(300);
				$(this).css('background-color', 'rgb(0, 230, 180)');
				console.log('Correct: ' + $(this).text() );
				progress++;
				score++;
			}
			else {
				$( '.feedback' ).text('Incorrect').css('color', 'rgb(250, 102, 134').fadeIn(300);
				$(this).css('background-color', 'rgb(250, 102, 134)');
				console.log('Incorrect: ' + $(this).text() );
				progress++;
			}

			new clearQuestion();

			window.setTimeout( function() {
				new nextQuestion();
			}, 1500);

			new updateProgressBar();
		});

		new clearQuestion();
		new updateProgressBar();
		new Question(questions[0].question, questions[0].choices, questions[0].correct);
	}

	$( '.quiz' ).on('click', 'button.start', function() {
		$( '.quiz' ).children().fadeOut(400);
		new startGame();
	});

/* 
More questions:

Who did Harry take to the Yule Ball - Parvati Patil (not Cho Chang)
What is Hermoine's Patronus - Otter
What fruit must you tick in order to gain access to the kitches - Pear
*/

});