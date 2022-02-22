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
    "Le gardien lance le ballon devant lui pour le dégager au pied, de volée. Alors que le ballon est en lair, un attaquant le lui subtilise et marque. Décisions  ?",
    [
      "But accordé. Coup d’envoi.",
      "But refusé. Coup franc indirect pour la défense",
      "But refusé. Avertissement. Coup franc indirect pour la défense",
      "But refusé. Coup franc direct pour la défense",
    ],
    "But refusé. Coup franc indirect pour la défense"
  ),
  new Question(
    "Le tireur d’un penalty marque un temps d’arrêt dans sa course d’élan, la reprend surquelques foulées, tire et marque, Décisions  ?",
    [
      "But accordé.",
      "But refusé. Penalty à retirer",
      "But refusé. Penalty à retirer",
      "penalty a refaire",
    ],
    "But accordé."
  ),
  new Question(
    "Rentrée de touche A. Un adversaire B placé à un mètre dévie le ballon pour un de ses partenaires.Décisions ?",
    [
      "Laisser jouer",
      "Rentrée de touche à refaire pour A.",
      "Avertissement.Coup franc indirect A à l’endroit de B.",
      "Coup franc indirect A à l’endroit de B sans avertissement",
    ],
    "Rentrée de touche à refaire pour A."
  ),
  new Question(
    "Coup franc indirect pour l’attaque. Le tireur frappe au but. Le gardien plonge, touche le ballon, mais ne l’empêche pas d’entrer dans ses buts.Décisions ?",
    [
      "But accordé.;",
      "But refusé. CFI à retirer.",
      "But refusé. Corner.",
      "CFI à refaire;",
    ],
    "But accordé."
  ),
  new Question(
    "Penalty. Deux partenaires du tireur entrent nettement dans la surface de réparation avant le tir. Le ballon est dévié en corner par le gardien.Décisions  ?",
    [
      "Penalty à retirer.",
      "Corner",
      "Coup franc indirect pour la défense.",
      "Coup franc direct pour la défense.",
    ],
    "Coup franc indirect pour la défense."
  ),
  new Question(
    "Epreuve des tirs au but. Le capitaine A gagne le toss.Qui commence à tirer ?",
    [
      "L’équipe A obligatoirement. ",
      "L’équipe B obligatoirement.",
      "A ou B selon le choix du capitaine A",
      "A ou B selon le choix du capitaine B",
    ],
    "A ou B selon le choix du capitaine A "
  ),
  new Question(
    "Un attaquant crie « laisse ! » à un partenaire moins bien placé que lui, reprend le ballon et marque.Décisions ?",
    [
      "But accordé.",
      "But refusé. Coup franc indirect pour la défense.",
      "But refusé. Coup franc direct pour la défense.",
      "Coup franc indirect dans la surface de réparation ",
    ],
    "But accordé."
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
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  endQuiz: function () {
    endQuizHTML = `
    <h1>Quiz Terminé !</h1>
        <h3>votre score est : ${quiz.score} / ${quiz.questions.length}</h3>
        `;

    this.elementShown("quiz", endQuizHTML);
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    for (let index = 0; index < choices.length; index++) {
      this.elementShown("choice" + index, choices[index]);
      guessHandler("guess" + index, choices[index]);
    }
  },
  progress: function () {
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
