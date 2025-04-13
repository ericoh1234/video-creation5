// back end file

import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'video-creation1.appspot.com' // must match your real bucket
});

const db = getFirestore();

// POST /submit
app.post('/submit', async (req, res) => {
  const { email, comments, template, fileName } = req.body;

  try {
    const docRef = await db.collection('submissions').add({
      email,
      comments,
      template,
      fileName,
      createdAt: new Date().toISOString()
    });

    console.log('✅ Submission stored:', docRef.id);
    res.status(200).json({ success: true, id: docRef.id });
  } catch (err) {
    console.error('❌ Error saving submission:', err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend API running at http://localhost:${PORT}`));
