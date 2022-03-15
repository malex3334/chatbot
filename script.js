"use strict";

const sendBtn = document.getElementById("send");
const inputTxt = document.getElementById("msg-input");
const newMessage = document.getElementById("msg-box");
const typingMsgEl = document.getElementById("typing-animation");
const miniBtnEl = document.getElementById("minmalizeBtn");
const closeBtnEl = document.getElementById("closeBtn");
const middleSec = document.getElementById("middle-section");
const lastSec = document.getElementById("last-section");
const firstSec = document.getElementById("first-section");

//TIMESTAMP
const date = new Date();
console.log(date.toTimeString().slice(0, 5));

// const minutes = getMinutes();
// const hours = getHours();

// const timeStamp = function() {
//   if ()
// }
//SOUNDS
function playBeep() {
  const beep = new Audio("beep.mp3");
  beep.play();
  beep.volume = 0.1;
}
function playPop() {
  const pop = new Audio("pop.mp3");
  pop.play();
  pop.volume = 0.3;
}
function playType() {
  const typeing = new Audio("type.mp3");
  typeing.play();
  typeing.volume = 0.3;
}

// REPLIES LIST! TO EXTEND!
const responsesArr = [
  "Cześć! Co słychać?",
  `U mnie ok, robię kurs JS. A Ty?`,
  "Brzmi spoko! Co robisz w weekend?",
  "Jestem na uczelni",
  "Meuszę lecieć, trzymaj się!",
];
let i = 0;

// INSERT OWN MSG
const inserMsg = function () {
  // date
  const date = new Date();
  const curDate = date.toTimeString().slice(0, 5);

  // print new msg
  newMessage.insertAdjacentHTML(
    "beforeend",
    `<div class="single-message-container flex-row">
      <div class="message-flex flex-column showmsg">
      <div class="chat__timestamp">Sent ${curDate}</div>
        <div class="chat__message">${inputTxt.value}</div>
      </div>
    </div>`
  );

  playPop();
  // clear input
  inputTxt.value = "";
  // scroll to bottom
  newMessage.scrollTop = newMessage.scrollHeight;
};
//INSERT REPLIES

const insertReply = function () {
  const date = new Date();
  const curDate = date.toTimeString().slice(0, 5);
  //print "typing animation"

  newMessage.insertAdjacentHTML(
    "beforeend",
    `
  <div id="typing-animation" class="single-message-container flex-row--opposite showmsg">
  <div class="chat__avatar"></div>
  <div class="message-flex flex-column">
    <div id="typing-wave" class="chat__message opposite typing-wave"><span>.</span><span>.</span><span>.</span>
     
    </div>
  </div>
</div>`
  );
  playType();
  newMessage.scrollTop = newMessage.scrollHeight;
  setTimeout(() => {
    document.getElementById("typing-animation").remove();
  }, 2900);

  setTimeout(() => {
    newMessage.insertAdjacentHTML(
      "beforeend",
      `
    <div class="single-message-container flex-row--opposite showmsg" >
    <div class="chat__avatar"></div>
    <div class="message-flex flex-column">
    <div class="chat__timestamp">Sent ${curDate}</div>
      <div class="chat__message opposite">
        ${responsesArr[i]}
      </div>
    </div>
  </div>`
    );
    playBeep();
    responsesArr[i++];
    if (i > responsesArr.length - 1) i = 0;
    newMessage.scrollTop = newMessage.scrollHeight;
  }, 3000);
};

//////////////////// CLICK TO SEND /////////////////////////
//  sending messeges function
const sendMsg = sendBtn.addEventListener("click", () => {
  if (inputTxt.value == "") {
    return;
  }
  inserMsg();
  setTimeout(() => {
    insertReply();
  }, 1000);
});

//////////////////// ENTER TO SEND /////////////////////////

const sendMsgEnter = inputTxt.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    if (inputTxt.value == "") {
      return;
    }
    inserMsg();
    setTimeout(() => {
      insertReply();
    }, 1000);
  }
});

// minimalize
miniBtnEl.addEventListener("click", () => {
  middleSec.classList.toggle("hide");
  lastSec.classList.toggle("hide");
});

// closeBtnEl.addEventListener("click", () => {
//   middleSec.classList.toggle("hide");
//   lastSec.classList.toggle("hide");
//   firstSec.classList.toggle("hide");
// });
