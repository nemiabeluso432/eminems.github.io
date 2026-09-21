// Resume Knowledge Base para sa AI
const resumeData = {
  name: "Eminems",
  role: "Web Developer / IT Specialist",
  skills: "HTML, CSS, JavaScript, React, TypeScript, Git, at Livestreaming Operations.",
  projects: "Space Survival Game at ang Portfolio Website na ito.",
  contact: "Maaari mo siyang ma-contact sa email: yourname@email.com",
  about: "Si Eminems ay isang mabilis matuto na IT specialist na nakatutok sa modernong web design at system management."
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

// Simple AI Keyword Matcher
function getAIResponse(input) {
  if (input.includes("skill") || input.includes("kasanayan") || input.includes("marunong")) {
    return `Ang mga pangunahing skills ni Eminems ay: ${resumeData.skills}`;
  } else if (input.includes("project") || input.includes("gawa") || input.includes("portfolio")) {
    return `Ilan sa mga ginawa ni Eminems ay: ${resumeData.projects}`;
  } else if (input.includes("contact") || input.includes("email") || input.includes("paano makipag-ugnayan")) {
    return resumeData.contact;
  } else if (input.includes("sino") || input.includes("tungkol") || input.includes("about")) {
    return resumeData.about;
  } else {
    return "Pasensya na, hindi ko sigurado 'yan. Pwede mo akong tanungin tungkol sa skills, projects, o contact info ni Eminems!";
  }
}