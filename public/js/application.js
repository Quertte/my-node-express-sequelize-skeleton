// forms
const formRegistration = document.querySelector('#formRegistration');
const formLogin = document.querySelector('#formLogin');

// inputs
const pass = document.querySelector('#regPassword');
const confPass = document.querySelector('#regConfirmPassword');
const loginPassword = document.querySelector('#loginPassword');

// Sections
const feedback = document.querySelector('#feedback');
const cardList = document.querySelector('#cardList');

function validate() {
  if (pass.value !== confPass.value) {
    pass.classList.add('invalid-input');
    confPass.classList.add('invalid-input');
    feedback.textContent = 'Passwords are not the same';
    feedback.style.display = 'block';
    return false;
  }

  pass.classList.remove('invalid-input');
  confPass.classList.remove('invalid-input');
  feedback.style.display = 'none';
  return true;
}

if (formRegistration) {
  formRegistration.addEventListener('submit', async (event) => {
    // отмена дефолтного поведения формы
    event.preventDefault();

    // формирование переменных через деструктуризацию
    const {
      method, action, username, email, password,
    } = event.target;

    // условие при прохождении валидации
    if (validate()) {
      // инициализация запроса и формирование ответа
      const response = await fetch(action, {
        method,
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
      });

      // распаковка ответа в формате JSON
      const data = await response.json();

      // клиентский редиект на URL полученный из ответа сервера + обработка ошибки дубликата почты
      if (data.registration) {
        window.location.href = data.url;
      } else {
        feedback.textContent = data.message;
        feedback.style.display = 'block';
      }
    }
  });
}

if (formLogin) {
  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    // формирование переменных через деструктуризацию
    const {
      method, action, email, password,
    } = event.target;

    const response = await fetch(action, {
      method,
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    // распаковка ответа в формате JSON
    const data = await response.json();

    // клиентский редирект на URL полученный из ответа сервера + обработка ошибки отсутствия почты в БД
    if (!data.login) {
      feedback.textContent = data.message;
      feedback.style.display = 'block';
    } else {
      window.location.href = data.url;
    }
  });
}
