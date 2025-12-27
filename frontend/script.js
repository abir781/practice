const inputholder = document.getElementById("textholder");
const senderbtn = document.getElementById("sender");
const holder = document.getElementById("containerofmessage");
const deletebtn = document.getElementById("clearbutton");

// Render all messages
async function renderMessages() {
    const res = await fetch("http://localhost:4000/message");
    const data = await res.json();

    holder.innerHTML = ""; // clear previous messages

    data.forEach(item => {
        const para = document.createElement("p");
        para.textContent = item.message;
        para.className = "border p-2 my-1 rounded bg-gray-100";
        holder.appendChild(para);
    });

    // scroll to bottom
    holder.scrollTop = holder.scrollHeight;
}

// Send message
senderbtn.addEventListener("click", async () => {
    const text = inputholder.value.trim();
    if (!text) return;

    await fetch("http://localhost:4000/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    inputholder.value = "";
    renderMessages();
});

// Enter key support
inputholder.addEventListener("keypress", (e) => {
    if (e.key === "Enter") senderbtn.click();
});

// Clear all messages
deletebtn.addEventListener("click", async () => {
    await fetch("http://localhost:4000/message", { method: "DELETE" });
    holder.innerHTML = "";
});

// Initial render
renderMessages();
setInterval(renderMessages, 2000);