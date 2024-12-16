const OPENAI_API_KEY = "TU_API_KEY"; // Usa una variable segura o archivo .env

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
                'Authorization': `Bearer ${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}`
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
