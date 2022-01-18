class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  //fonction pour verifier la bonne reponse avec la reponse de l'utilisateur
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

let questions = [
  new Question(
    "Que retourne Math.min(Math.E , Math.SQRT1_2 , 0.5) ?",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelles méthode Javascript permet de filtrer les élements d'un tableau ?",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Comment afficher 'Bonjour' sur la console ?",
    [
      "log('Bonjour');",
      "prompt('Bonjour');",
      "console.log(Bonjour');",
      "console('Bonjour');",
    ],
    "console.log(Bonjour');"
  ),
  new Question(
    "Comment afficher 'Bonjour' dans une boite de dialogue ?",
    [
      "print('bonjour');",
      "write('bonjour')",
      "alert('bonjour');",
      "echo('bonjour');",
    ],
    "alert('bonjour')"
  ),
  new Question(
    "Comment lire le jour du mois dans une date ?",
    ["Date.parse()", "getDate()", "getDay()", "Day()"],
    "getDate()"
  ),
  new Question(
    "Que renvoie la fonction T1.map(MaFonction) ?",
    [
      "un nouveau tableau d'éléments traités par 'MaFonction' ",
      "le même tableau T1 où 'MaFonction' s'est appliqué à tous les éléments",
      "une chaîne d'éléments traités par 'MaFonction'",
      "une chaîne d'éléments traités par 'MaZebbi'",
    ],
    "un nouveau tableau d'éléments traités par 'MaFonction' "
  ),
];
// console.log(questions);

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  // fonction for get which questions
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

//regroup all fonction relative to the app display
const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  endQuiz: function() {
    endQuizHTML = `
    <h1>Quiz Terminé !</h1>
        <h3>votre score est : ${quiz.score} / ${quiz.questions.length}</h3>
        `;

    this.elementShown("quiz", endQuizHTML);
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function() {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function() {
        quiz.guess(guess);
        quizApp();
      };
    };
    for (let index = 0; index < choices.length; index++) {
      this.elementShown("choice" + index, choices[index]);
      guessHandler("guess" + index, choices[index])
    }
  },
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown(
      "progress",
      "Question " + currentQuestionNumber + " sur " + quiz.questions.length
    );
  },
};

// game logic

quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
    //choices
    //progress
  }
};

//create Quiz
let quiz = new Quiz(questions);
quizApp();
// console.log(quiz);
