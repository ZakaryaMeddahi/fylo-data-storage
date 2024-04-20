const registerButton = document.getElementById('register');
const cancelRegister = document.getElementById('cancel-register');

registerButton.onclick = async (e) => {
  try {
    e.preventDefault();
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');

    const isValid = validateInput(emailInput, passwordInput);

    if (!isValid) {
      return;
    }

    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    const response = await fetch(`${BASE_URL}/auth/register`, {
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

    toggleRegisterForm(false);
  } catch (error) {
    console.error(error);
  }
};

cancelRegister.onclick = (e) => {
  e.preventDefault();
  toggleRegisterForm(false);
};

loginLink.onclick = (e) => {
  e.preventDefault();
  registerSection.style.display = 'none';
  loginSection.style.display = 'flex';
};
