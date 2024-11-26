const GEMINI_API_KEY = 'AIzaSyD5rzF7pRWfPsWIBzNeOMTp8SBfqHSJk-k'; // Replace with your actual API key

async function generateResponse(prompt) {
    if (!GEMINI_API_KEY) {
        return 'Please set your Gemini API key in config.js before using the chat.';
    }

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        
        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error('Invalid response format');
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('API key')) {
            return 'Invalid API key. Please check your API key in config.js';
        }
        return 'An error occurred. Please try again later.';
    }
}