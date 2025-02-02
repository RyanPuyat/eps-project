import axios from 'axios';
class Reading {
  constructor() {
    // console.log('test');
    window.onload = function () {
      const modal = new bootstrap.Modal(document.getElementById('myModal'));
      modal.show();
    };
    document.getElementById('submit').style.display = 'none';
    this.questions = [];
    this.usedQuestions = [];
    this.score = 0;
    this.currentQuestionIndex = 0;

    this.questionEl = document.getElementById('question');
    this.image = document.getElementById('image');
    this.choices = document.querySelectorAll('.answer');
    this.categoryDropdown = document.getElementById('dropdown-item');
    this.categoryDropdown.options[0].text = 'Select Category';
    this._apiUrl = 'http://localhost:5000';

    document
      .getElementById('submit')
      .addEventListener('click', this.answer.bind(this));
    document
      .getElementById('dropdown-item')
      .addEventListener('change', this.handleCategoryChange.bind(this));
  }

  async handleCategoryChange() {
    this.selectedCategory = document.getElementById('dropdown-item').value;
    this.usedQuestions = [];
    this.score = 0;
    this.currentQuestionIndex = 0;
    document.getElementById('submit').style.display = 'block';
    this.fetchQuestions();
  }

  async fetchQuestions() {
    try {
      const selectedCategory = document.getElementById('dropdown-item').value;
      const res = await axios.get(`${this._apiUrl}/api/${selectedCategory}`);
      this.questions = res.data.data;
      this._getNewQuestions();
      console.log(this.questions);
    } catch (error) {
      console.log(error);
    }
  }

  getRandomQuestionIndex() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.questions.length);
    } while (this.usedQuestions.includes(randomIndex));
    this.usedQuestions.push(randomIndex);
    return randomIndex;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  _getNewQuestions() {
    this.clearChoices();
    const questionIndex = this.getRandomQuestionIndex();
    const currentQuestion = this.questions[questionIndex];

    this.questionEl.innerText = currentQuestion.question;
    this.image.innerHTML = `<img src="${currentQuestion.image}">`;

    const shuffledChoices = [...currentQuestion.choices];
    this.shuffle(shuffledChoices);

    shuffledChoices.forEach((choice) => {
      const choicesContainer = document.getElementById('choices');
      const choiceEl = document.createElement('div');
      choiceEl.classList.add('form-check', 'mb-3');

      if (choice.choiceImageUrl) {
        choiceEl.innerHTML = `
          <img src="${choice.choiceImageUrl}"> 
          <input class="form-check-input me-3 choice-prefix answer" type="radio" name="choices" value="${choice.choiceText}">
          <label class="form-check-label " data-number="1" id="a_text" for="a">
            ${choice.choiceText}
          </label>
        `;
      } else {
        choiceEl.innerHTML = `<input class="form-check-input me-3 choice-prefix answer" type="radio" name="choices" value="${choice}">
        <label class="form-check-label " data-number="1" id="a_text" for="a">
        <h5><strong>${choice}</strong></h5>
        </label>`;
      }

      choicesContainer.appendChild(choiceEl);
    });
    this.progressNumber();
  }

  clearChoices() {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
  }

  progressBar() {
    const progress = document.getElementById('exam-progress');
    progress.classList.add('progress-bar-striped');
    progress.classList.add('progress-bar-animated');

    const percent = (this.currentQuestionIndex / this.questions.length) * 100;
    // console.log(percent);

    const width = percent;

    progress.style.width = `${width}%`;
  }

  progressNumber() {
    const numberEl = document.getElementById('exam-number');
    numberEl.innerHTML = `<h5>${this.currentQuestionIndex + 1} of ${
      this.questions.length
    }</h5>`;
  }

  answer() {
    const selectedOption = document.querySelector(
      'input[name="choices"]:checked'
    );
    if (!selectedOption) {
      alert('Please select an answer.');
      return;
    }

    if (selectedOption) {
      const answer = selectedOption.value;
      const currentQuestion =
        this.questions[this.usedQuestions[this.currentQuestionIndex]];
      // console.log(currentQuestion);
      const correctAnswer = currentQuestion.answer;
      console.log(correctAnswer);
      if (answer === correctAnswer) {
        this.score++;
        console.log(this.score);
      }

      this.currentQuestionIndex++;
      console.log(this.currentQuestionIndex);
      this.progressBar();
      if (this.currentQuestionIndex < this.questions.length) {
        this._getNewQuestions();
      } else {
        this.showResult();
      }
    }
  }

  showResult() {
    document.getElementById('category').style.display = 'none';
    document.getElementById('image').style.display = 'none';
    document.getElementById('choices').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
    this.categoryDropdown.value = '';
    this.categoryDropdown.disabled = true;
    const quizEl = document.getElementById('quiz');
    const div = document.createElement('div');
    div.classList.add('my-3');
    div.innerHTML = `<div class="my-3 text-center ">
            <h2 class="mx=auto" >You score ${this.score}/${this.questions.length}</h2>
        </div>

    <div class="d-grid col-6 mx-auto mt-5">
          <button onclick="location.reload()" class="btn btn-secondary" type="button">Reload</button>
    </div>`;
    quizEl.appendChild(div);
  }
}

export default Reading;
