const commonPatterns = ['1234', 'password', 'admin', 'qwerty', 'letmein', 'welcome'];

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required and must be a string.' });
  }

  let strengthPoints = 0;
  const suggestions = [];

  if (password.length >= 12) strengthPoints++;
  else suggestions.push('Add more characters');

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strengthPoints++;
  else suggestions.push('Use both uppercase and lowercase letters');

  if (/\d/.test(password)) strengthPoints++;
  else suggestions.push('Include numbers');

  if (/[^A-Za-z0-9]/.test(password)) strengthPoints++;
  else suggestions.push('Include special symbols');

  const containsCommonPattern = commonPatterns.some(p => password.toLowerCase().includes(p));
  if (containsCommonPattern) suggestions.push('Avoid common patterns');
  else strengthPoints++;

  let strength = 'Weak';
  if (strengthPoints >= 4) strength = 'Strong';
  else if (strengthPoints === 3) strength = 'Medium';

  return res.status(200).json({ password, strength, suggestions });
};
