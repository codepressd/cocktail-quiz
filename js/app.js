var questId = 0;
var correctAns = '';
var answersCorrect = 0;
/*Log all five questions, answers and correct answers*/
var allQuestions = [
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

];
/*Function that loops through the object and gets the correct info*/
$(document).ready(function(){
	questSetup();
	getResultDiv(questId);

});

/*Function that edits the DOM */
function questSetup (){
		correctAns = allQuestions[questId].correct;
		var answer = allQuestions[questId].answers;
		var question = allQuestions[questId].question;
		$('.question > h2').text(question);
		$('.one > h2').text(answer[0]);
		$('.two > h2').text(answer[1]);
		$('.three > h2').text(answer[2]);
		$('.selected ').removeClass('selected');

};

/*Function that compares if a question is right*/
function isCorrect(str){
	if(str == correctAns){
		return true;
	}else{
		return false;
	}

};

/*Right or wrong question results */
var questResultNum = '';

function getResultDiv (num){
	switch (num){
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
	}
};

/*Reset Function*/

function quizReset(){
	questId = 0;
	correctAns = '';
	answersCorrect = 0;
	getResultDiv(questId);


};

/*Alert Function that lets everyone know your correct or not*/

$('h3.restart').on('click', function(){
	quizReset();
	$('span.icons').css({'color':'#fff0b7','opacity': '0.5'});
	$('span.icons2').css({'color':'#fff0b7','opacity': '0.5'});
	questSetup();
});

$('div.answers').on('click',function(){
	$('.selected ').removeClass('selected');
	$(this).addClass('selected');
});

$('.submit-answer').on('click', function(){
	var questSelect = $('div.selected > h2').text();
	
		if(isCorrect(questSelect)){
			answersCorrect ++;
			$('.lightbox').css('display','block');
			$(questResultNum +'> span:first-child').css({'color':'green',
				'opacity': '1.0'});
			$('.lightbox > h1').text('Correct!');
			setTimeout(function(){$('.lightbox').css('display','none');}, 2000);
		}else{
			$('.lightbox').css('display','block');
			$(questResultNum +'> span:last-child').css({'color':'red',
				'opacity': '1.0'});
			$('.lightbox > h1').text('Wrong...');
			setTimeout(function(){$('.lightbox').css('display','none');}, 2000);
		}
		questId ++;
		getResultDiv(questId);

		if(questId == 5){
			$('.question > h2').text("Congrats on completing the cocktail quiz. You got " + answersCorrect +" questions correct!");
			$('.question > h2').append('<h3 class="restart-big"><i class="fa fa-arrow-left" aria-hidden="true"></i></i>Restart Quiz</h3>')
			$('.one > h2').text('');
			$('.two > h2').text('');
			$('.three > h2').text('');
			$('.selected ').removeClass('selected');
		}else{

		questSetup();
		}
	
});