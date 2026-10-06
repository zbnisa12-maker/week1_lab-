const practiceForm = document.getElementById("practice-form");
const quizForm = document.getElementById("quiz-form");

if (practiceForm) {
  practiceForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const answers = ["h1", "href", "li"];
    let score = 0;

    for (let i = 0; i < answers.length; i++) {
      const input = document.getElementById("answer-" + (i + 1));
      const feedback = document.getElementById("feedback-" + (i + 1));
      const answer = input.value.trim().toLowerCase();

      if (answer === answers[i]) {
        score++;
        feedback.textContent = "Correct!";
        feedback.className = "feedback correct";
      } else {
        feedback.textContent = "Not quite. Check the lesson and try again.";
        feedback.className = "feedback wrong";
      }
    }

    document.getElementById("practice-result").textContent = "Your score: " + score + " / 3.";
  });

  practiceForm.addEventListener("reset", function () {
    document.getElementById("practice-result").textContent = "";
    practiceForm.querySelectorAll(".feedback").forEach(function (text) {
      text.textContent = "";
    });
  });
}

if (quizForm) {
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const answers = ["p", "href", "body", "li", "alt"];
    const choices = new FormData(quizForm);
    let score = 0;

    for (let i = 0; i < answers.length; i++) {
      const feedback = document.getElementById("quiz-feedback-" + (i + 1));

      if (choices.get("q" + (i + 1)) === answers[i]) {
        score++;
        feedback.textContent = "Correct!";
        feedback.className = "feedback correct";
      } else {
        feedback.textContent = "Correct answer: " + answers[i] + ".";
        feedback.className = "feedback wrong";
      }
    }

    document.getElementById("quiz-result").textContent = "Your score: " + score + " / 5.";
  });

  quizForm.addEventListener("reset", function () {
    document.getElementById("quiz-result").textContent = "";
    quizForm.querySelectorAll(".feedback").forEach(function (text) {
      text.textContent = "";
    });
  });
}
