const name = document.body.dataset.assistantName || "LuminAI";
document.getElementById("name").textContent = name;
document.getElementById("btn").setAttribute("aria-label", `Talk to ${name}`);

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  utter.volume = 1;
  utter.lang = "en-GB";
  window.speechSynthesis.speak(utter);
}

function wishMe() {
  let hours = new Date().getHours();
  if (hours >= 0 && hours < 12) speak("Good Morning Sir");
  else if (hours >= 12 && hours < 16) speak("Good Afternoon Sir");
  else speak("Good Evening Sir");
}

window.addEventListener('load', wishMe);

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.onresult = (event) => {
  let transcript = event.results[event.resultIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  if (message.includes("hello") || message.includes("hey")) speak("Hello sir, what can I help you?");
  else if (message.includes("who are you")) speak("I am Virtual Assistant created by Hasib Hasan.");
  else if (message.includes("open youtube")) { speak("Opening Youtube"); window.open("https://www.youtube.com", "_blank"); }
  else if (message.includes("open google")) { speak("Opening Google"); window.open("https://www.google.com", "_blank"); }
  else if (message.includes("open facebook")) { speak("Opening Facebook"); window.open("https://www.facebook.com", "_blank"); }
  else if (message.includes("time")) speak(new Date().toLocaleTimeString());
  else if (message.includes("date")) speak(new Date().toLocaleDateString());
  else { 
    let finalText = "This is what I found on the internet regarding " + message;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${message}`, "_blank");
  }
}
