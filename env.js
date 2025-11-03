// This file is for local development.
// It allows you to provide your Gemini API key without modifying the main application code.

window.process = {
  env: {
    // IMPORTANT: Replace "YOUR_GEMINI_API_KEY_HERE" with your actual Gemini API key.
    API_KEY: "YOUR_GEMINI_API_KEY_HERE"
  }
};
