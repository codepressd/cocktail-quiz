var questId = 0;
var answer = '';
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
	

});

/*Function that edits the DOM */
function questSetup (){
		answer = allQuestions[questId].answers;
		var question = allQuestions[questId].question;
		$('.question > h2').text(question);
		$('.one > h2').text(answer[0]);
		$('.two > h2').text(answer[1]);
		$('.three > h2').text(answer[2]);

};

/*Function that compares if a question is right*/
function isCorrect(str){
	if(str == )


};

$('div.answers').on('click',function(){
	$('.selected ').removeClass('selected');
	$(this).addClass('selected');
});

$('.submit-answer').on('click', function(){
	var questSelect = $('div.selected > h2').text();
	alert(questSelect);
	questId ++;
	questSetup();
});