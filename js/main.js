const OPENAI_API_KEY = "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"; // Usa una variable segura o archivo .env

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatbox = document.getElementById('chatbox');
    const message = userInput.value.trim();

    if (message === '') return;

    // Función para agregar mensajes al chatbox
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerHTML = `<div class="text">${text}</div>`;
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight; // Desplazar al último mensaje
    };

    // 1. Agregar mensaje del usuario
    addMessage(message, 'user');

    // 2. Deshabilitar input mientras se espera respuesta
    userInput.disabled = true;

    try {
        // 3. Llamada a la API de OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: message }]
            })
        });

        if (!response.ok) throw new Error("Failed to fetch response");

        const data = await response.json();
        const botResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";

        // 4. Agregar respuesta del chatbot
        addMessage(botResponse, 'agent');
    } catch (error) {
        console.error("Error fetching response:", error);
        addMessage("An error occurred while fetching the response. Please try again.", 'agent');
    } finally {
        // 5. Limpiar input y reactivar
        userInput.value = '';
        userInput.disabled = false;
    }
}
