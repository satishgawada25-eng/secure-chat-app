const socket = io("http://localhost:5000");

// Secret key for AES encryption
const SECRET_KEY = "MY_SUPER_SECRET_KEY";

// Encrypt message
function encryptMessage(message) {
    return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
}

// Decrypt message
function decryptMessage(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);

    return bytes.toString(CryptoJS.enc.Utf8);
}

// Send message
function sendMessage() {

    const input = document.getElementById("messageInput");

    // Get message text
    const message = input.value;

    // Prevent empty messages
    if(message.trim() === "") return;

    // Encrypt message
    const encrypted = encryptMessage(message);

    // Show encrypted text in browser console
    console.log("Encrypted Message:", encrypted);

    // Send encrypted message to server
    socket.emit("send-message", encrypted);

    // Display original message in chat
    addMessage("You: " + message);

    // Clear input box
    input.value = "";
}

// Receive encrypted message
socket.on("receive-message", (data) => {

    console.log("Received Encrypted:", data);

    // Decrypt received message
    const decrypted = decryptMessage(data);

    // Display decrypted message
    addMessage("Friend: " + decrypted);
});

// Add message to chat window
function addMessage(message) {

    const div = document.createElement("div");

    div.style.marginBottom = "10px";

    div.innerText = message;

    document.getElementById("messages").appendChild(div);
}