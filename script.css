// ----------------------------
// FRONTEND: main.js (public/main.js)
// ----------------------------

// --- DOM READY ---
document.addEventListener('DOMContentLoaded', function () {
  // Toggle Advanced Settings
  const toggleButton = document.getElementById('toggle-advanced');
  const advancedSettings = document.getElementById('advanced-settings');
  const arrow = toggleButton.querySelector('.arrow');

  toggleButton.addEventListener('click', function () {
    advancedSettings.classList.toggle('open');
    arrow.classList.toggle('open');

    toggleButton.innerHTML = advancedSettings.classList.contains('open')
      ? `<span class="arrow open">▾</span> HIDE VIDEO ADVANCED SETTINGS`
      : `<span class="arrow">▾</span> SHOW VIDEO ADVANCED SETTINGS`;
  });

  // Form Submission
  const form = document.getElementById('site-generator-form');
  const thankYouMessage = document.getElementById('thank-you-message');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const emailContact = document.getElementById('email-contact').value;
    const comments = document.getElementById('comments').value;
    const primaryColor = document.getElementById('primary-color').value;
    const template = document.getElementById('template').value;

    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'PROCESSING...';
    submitButton.disabled = true;

    if (!file) {
      alert("Please select a file before submitting.");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      return;
    }

    // Send metadata to backend (Firebase Function or API Gateway)
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', emailContact);
      formData.append('comments', comments);
      formData.append('primaryColor', primaryColor);
      formData.append('template', template);

      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('✅ Server response:', result);
    } catch (err) {
      console.error('❌ Upload failed:', err);
      alert("Upload failed. Please try again.");
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      return;
    }

    // Reset form
    fileInput.value = '';
    document.getElementById('email-contact').value = '';
    document.getElementById('comments').value = '';
    document.getElementById('primary-color').value = '#6A4AE8';
    document.getElementById('template').selectedIndex = 0;

    submitButton.textContent = originalText;
    submitButton.disabled = false;

    thankYouMessage.classList.add('thank-you-visible');
    thankYouMessage.classList.remove('thank-you-hidden');

    setTimeout(() => {
      thankYouMessage.classList.remove('thank-you-visible');
      thankYouMessage.classList.add('thank-you-hidden');
    }, 5000);
  });

  // Color preview
  const colorInput = document.getElementById('primary-color');
  colorInput.addEventListener('input', function () {
    document.querySelector('.progress-indicator').style.backgroundColor = this.value;
  });
});

window.addEventListener('load', function () {
  setTimeout(function () {
    document.querySelector('.video-preview').classList.add('loaded');
  }, 300);
});


// ----------------------------
// BACKEND: index.js (Firebase Function or Express server)
// ----------------------------

// Minimal backend logic (for Firebase Functions / Express API)

import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { readFile } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const app = express();
app.use(cors());

const upload = multer({ dest: tmpdir() });

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'video-creation1.appspot.com'
});

const bucket = getStorage().bucket();

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const destFileName = `uploads/${req.file.originalname}`;
    await bucket.upload(filePath, {
      destination: destFileName
    });
    console.log('✅ File uploaded:', destFileName);

    res.status(200).json({ success: true, message: 'File uploaded successfully.' });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
