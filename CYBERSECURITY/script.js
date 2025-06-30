const questions = [
  { q: "What is a strong password?", options: ["123456", "A mix of letters, numbers, and symbols"], answer: 1 },
  { q: "What is phishing?", options: ["A scam to steal personal information", "A method to speed up internet"], answer: 0 },
  { q: "What should you do with suspicious emails?", options: ["Click the link", "Report to IT team"], answer: 1 },
  { q: "What does HTTPS signify?", options: ["Secure connection", "High traffic"], answer: 0 },
  { q: "Two-factor authentication is used for?", options: ["Speeding login", "Extra security"], answer: 1 },
  { q: "What is malware?", options: ["A protective software", "Malicious software"], answer: 1 },
  { q: "What is a firewall?", options: ["Security system", "Game cheat tool"], answer: 0 },
  { q: "What is social engineering?", options: ["Coding technique", "Manipulating people to give up info"], answer: 1 },
  { q: "Best place to store passwords?", options: ["Plain text file", "Password manager"], answer: 1 },
  { q: "What is VPN used for?", options: ["Public broadcasting", "Secure private browsing"], answer: 1 },
  { q: "Antivirus software helps with?", options: ["Cooking", "Protecting from malicious programs"], answer: 1 },
  { q: "Why update software regularly?", options: ["For fun", "To patch security vulnerabilities"], answer: 1 },
  { q: "Should you use public Wi-Fi for banking?", options: ["Yes", "No"], answer: 1 },
  { q: "What is identity theft?", options: ["Stealing passwords", "Impersonating someone for fraud"], answer: 1 },
  { q: "How to recognize secure websites?", options: ["Look for HTTPS and lock icon", "Just check speed"], answer: 0 },
];

let timeLeft = 300;
let timer;

const form = document.getElementById('quizForm');
const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');

function updateProgress() {
  const answered = questions.filter((_, idx) => document.querySelector(`input[name=q${idx}]:checked`)).length;
  progressEl.innerText = `Progress: ${answered}/${questions.length}`;
}

questions.forEach((q, idx) => {
  const card = document.createElement('div');
  card.className = 'card p-3 mb-3';
  card.innerHTML = `<h5>Q${idx + 1}: ${q.q}</h5>` +
    q.options.map((opt, i) => `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="q${idx}" value="${i}" onchange="updateProgress()">
        <label class="form-check-label">${opt}</label>
      </div>`).join('');
  form.appendChild(card);
});

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    } else {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerEl.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      timeLeft--;
    }
  }, 1000);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function submitQuiz() {
  clearInterval(timer);
  let score = 0;
  const result = document.getElementById('result');
  result.innerHTML = "";

  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name=q${idx}]:checked`);
    const card = document.querySelectorAll('.card')[idx];
    if (selected) {
      const isCorrect = parseInt(selected.value) === q.answer;
      if (isCorrect) {
        score++;
        card.classList.add('border-success');
      } else {
        card.classList.add('border-danger');
        card.querySelectorAll('.form-check-label')[q.answer].classList.add('correct');
        selected.parentElement.querySelector('label').classList.add('incorrect');
      }
    }
  });

  result.innerHTML = `<h4>Your Score: ${score}/${questions.length}</h4>`;
}

function retryQuiz() {
  clearInterval(timer);
  timeLeft = 300;
  startTimer();
  document.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
  document.querySelectorAll('.card').forEach(c => {
    c.classList.remove('border-success', 'border-danger');
    c.querySelectorAll('label').forEach(l => l.classList.remove('correct', 'incorrect'));
  });
  document.getElementById('result').innerHTML = "";
  updateProgress();
}

window.onload = () => {
  updateProgress();
  startTimer();
};
