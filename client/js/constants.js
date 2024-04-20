const documentButton = document.getElementById('document-button');
const folderButton = document.getElementById('folder-button');
const uploadButton = document.getElementById('upload-button');

const loginSection = document.querySelector('.login');
const registerSection = document.querySelector('.register');

const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

const fyloCard = document.querySelector('.fylo-card');
const storageCard = document.querySelector('.storage-card');

const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');

const uploadIcon = document.getElementById('upload-icon');
const loadingIcon = document.getElementById('loading-icon');
const successIcon = document.getElementById('success-icon');
const failedIcon = document.getElementById('failed-icon');

const BASE_URL = 'http://localhost:3000/api/v1';