const express = require('express');
const bodyParser = require('body-parser');
const passwordRoutes = require('./routes/password');

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use('/check-password', passwordRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
