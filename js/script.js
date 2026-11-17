
/* ==========================
   OUR LITTLE UNIVERSE
========================== */

// PASSWORD
const SECRET_PASSWORD = "2025";

// INTRO MESSAGE
const introMessage =
    "I don't remember the exact day we first met...\n" +
    "But I remember how beautiful it became\n" +
    "having you in my life.\n\n" +
    "Some people come into our lives\n" +
    "and somehow turn ordinary moments\n" +
    "into unforgettable memories.\n\n" +
    "And you, my dear, are one of those people.\n\n" +
    "So, let's take a little trip\n" +
    "through our memories together. ♡";

// FINAL MESSAGE
const finalMessage =
    "I honestly don't know where to start.\n\n" +
    "I just want you to know how grateful I am\n" +
    "to have you in my life.\n\n" +
    "Thank you for every laugh,\n" +
    "every random conversation,\n" +
    "every crazy moment,\n" +
    "and every time you made an ordinary day\n" +
    "feel a little more special.\n\n" +
    "I hope we never stop making memories,\n" +
    "taking silly pictures,\n" +
    "laughing at things nobody else understands,\n" +
    "and being there for each other.\n\n" +
    "No matter how much time passes,\n" +
    "I hope we always find our way back\n" +
    "to these little moments.\n\n" +
    "And if there's one thing I want you\n" +
    "to remember, it's this:\n\n" +
    "You are loved.\n" +
    "You are appreciated.\n" +
    "And you will always be one of\n" +
    "my favorite parts of life.\n\n" +
    "Here's to all the memories we've made,\n" +
    "and all the beautiful ones waiting for us.\n\n" +
    "I love you, bestie. ♡";

// MUSIC
const music = document.getElementById("music");

let typingInterval = null;
let finalLetterStarted = false;


/* ==========================
   MEMORY DATA
========================== */

const memories = [
    {
        image: "assets/image/images/photo1.jpg",
        message: "Thank you for being my safe place. ♡"
    },
    {
        image: "assets/image/images/photo2.jpg",
        message: "Your laugh is one of my favorite sounds."
    },
    {
        image: "assets/image/images/photo3.jpg",
        message: "Life is more fun with you around."
    },
    {
        image: "assets/image/images/photo4.jpg",
        message: "I hope we never run out of silly things to do."
    },
    {
        image: "assets/image/images/photo5.jpg",
        message: "You make even the smallest moments special."
    },
    {
        image: "assets/image/images/photo6.jpg",
        message: "Some friendships are little gifts from life."
    }
];


/* ==========================
   PASSWORD & MUSIC
========================== */

function unlock() {

    const passwordInput = document.getElementById("password");
    const error = document.getElementById("error");

    if (!passwordInput || !error) return;

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === SECRET_PASSWORD) {

        error.textContent = "";

        showScreen("introScreen");

        const typingElement = document.getElementById("typingText");
        const nextButton = document.getElementById("introNext");

        if (!typingElement || !nextButton) return;

        nextButton.classList.add("hidden");

        startTyping(
            introMessage,
            typingElement,
            function () {
                nextButton.classList.remove("hidden");
            }
        );

        if (music) {
            music.volume = 0.45;

            music.play().catch(function () {
                console.log("Music playback was blocked.");
            });
        }

    } else {

        error.textContent =
            "Oops! That's not our secret password ♡";

        passwordInput.value = "";
        passwordInput.focus();

    }
}


// ENTER KEY
const passwordInput = document.getElementById("password");

if (passwordInput) {

    passwordInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            unlock();
        }

    });

}


// MUSIC BUTTON
function toggleMusic() {

    if (!music) return;

    const icon = document.querySelector("#musicBtn i");

    if (music.paused) {

        music.play().catch(function () {
            console.log("Could not play music.");
        });

        if (icon) {
            icon.className = "fa-solid fa-volume-high";
        }

    } else {

        music.pause();

        if (icon) {
            icon.className = "fa-solid fa-volume-xmark";
        }

    }

}


/* ==========================
   SCREEN NAVIGATION
========================== */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(function (screen) {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (!target) {
        console.error("Screen not found:", screenId);
        return;
    }

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (screenId === "galleryScreen") {
        revealGallery();
    }

    if (screenId === "finalScreen") {
        startFinalLetter();
    }

}


/* ==========================
   TYPING ANIMATION
========================== */

function startTyping(text, element, callback, speed = 38) {

    if (!element) return;

    if (typingInterval !== null) {
        clearInterval(typingInterval);
    }

    element.textContent = "";

    let index = 0;

    typingInterval = setInterval(function () {

        element.textContent += text.charAt(index);

        index++;

        if (index >= text.length) {

            clearInterval(typingInterval);
            typingInterval = null;

            if (callback) {
                callback();
            }

        }

    }, speed);

}


/* ==========================
   GALLERY ANIMATION
========================== */

function revealGallery() {

    const photos = document.querySelectorAll(".photo-card");

    photos.forEach(function (photo, index) {

        photo.style.opacity = "0";
        photo.style.animation = "none";

        setTimeout(function () {

            photo.style.animation =
                "photoReveal .8s ease forwards";

        }, index * 250);

    });

}


/* ==========================
   FLIP MEMORY CARDS
========================== */

function createMemoryCards() {

    const grid = document.getElementById("flipGrid");

    if (!grid) {
        console.error("flipGrid element not found!");
        return;
    }

    grid.innerHTML = "";

    memories.forEach(function (memory, index) {

        const card = document.createElement("div");

        card.className = "flip-card";

        card.innerHTML = `
            <div class="flip-inner">

                <div class="flip-front">
                    <img
                        src="${memory.image}"
                        alt="Memory ${index + 1}"
                        loading="lazy"
                    >
                </div>

                <div class="flip-back">
                    <i class="fa-solid fa-heart"></i>
                    <p>${memory.message}</p>
                </div>

            </div>
        `;

        card.addEventListener("click", function () {

            card.classList.toggle("flipped");

        });

        grid.appendChild(card);

    });

}


/* ==========================
   FINAL LETTER
========================== */

function startFinalLetter() {

    if (finalLetterStarted) return;

    const element = document.getElementById("finalText");

    if (!element) return;

    finalLetterStarted = true;

    startTyping(
        finalMessage,
        element,
        null,
        28
    );

}


/* ==========================
   FLOATING HEARTS
========================== */

function createHeart() {

    const container = document.getElementById("hearts");

    if (!container) return;

    const heart = document.createElement("span");

    heart.className = "heart";
    heart.textContent = "♥";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (Math.random() * 15 + 10) + "px";

    heart.style.animationDuration =
        (Math.random() * 5 + 5) + "s";

    container.appendChild(heart);

    setTimeout(function () {

        heart.remove();

    }, 10000);

}


// CREATE HEARTS AUTOMATICALLY
setInterval(createHeart, 900);


/* ==========================
   FINAL CELEBRATION
========================== */

function celebrate() {

    const button = document.querySelector(
        "#finalScreen .main-btn"
    );

    if (button) {

        button.innerHTML =
            'Sending you a million hugs! <i class="fa-solid fa-heart"></i>';

        button.style.transform = "scale(1.08)";

    }

    for (let i = 0; i < 30; i++) {

        setTimeout(createHeart, i * 80);

    }

    const endNote = document.getElementById("endNote");

    if (endNote) {

        endNote.textContent =
            "Our story is my favorite story. And it's still being written... ♡";

    }

}


/* ==========================
   INITIALIZE WEBSITE
========================== */

createMemoryCards();

console.log("Our Little Universe is ready! ♡");
 