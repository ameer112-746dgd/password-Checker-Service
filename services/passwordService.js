const commonPatterns = require('../utils/commonPatterns');

function checkPasswordStrength(password) {
  const suggestions = [];
  let strengthPoints = 0;

  // Length
  if (password.length >= 12) {
    strengthPoints++;
  } else {
    suggestions.push('Add more characters');
  }

  // Uppercase and lowercase
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    strengthPoints++;
  } else {
    suggestions.push('Use both uppercase and lowercase letters');
  }

  // Numbers
  if (/\d/.test(password)) {
    strengthPoints++;
  } else {
    suggestions.push('Include numbers');
  }

  // Special characters
  if (/[^A-Za-z0-9]/.test(password)) {
    strengthPoints++;
  } else {
    suggestions.push('Include special symbols');
  }

  // Common patterns
  const lowered = password.toLowerCase();
  const containsCommonPattern = commonPatterns.some(pattern => lowered.includes(pattern));
  if (containsCommonPattern) {
    suggestions.push('Avoid common patterns');
  } else {
    strengthPoints++;
  }

  // Determine strength
  let strength = 'Weak';
  if (strengthPoints >= 4) strength = 'Strong';
  else if (strengthPoints === 3) strength = 'Medium';

  return {
    password,
    strength,
    suggestions
  };
}

module.exports = checkPasswordStrength;
