const express = require('express');
const router = express.Router();
const checkPasswordStrength = require('../services/passwordService');

router.post('/', (req, res) => {
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required and must be a string.' });
  }

  const result = checkPasswordStrength(password);
  res.status(200).json(result);
});

module.exports = router;
