const createFileCard = (file) => {
  const fileCard = document.createElement('div');
  fileCard.classList.add('file-card');
  fileCard.id = file._id;
  fileCard.innerHTML = `
  <div class="left-side">
    <img src="./images/icon-document.svg" alt="" />
    <a class="file-name" href="${file.path}" target="_blanc">${file.name}.${file.format}</a>
  </div>
  <div class="buttons">
    <button class="remove-button">remove</button>
    <a href="${file.path}" download>download</a>
  </div>`;

  return fileCard;
};

const removeFileHandler = async (card) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/files/${card.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    card.remove();
  } catch (error) {
    console.error(error);
  }
};

// const openDocument = async (e) => {
//   try {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       registerSection.style.display = 'block';
//       return;
//     }

//     // const response = await fetch(`${BASE_URL}`);

//     const path = e.target.dataset?.path || e.target.parentElement.dataset?.path;

//     window.location.pathname = path;
//   } catch (error) {
//     console.error(error);
//   }
// };

const displayFiles = async (e) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      return toggleRegisterForm(true);
    }

    const response = await fetch(`${BASE_URL}/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      response.status === 401 && toggleRegisterForm(true);
      throw new Error(response.statusText);
    }

    const { data } = await response.json();

    const filesContainer = document.querySelector('.files');

    data.length === 0
      ? (filesContainer.innerHTML = 'No Files')
      : (filesContainer.innerHTML = '');

    data.forEach((file) => {
      const card = createFileCard(file);
      const removeButton = card.querySelector('.remove-button');
      removeButton.onclick = () => removeFileHandler(card);
      filesContainer.append(card);
    });

    toggleDisplayPopup(true);

    const closeButton = popup.querySelector('.close-button');

    closeButton.onclick = () => toggleDisplayPopup(false);
  } catch (error) {
    console.error(error);
  }
};

const uploadFile = async (e) => {
  const token = localStorage.getItem('token');
  const fileInput = document.getElementById('file-input');

  fileInput.onchange = async () => {
    if (!token) {
      return toggleRegisterForm(true);
    }

    uploadIcon.style.display = 'none';
    loadingIcon.style.display = 'block';

    try {
      const form = document.getElementById('file-upload-form');

      const url = new URL(form.action);
      const method = form.method;
      // get file
      const formData = new FormData(form);

      // send file
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      await response.json();

      loadingIcon.style.display = 'none';
      successIcon.style.display = 'block';

      setTimeout(() => {
        successIcon.style.display = 'none';
        uploadIcon.style.display = 'block';
      }, 5000);
    } catch (error) {
      console.error(error);
      loadingIcon.style.display = 'none';
      failedIcon.style.display = 'block';
      setTimeout(() => {
        failedIcon.style.display = 'none';
        uploadIcon.style.display = 'block';
      }, 5000);
    }
  };
};

// listeners
// documentButton.onclick = (e) => openDocument(e);

folderButton.onclick = async (e) => await displayFiles(e);

uploadButton.onclick = async (e) => await uploadFile(e);
