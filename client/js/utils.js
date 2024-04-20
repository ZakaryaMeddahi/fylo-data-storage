const toggleDisplayPopup = (isDisplayed) => {
  fyloCard.style.display = isDisplayed ? 'none' : 'block';
  storageCard.style.display = isDisplayed ? 'none' : 'block';
  popup.style.display = isDisplayed ? 'flex' : 'none';
};

const toggleRegisterForm = (isDisplayed) => {
  fyloCard.style.display = isDisplayed ? 'none' : 'block';
  storageCard.style.display = isDisplayed ? 'none' : 'block';
  registerSection.style.display = isDisplayed ? 'flex' : 'none';
};

const toggleLoginForm = (isDisplayed) => {
  fyloCard.style.display = isDisplayed ? 'none' : 'block';
  storageCard.style.display = isDisplayed ? 'none' : 'block';
  loginSection.style.display = isDisplayed ? 'flex' : 'none';
};

const validateInput = (emailInput, passwordInput) => {
  let isValid = true;
  const email = emailInput.value;
  const password = passwordInput.value;

  if (email === '') {
    emailInput.style.borderColor = 'red';
    isValid = false;
  } else {
    emailInput.style.borderColor = 'hsl(243, 100%, 93%)';
  }

  if (password === '') {
    passwordInput.style.borderColor = 'red';
    isValid = false;
  } else {
    passwordInput.style.borderColor = 'hsl(243, 100%, 93%)';
  }

  return isValid;
};
