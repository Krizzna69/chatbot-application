document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const promptBtns = document.querySelectorAll('.prompt-btn');
    const newChatBtn = document.getElementById('newChatBtn');

    // Check API key on load
    (async function checkApiKey() {
        const response = await generateResponse('test');
        if (response.includes('API key')) {
            addMessage(response, 'assistant');
            welcomeScreen.style.display = 'none';
            userInput.disabled = true;
            sendBtn.disabled = true;
        }
    })();

    // Auto-resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // Handle message sending
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        try {
            // Hide welcome screen
            welcomeScreen.style.display = 'none';
            
            // Add user message
            addMessage(message, 'user');
            
            // Show loading state
            sendBtn.disabled = true;
            userInput.disabled = true;
            
            // Get AI response
            const response = await generateResponse(message);
            
            // Add AI response to chat
            if (response) {
                addMessage(response, 'assistant');
            }

            // Reset input state
            sendBtn.disabled = false;
            userInput.disabled = false;
            
            // Only clear input if no API key error
            if (!response.includes('API key')) {
                clearInput();
            }
        } catch (error) {
            console.error('Chat error:', error);
            addMessage('An error occurred. Please try again.', 'assistant');
            sendBtn.disabled = false;
            userInput.disabled = false;
        }
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    promptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userInput.value = btn.textContent;
            sendMessage();
        });
    });

    newChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = '';
        welcomeScreen.style.display = 'flex';
        clearInput();
    });
});