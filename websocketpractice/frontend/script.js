const sender = document.getElementById("button-sender");
const bavuma = document.getElementById("container");
const input = document.getElementById("text-holder");

const ws = new WebSocket("ws://localhost:5000");

ws.onopen = () => {
  console.log("✅ Connected to server");
};

ws.onmessage = async (event) => {
  const text = event.data instanceof Blob
    ? await event.data.text()
    : event.data;

  const li = document.createElement("li");
  li.textContent = text;
  li.className = "mb-1";
  bavuma.appendChild(li);
};

ws.onclose = () => {
  console.log("❌ Disconnected from server");
};

sender.addEventListener("click", () => {
  const message = input.value.trim();
  if (message) {
    ws.send(message); // send string
    input.value = "";
  }
});

// Enter key support
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sender.click();
});
