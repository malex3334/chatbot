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
const botName = document.getElementById("name");
const botAvatar = document.getElementById("avatar");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
const firstBot = document.getElementById("0");
const secondBot = document.getElementById("1");
const thirdBot = document.getElementById("2");
let botIndex = 0;
let i = 0;

const data = [
  {
    name: "Kazik Murowski",
    avatar: "url(img/av1.jpg)",
    chatavatar: "img/av1.jpg",
    responsesArr: [
      "Cześć! Co słychać?",
      `U mnie ok, robię kurs JS. A Ty?`,
      "Brzmi spoko! Co robisz w weekend?",
      "Jestem na uczelni",
      "Meuszę lecieć, trzymaj się!",
    ],
  },

  {
    name: "Ojosław Ojutkowski",
    avatar: "url(img/Ojutek.jpg)",
    chatavatar: "img/Ojutek.jpg",
    responsesArr: [
      "Cześć! jak sie masz?",
      `Mam się super! Ja sobie śpie a TY?`,
      "Fajowo! a kiedy przyjdziesz?",
      "hurra! to ja czekam!",
      "hm hm hm hmmmmmm  &#9835; &#9834; &#9835;",
    ],
  },
];

//TIMESTAMP
const date = new Date();
console.log(date.toTimeString().slice(0, 5));

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
  <img class="chat__avatar" src=${data[botIndex].chatavatar} />
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
    <img class="chat__avatar" src=${data[botIndex].chatavatar} />
    <div class="message-flex flex-column">
    <div class="chat__timestamp">Sent ${curDate}</div>
      <div class="chat__message opposite">
        ${data[botIndex].responsesArr[i]}
      </div>
    </div>
  </div>`
    );
    playBeep();
    responsesIncrement();
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

const responsesIncrement = function () {
  data[0].responsesArr[i++];
  if (i > data[botIndex].responsesArr.length - 1) i = 0;
  newMessage.scrollTop = newMessage.scrollHeight;
};

const updatePersonals = function () {
  // const botChatAvatar = document.getElementById(".chat__avatar");
  // botChatAvatar.style.backgroundImage = data[botIndex].chatavatar;

  botName.innerHTML = data[botIndex].name;
  botAvatar.style.backgroundImage = data[botIndex].avatar;

  newMessage.innerHTML = "";
  console.log((botName.innerHTML = data[botIndex].name));

  i = 0;
};

/////////// FOR NEXT UPDATES
// btnRight.addEventListener("click", () => {
//   data[botIndex++];
//   if (botIndex > data.length - 1) botIndex = 0;

//   updatePersonals();
// });

// btnLeft.addEventListener("click", () => {
//   data[botIndex++];
//   if (botIndex > data.length - 1) botIndex = 0;

//   updatePersonals();
// });

firstBot.addEventListener("click", () => {
  data[(botIndex = 0)];

  updatePersonals();
  firstBot.classList.add("selected-bot");
  if (secondBot.classList.contains("selected-bot"))
    secondBot.classList.remove("selected-bot");
});

secondBot.addEventListener("click", () => {
  data[(botIndex = 1)];

  updatePersonals();
  secondBot.classList.add("selected-bot");
  if (firstBot.classList.contains("selected-bot"))
    firstBot.classList.remove("selected-bot");
});
