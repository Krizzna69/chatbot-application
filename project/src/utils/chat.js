export function addMessage(chatMessages, text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = sender === 'user' ? 'U' : 'G';
  
  const content = document.createElement('div');
  content.className = 'content';
  content.textContent = text;
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  chatMessages.appendChild(messageDiv);
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

export function clearInput(userInput) {
  userInput.value = '';
  userInput.style.height = 'auto';
}