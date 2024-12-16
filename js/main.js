function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        const chatbox = document.getElementById('chatbox');

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        const userText = document.createElement('div');
        userText.classList.add('text');
        userText.innerText = userInput;
        userMessage.appendChild(userText);
        chatbox.appendChild(userMessage);

        // Generate dynamic assistant response
        const agentResponse = getAgentResponse(userInput);

        const agentMessage = document.createElement('div');
        agentMessage.classList.add('message', 'agent');
        const agentText = document.createElement('div');
        agentText.classList.add('text');
        agentText.innerText = agentResponse;
        agentMessage.appendChild(agentText);
        chatbox.appendChild(agentMessage);

        // Clear user input
        document.getElementById('user-input').value = '';

        // Scroll to the latest message
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

function getAgentResponse(userInput) {
    // Convert user input to lowercase for easier keyword detection
    const lowerCaseInput = userInput.toLowerCase();

    // Keywords and responses
    const heatKeywords = ['heat', 'hot', 'temperature', 'warm'];
    const coolKeywords = ['cool', 'chill', 'fresh'];
    const coldKeywords = ['cold', 'freeze', 'frost', 'icy'];
    const floodKeywords = ['floods', 'flooding', 'water levels', 'storms'];
    const snowKeywords = ['snow', 'snowfall', 'blizzard', 'ice'];

    // Response logic based on keywords
    if (heatKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "Extreme heat can be challenging. Are you looking for ways to stay cool or information about heat alerts?";
    } else if (coolKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "Cool spots are essential during heat waves. Would you like to know about shaded areas or cooling centers nearby?";
    } else if (coldKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "Cold weather can bring its own challenges. Do you need advice on staying warm or information about winter preparedness?";
    } else if (floodKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "Flooding is a serious concern. Are you asking about flood preparedness or specific flood alerts?";
    } else if (snowKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "Snow can be both beautiful and dangerous. Would you like tips for dealing with snow or travel advice in snowy conditions?";
    } else {
        // Generic response for open-ended questions
        return "Thank you for your question. Could you provide more details so I can assist you better?";
    }
}
