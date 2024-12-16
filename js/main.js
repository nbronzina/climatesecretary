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

    // Keywords and responses related to the secretariat
    const heatKeywords = ['heat', 'hot', 'temperature', 'warm'];
    const coolKeywords = ['cool', 'chill', 'fresh'];
    const coldKeywords = ['cold', 'freeze', 'frost', 'icy'];
    const floodKeywords = ['floods', 'flooding', 'water levels', 'storms'];
    const snowKeywords = ['snow', 'snowfall', 'blizzard', 'ice'];

    // Response logic based on keywords
    if (heatKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "The Secretariat is actively working on heat resilience measures. Would you like information about heat shelters, public cooling areas, or urban adaptation projects?";
    } else if (coolKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "We can provide information about shaded areas, green corridors, or cooling strategies implemented by the Secretariat to combat extreme heat. Would you like more details?";
    } else if (coldKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "While our main focus is on heat and drought, the Secretariat also works on year-round climate preparedness. Do you need advice on cold weather strategies or emergency services?";
    } else if (floodKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "Flood resilience is a key area for the Secretariat. Are you looking for flood risk maps, emergency response plans, or community preparedness resources?";
    } else if (snowKeywords.some(keyword => lowerCaseInput.includes(keyword))) {
        return "Snow events are less frequent in our area of focus, but we can share guidelines on urban adaptation to changing weather patterns. Would you like details about snow-specific measures?";
    } else {
        // Generic response for open-ended questions
        return "Thank you for reaching out to the Secretariat. Could you clarify your question or specify the type of information you need? We're here to help with heat, drought, and climate resilience efforts.";
    }
}
