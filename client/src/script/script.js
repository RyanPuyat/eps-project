import '@fortawesome/fontawesome-free/css/all.css';
import Quiz from './exam';
import Reading from './reading';
import Listening from './listening';
import MailForm from './mailForm';
import Audio from '../components/audio';

const global = {
  currentPage: window.location.pathname,
};

//quiz
const startQuiz = () => {
  const quiz = new Quiz();
};

const reading = () => {
  const reading = new Reading();
};

const listening = () => {
  const listening = new Listening();
};
const form = () => {
  const form = new MailForm();
  form.render();
};

const audio = () => {
  const audioComponent = new Audio();
};

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      form();
      break;
    case '/exam.html':
      startQuiz();
      break;
    case '/reading.html':
      reading();
      break;
    case '/listening.html':
      listening();
    case '/listeningLearn.html':
      audio();
      break;
    default:
      console.warn('Unknown page:', global.currentPage);
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
