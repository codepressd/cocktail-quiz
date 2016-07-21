
//wrap all the code in document ready to prevent polutting the global namespace
$(document).ready(function () {

	//create object "data" object with the quiz data
	var quiz = {
		allQuestions: [
			{
				id: 1,
				question: "Who was the Godfather of modern mixology?",
				answers: ["Dale Degroff", "Jerry Thomas", "Patrick Swayze"],
				correct: "Jerry Thomas"
			},
			{
				id: 2,
				question: "What is the Official drink of The Preakness?",
				answers: ["Mint Julep", "The Manhattan", "Black-Eyed Susan"],
				correct: "Black-Eyed Susan"
			},
			{
				id: 3,
				question: "What is the oldest recorded cocktail?",
				answers: ["El Draque", "Old Fasihoned", "Sazarac"],
				correct: "El Draque"
			},
			{
				id: 4,
				question: "What was the original liquor used in a Sazarac?",
				answers: ["Rye Whiskey", "Bourbon", "Cognac"],
				correct: "Cognac"
			},
			{
				id: 5,
				question: "Which of these were a popular speakeasy during prohibition?",
				answers: ["Cotton Club", "Opal", "Absinthe"],
				correct: "Cotton Club"
			}
		],
		//add a few method/functions to access the questions array
		getCorrectAnswer: function (id) {
			return this.allQuestions[id].correct
		},
		getAnswers: function (id) {
			return this.allQuestions[id].answers;
		},
		getQuestion: function (id) {
			return this.allQuestions[id].question;
		}
	}

	//Instead of separate variables, let's group them together into an Object
	//Create another object to track the current question
	// var questId = 0;
	// var correctAns = '';
	var currentQuestion = {
		questId: 0,
		correctAns: ''
	}
	//NOTE: we could add getCurrentQuestionId and incrementQuestion method/functions
	//sorta like we did for the Quiz above. But this should do for now

	//If the user got more complex, like storing a name and login then
	//this would change into an object like the quiz
	var answersCorrect = 0;

	/*Log all five questions, answers and correct answers*/

	/*Function that loops through the object and gets the correct info*/
	//Initialize the app
	(function () {
		questSetup();
		getResultDiv(currentQuestion.questId);
	})();

	/*Function that edits the DOM */
	function questSetup() {
		//update this section to use the quiz object
		currentQuestion.correctAns = quiz.getCorrectAnswer(currentQuestion.questId);
		var answers = quiz.getAnswers(currentQuestion.questId);
		var question = quiz.getQuestion(currentQuestion.questId);

		//this basically stays the same
		$('.question > h2').text(question);
		$('.one > h2').text(answers[0]);
		$('.two > h2').text(answers[1]);
		$('.three > h2').text(answers[2]);
		$('.selected ').removeClass('selected');
	};

	/*Function that compares if a question is right*/
	function isCorrect(str) {
		//update to use the currentQuestion object
		if (str == currentQuestion.correctAns) {
			return true;
		} else {
			return false;
		}
	};

	//Instead of having the 'getResultDiv' function update the 'questResultNum' variables
	//We can just have the 'getResultDiv' return the correct string 

	/*Right or wrong question results */
	// var questResultNum = '';

	function getResultDiv(num) {
		//we can build a new string instead of using a switch statement
		var qNum = num + 1; //this "+" plus-sign adds 1 to num
		return ".quest" + qNum; //And this "+" concatenates the string

		/*switch (num) {
			case 0:
				questResultNum = '.quest1';
				break;
			case 1:
				questResultNum = '.quest2';
				break;
			case 2:
				questResultNum = '.quest3';
				break;
			case 3:
				questResultNum = '.quest4';
				break;
			case 4:
				questResultNum = '.quest5';
				break;
		}*/
	};

	/*Reset Function*/

	function quizReset() {
		currentQuestion.questId = 0;
		currentQuestion.correctAns = '';
		answersCorrect = 0;
		getResultDiv(currentQuestion.questId);


	};

	/*Alert Function that lets everyone know your correct or not*/
	// we can change this to event delegation (aka live-events) like we discussed
	// https://learn.jquery.com/events/event-delegation/ 
	/*$('h3.restart').on('click', function () {
		quizReset();
		$('span.icons').css({ 'color': '#fff0b7', 'opacity': '0.5' });
		$('span.icons2').css({ 'color': '#fff0b7', 'opacity': '0.5' });
		questSetup();
	});*/

	$('body').on('click', 'h3.restart', function () {
		quizReset();

		// you could combine the selectors, $('span.icons, span.icons')
		// and use .addClass and .removeClass like we discussed http://api.jquery.com/removeClass/
		// something like $('span.icons, span.icons').removeClass('correct wrong');
		$('span.icons').css({ 'color': '#fff0b7', 'opacity': '0.5' });
		$('span.icons2').css({ 'color': '#fff0b7', 'opacity': '0.5' });
		questSetup();
	});

	$('div.answers').on('click', function () {
		$('.selected ').removeClass('selected');
		$(this).addClass('selected');
	});

	$('.submit-answer').on('click', function () {
		var questSelect = $('div.selected > h2').text();

		if (isCorrect(questSelect)) {
			answersCorrect++;
			$('.lightbox').css('display', 'block');
			//$(questResultNum + '> span:first-child').css({
			/// Change the direct css manipulation to addClass/removeClass
			// something like... // $(getResultDiv(currentQuestion.questId) + '> span:first-child').addClass('correct');
			$(getResultDiv(currentQuestion.questId) + '> span:first-child').css({
				'color': 'green',
				'opacity': '1.0'
			});
			$('.lightbox > h1').text('Correct!');
			setTimeout(function () { $('.lightbox').css('display', 'none'); }, 2000);
		} else {
			$('.lightbox').css('display', 'block');

			// $(questResultNum + '> span:last-child').css({
			/// Change the direct css manipulation to addClass/removeClass
			// something like... $(getResultDiv(currentQuestion.questId) + '> span:first-child').addClass('wrong');
			$(getResultDiv(currentQuestion.questId) + '> span:last-child').css({
				'color': 'red',
				'opacity': '1.0'
			});
			$('.lightbox > h1').text('Wrong...');
			setTimeout(function () { $('.lightbox').css('display', 'none'); }, 2000);
		}
		currentQuestion.questId++;
		// getResultDiv(currentQuestion.questId);

		if (currentQuestion.questId == 5) {
			$('.question > h2').text("Congrats on completing the cocktail quiz. You got " + answersCorrect + " questions correct!");
			$('.question > h2').append('<h3 class="restart">Restart Quiz</h3>'); //removed right arrow and changed class from "restart-big" to "restart"
			$('.one > h2').text('');
			$('.two > h2').text('');
			$('.three > h2').text('');
			$('.selected ').removeClass('selected');
		} else {
			questSetup();
		}

	});

});
