const chatBox = document.getElementById("chat");
const sendBtn = document.getElementById("send");
const messageInput = document.getElementById("message");
const senderInput = document.getElementById("sender");
const receiverInput = document.getElementById("receiver");

// Connect to WebSocket server
const socket = new WebSocket("ws://localhost:4000");

socket.onopen = () => console.log("Connected to WebSocket server");

socket.onmessage = (event) => {
    const messages = JSON.parse(event.data); // array of messages
    messages.forEach(msg => {
        // Only show if current sender/receiver matches (1:1 chat)
        const currentSender = senderInput.value;
        const currentReceiver = receiverInput.value;
        if (
            (msg.sender === currentSender && msg.receiver === currentReceiver) ||
            (msg.sender === currentReceiver && msg.receiver === currentSender)
        ) {
            const p = document.createElement("p");
            p.textContent = `${msg.sender}: ${msg.message}`;
            p.className = "border p-1 my-1 rounded bg-gray-100";
            chatBox.appendChild(p);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });
};

sendBtn.addEventListener("click", () => {
    const sender = senderInput.value.trim();
    const receiver = receiverInput.value.trim();
    const message = messageInput.value.trim();
    if (!sender || !receiver || !message) return;

    const msgObj = { sender, receiver, message };
    socket.send(JSON.stringify(msgObj));
    messageInput.value = "";
});

// Enter press to send
messageInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
});
