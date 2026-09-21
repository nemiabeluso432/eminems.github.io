// Knowledge Base para kay Nemia Cocal Beluso
const resumeData = {
  name: "Nemia Cocal Beluso",
  role: "Photographer",
  skills: "HTML, Portrait & Landscape Photography, Photo Editing & Retouching, Visual Composition, at Color Grading.",
  projects: "Mga portfolio photos tulad ng Urban & Street Scapital, Portrait Series, at Nature Photography.",
  contact: "Maaari mo siyang ma-contact sa email: nemiabeluso432@gmail.com o mobile: 09062539548.",
  address: "1212 Gen. Luna St. Paco Manila"
};

const chatToggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const chatClose = document.getElementById("chat-close");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

// Toggle Chat Visibility
chatToggle.addEventListener("click", () => {
  chatBox.classList.remove("hidden");
  chatToggle.classList.add("hidden");
});

chatClose.addEventListener("click", () => {
  chatBox.classList.add("hidden");
  chatToggle.classList.remove("hidden");
});

// Send Message Handler
function handleSend() {
  const query = userInput.value.trim().toLowerCase();
  if (!query) return;

  // Display User Message
  appendMessage(userInput.value, "user-msg");
  userInput.value = "";

  // Process & Respond
  setTimeout(() => {
    const response = getAIResponse(query);
    appendMessage(response, "bot-msg");
  }, 500);
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});

function appendMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = className;
  msgDiv.innerText = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// AI Keyword Matcher
function getAIResponse(input) {
  if (input.includes("skill") || input.includes("kasanayan") || input.includes("marunong")) {
    return `Ang mga skills ni Nemia ay: ${resumeData.skills}`;
  } else if (input.includes("project") || input.includes("gawa") || input.includes("portfolio") || input.includes("picture") || input.includes("litrato")) {
    return `Ang ilan sa mga tampok na proyekto at kuha ni Nemia ay: ${resumeData.projects}`;
  } else if (input.includes("contact") || input.includes("email") || input.includes("number") || input.includes("paano makipag-ugnayan")) {
    return resumeData.contact;
  } else if (input.includes("address") || input.includes("tirahan") || input.includes("saan")) {
    return `Si Nemia ay matatagpuan sa ${resumeData.address}.`;
  } else if (input.includes("sino") || input.includes("tungkol") || input.includes("about") || input.includes("nemia")) {
    return `Si Nemia Cocal Beluso ay isang Photographer na may kasanayan din sa HTML at Photo Editing.`;
  } else {
    return "Pasensya na, hindi ko sigurado 'yan. Pwede mo akong tanungin tungkol sa skills, photography projects, address, o contact info ni Nemia!";
  }
}