import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
app.use(
  cors({
    origin: 'https://your-vercel-app.vercel.app',
    methods: ['GET', 'POST'],
  })
);
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
// test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running ' });
});

// Analyze job route
app.post('/analyze-job', async (req, res) => {
  const { jobDesc } = req.body;
  if (!jobDesc) {
    return res.status(400).json({ error: 'Job description is required' });
  }
  try {
    const prompt = `You are a career assistant. Analyze this job description and respond ONLY in JSON with these exact keys:
      - title (string)
      - company (string, or "Not specified")
      - language (string: German or English or Both)
      - difficulty (string: Easy or Medium or Hard)
      - germanLevel (string: required level like A1/B2 or "Not required")
      - summary (string, 2 sentences in English)
      - keySkills (array of 5 strings)
      - requirements (array of 4 strings)
      Return ONLY the JSON object, no extra text, no markdown.
      Job Description: ${jobDesc}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Match Resume Route
app.post('/match-resume', async (req, res) => {
  const { jobDesc, resume } = req.body;

  if (!jobDesc || !resume) {
    return res
      .status(400)
      .json({ error: 'Job description and resume are required' });
  }

  try {
    const prompt = `You are a resume coach for developers applying to German companies.
      Compare this job description and resume and respond ONLY in JSON with these exact keys:
      - score (number 0-100)
      - verdict (string: Strong Match or Good Match or Partial Match or Weak Match)
      - matchedSkills (array of strings)
      - missingSkills (array of strings)
      - suggestions (array of exactly 3 strings, each being a specific improvement tip)
      Return ONLY the JSON object, no extra text, no markdown.

      Job Description: ${jobDesc}
      
      Resume: ${resume}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Add these logs
    console.log('Raw Gemini response:', text);

    const clean = text.replace(/```json|```/g, '').trim();
    console.log('Cleaned response:', clean);

    const parsed = JSON.parse(clean);
    res.json(parsed);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});
// Cover Letter Route
app.post('/cover-letter', async (req, res) => {
  const { jobDesc, resume, language } = req.body;

  if (!jobDesc || !resume) {
    return res
      .status(400)
      .json({ error: 'Job description and resume are required' });
  }

  try {
    let prompt = '';

    if (language === 'english') {
      prompt = `Write a professional cover letter in English only.
        Return ONLY JSON with key: english (string)
        Job: ${jobDesc}
        Resume: ${resume}`;
    } else if (language === 'german') {
      prompt = `Write a professional cover letter in German only.
        Return ONLY JSON with key: german (string)
        Job: ${jobDesc}
        Resume: ${resume}`;
    } else {
      prompt = `Write a professional cover letter in both English and German.
        Return ONLY JSON with keys: english (string), german (string)
        Job: ${jobDesc}
        Resume: ${resume}`;
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});
// Cover Letter Route
app.post('/cover-letter', async (req, res) => {
  const { jobDesc, resume, language } = req.body;

  if (!jobDesc || !resume) {
    return res
      .status(400)
      .json({ error: 'Job description and resume are required' });
  }

  try {
    let prompt = '';

    if (language === 'english') {
      prompt = `Write a professional cover letter in English only.
        Return ONLY JSON with key: english (string)
        Job: ${jobDesc}
        Resume: ${resume}`;
    } else if (language === 'german') {
      prompt = `Write a professional cover letter in German only.
        Return ONLY JSON with key: german (string)
        Job: ${jobDesc}
        Resume: ${resume}`;
    } else {
      prompt = `Write a professional cover letter in both English and German.
        Return ONLY JSON with keys: english (string), german (string)
        Job: ${jobDesc}
        Resume: ${resume}`;
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
