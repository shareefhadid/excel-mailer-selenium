// Modules
const express = require("express");
// Scripts
const mailListener = require("./scripts/mailListener");

// Setup express
const app = express();

// Start mail listener
mailListener()

// Expose port and listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));