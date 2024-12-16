async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        const chatbox = document.getElementById('chatbox');

        // Agregar mensaje del usuario
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        const userText = document.createElement('div');
        userText.classList.add('text');
        userText.innerText = userInput;
        userMessage.appendChild(userText);
        chatbox.appendChild(userMessage);

        // Llamada a la API de OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{role: "user", content: userInput}]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        // Agregar respuesta del chatbot
        const agentMessage = document.createElement('div');
        agentMessage.classList.add('message', 'agent');
        const agentText = document.createElement('div');
        agentText.classList.add('text');
        agentText.innerText = botMessage;
        agentMessage.appendChild(agentText);
        chatbox.appendChild(agentMessage);

        // Limpiar entrada de usuario
        document.getElementById('user-input').value = '';

        // Desplazar al último mensaje
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}
