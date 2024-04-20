const loginButton = document.getElementById('login');
const cancelLogin = document.getElementById('cancel-login');

loginButton.onclick = async (e) => {
  try {
    e.preventDefault();

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    const isValid = validateInput(emailInput, passwordInput);

    if (!isValid) {
      return;
    }

    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { data } = await response.json();

    localStorage.setItem('token', data.token);

    toggleLoginForm(false);
  } catch (error) {
    console.error(error);
  }
};

cancelLogin.onclick = (e) => {
  e.preventDefault();
  toggleLoginForm(false);
};

registerLink.onclick = (e) => {
  e.preventDefault();
  loginSection.style.display = 'none';
  registerSection.style.display = 'flex';
};
