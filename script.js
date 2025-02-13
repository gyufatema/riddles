const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const scoreDisplay = document.getElementById('score');
const skipBtn = document.getElementById('skip-btn');
const hintBtn = document.getElementById('hint-btn');

let score = 0;
let skipsLeft = 3;
let usedRiddles = new Set();
let hintUsed = false;
let incorrectAttempts = 0;


const riddles = [
    { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", answer: "echo", hints: ["It repeats after you speak.", "It reflects sound.", "You can hear it in caves."] },
    { question: "The more of me you take, the more you leave behind. What am I?", answer: ["footsteps","footprints"], hints: ["You leave me behind when you walk.", "Detectives look for me at crime scenes.", "I can be seen in the sand."] },
    { question: "I am light as a feather, yet the strongest man can't hold me for much longer than a minute. What am I?", answer: "breath", hints: ["You need this to stay alive.", "You exhale and inhale me.", "Singers train to control this."] },
    { question: "What has to be broken before you can use it?", answer: "egg", hints: ["You eat this for breakfast.", "It's a common ingredient.", "I come from a chicken."] },
    { question: "What has a heart that doesn’t beat?", answer: "artichoke", hints: ["It's a vegetable.", "You can eat it.", "It has layers."] },
    { question: "What can you catch but not throw?", answer: "cold", hints: ["You don’t want this in winter.", "You might get it from someone else.", "You can catch it from being sick."] },
    { question: "The more you remove from me, the bigger I get. What am I?", answer: "hole", hints: ["Think of digging.", "I appear when you take something away.", "You can dig me in the ground."] },
    { question: "I have hands but can’t clap. What am I?", answer: ["watch", "clock"], hints: ["I tell time.", "You wear me on your wrist.", "I have numbers on my face."] },
    { question: "What runs but never walks, has a mouth but never talks?", answer: "river", hints: ["It flows continuously.", "You can see me near mountains.", "I can be fast or slow."] },
    { question: "What has legs but doesn’t walk?", answer: "table", hints: ["I'm a piece of furniture.", "You can put things on me.", "I don't move by myself."] },
    { question: "I have an eye but can’t see. What am I?", answer: "needle", hints: ["I'm used for sewing.", "I’m small and sharp.", "I’m usually made of metal."] },
    { question: "I have cities but no houses, forests but no trees, and rivers but no water. What am I?", answer: "map", hints: ["It helps you find places.", "You look at me to plan routes.", "I can be paper or digital."] },
    { question: "What is full of holes but still holds water?", answer: "sponge", hints: ["You use me for cleaning.", "I’s soft and absorbent.", "You can find me in a kitchen or bathroom."] },
    { question: "I can be cracked, made, told, and played. What am I?", answer: "joke", hints: ["People laugh at me.", "I can be funny or silly.", "I can be shared among friends."] },
    { question: "I have a head, a tail, but no body. What am I?", answer: "coin", hints: ["You use me to pay.", "I can be flipped for decisions.", "I’m round and made of metal."] },
    { question: "The more I dry, the wetter I become. What am I?", answer: "towel", hints: ["Used after a shower.", "I help you dry off.", "You usually find me in a bathroom."] },
    { question: "I go up but never come down. What am I?", answer: "age", hints: ["It happens every year.", "You can't stop it.", "Everyone gets older."] },
    { question: "I have keys but open no locks. What am I?", answer: "piano", hints: ["It makes music.", "You play me with your fingers.", "I have 88 keys."] },
    { question: "I can be written, spoken, broken, and exposed. What am I?", answer: "news", hints: ["You hear me on TV.", "You read me in newspapers.", "I can be good or bad."] },
    { question: "What has four fingers and a thumb but isn’t alive?", answer: "glove", hints: ["It protects your hands.", "You wear me in cold weather.", "I’m made of fabric or leather."] },
    { question: "I have no wings, but I can fly. I have no eyes, but I can cry. What am I?", answer: "cloud", hints: ["You see me in the sky.", "I bring rain.", "I float in the air."] },
    { question: "What has a head and a tail but no body?", answer: "coin", hints: ["You flip me for decisions.", "I’m round and made of metal.", "I can be found in your pocket."] },
    { question: "I am always hungry, I must always be fed. The more I eat, the bigger I get. What am I?", answer: "fire", hints: ["I can be dangerous or warm.", "You feed me with wood or gas.", "I need oxygen to burn."] },
    { question: "What has hands but can’t clap?", answer: "clock", hints: ["It tells time.", "You can find me on the wall or desk.", "I have a face with numbers."] },
    { question: "I shave every day, but my beard stays the same. Who am I?", answer: "barber", hints: ["I cut hair for a living.", "I use clippers and razors.", "People visit me for grooming."] },
    { question: "What has ears but cannot hear?", answer: "corn", hints: ["A type of food.", "You can eat me on the cob.", "I grow in fields."] },
    { question: "What is as light as a feather, yet even the strongest man cannot hold it for much longer than a minute?", answer: "breath", hints: ["You need me to live.", "You exhale me.", "I can't be held."] },
    { question: "I fly without wings. I cry without eyes. What am I?", answer: "cloud", hints: ["You see me before rain.", "I float in the sky.", "I'm made of water vapor."] },
    { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: ["m", "letter m"], hints: ["Look at the words carefully.", "I appear twice in the word 'moment'.", "I’m part of the alphabet."] },
    { question: "I can travel around the world while staying in the same spot. What am I?", answer: "stamp", hints: ["Found on letters.", "You stick me on an envelope.", "I have a picture of a country or symbol."] },
    { question: "What has a bottom at the top?", answer: "leg", hints: ["It's part of your body.", "You stand on me.", "I help you walk."] },
    { question: "What kind of room has no doors or windows?", answer: ["mushroom", "grave"], hints: ["It’s a type of fungus.", "It grows in damp areas.", "It’s edible."] },
    { question: "What has a neck but no head?", answer: "bottle", hints: ["You pour drinks from it.", "I’m made of glass or plastic.", "You can find me in kitchens."] },
    { question: "The more you take, the more you leave behind. What am I?", answer: "footsteps", hints: ["Think about walking.", "You leave me behind when you walk.", "I’m found on sand or snow."] },
    { question: "What has one eye but can’t see?", answer: "needle", hints: ["Used for stitching.", "It’s very sharp.", "I’m a tool for sewing."] },
    { question: "The more I am used, the more I disappear. What am I?", answer: ["eraser", "soap"], hints: ["Used in school.", "You use me to clean mistakes.", "I get smaller the more you use me."] },
    { question: "What gets wetter the more it dries?", answer: "towel", hints: ["Used after a shower.", "I help dry your body.", "I absorb water."] },
    { question: "What has roots as nobody sees, is taller than trees, up, up it goes, and yet it never grows?", answer: "mountain", hints: ["A giant landform.", "You can climb me.", "I’m made of rocks."] },
    { question: "What begins with T, ends with T, and has T in it?", answer: ["teapot", "that"], hints: ["You use it for brewing.", "I have a spout.", "You can pour tea from me."] },
    { question: "The more of me you remove, the bigger I get. What am I?", answer: "hole", hints: ["Created when you dig.", "You can find me in the ground.", "The deeper I get, the bigger I become."] },
    { question: "What goes up but never comes down?", answer: "age", hints: ["Everyone has this.", "You get older with time.", "It increases every year."] },
    { question: "I start with an ‘e’, end with an ‘e’, but contain only one letter. What am I?", answer: "envelope", hints: ["You mail things inside me.", "I’m made of paper.", "You close me with a seal."] },
    { question: "What gets sharper the more you use it?", answer: ["brain", "mind", "memory"], hints: ["You think with it.", "The more you train it, the sharper it gets.", "It helps you remember things."] },
    { question: "What comes down but never goes up?", answer: "rain", hints: ["It falls from the sky.", "You need an umbrella for me.", "I make the ground wet."] },
    { question: "What has many teeth but cannot bite?", answer: "comb", hints: ["Used for styling hair.", "I have a handle.", "You use me in the bathroom."] },
    { question: "What can’t talk but will reply when spoken to?", answer: "echo", hints: ["It repeats sound.", "You can hear me in mountains.", "I’m a natural phenomenon."] },
    { question: "What has a tail and a head but no body?", answer: "coin", hints: ["You flip me to make decisions.", "I’m made of metal.", "I’m used for transactions."] },
    { question: "What’s black and white and read all over?", answer: "newspaper", hints: ["People used to read me daily.", "I have news and stories.", "I come in many sections."] },
];

// 📌 Function to send bot messages
const botMessage = (text) => {
    const message = document.createElement('p');
    message.classList.add('bot-message');
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
};

// 📌 Function to send user messages
const userMessage = (text) => {
    const message = document.createElement('p');
    message.classList.add('user-message');
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
};

// 📌 Function to get a random riddle without repeating
const askRiddle = () => {
    if (usedRiddles.size === riddles.length) {
        botMessage("🎉 You've solved all the riddles! Refresh the page for a new game.");
        return;
    }

    let newRiddle;
    do {
        newRiddle = riddles[Math.floor(Math.random() * riddles.length)];
    } while (usedRiddles.has(newRiddle.question));

    currentRiddle = newRiddle;
    usedRiddles.add(newRiddle.question);
    hintUsed = false;
    incorrectAttempts = 0;

    botMessage(currentRiddle.question);
};

// 📌 Function to check user answer
const checkAnswer = () => {
    const userAnswer = userInput.value.toLowerCase().trim();
    userMessage(userAnswer);
    userInput.value = "";

    let correctAnswers = Array.isArray(currentRiddle.answer) ? currentRiddle.answer : [currentRiddle.answer];

    // Function to check similarity with plural handling
    const isSimilar = (userInput, correctAnswer) => {
        let normalizedUserInput = userInput.replace(/\s+/g, "");  // Remove spaces
        let normalizedCorrectAnswer = correctAnswer.replace(/\s+/g, "");

        // Allow plurals (e.g., "egg" == "eggs")
        if (normalizedUserInput === normalizedCorrectAnswer || 
            normalizedUserInput + "s" === normalizedCorrectAnswer || 
            normalizedUserInput === normalizedCorrectAnswer + "s") {
            return true;
        }
        return false;
    };

    // ✅ Check if the user's answer matches ANY correct answer in the array
    if (correctAnswers.some(answer => isSimilar(userAnswer, answer))) {
        botMessage("🎉 Correct! Here's another riddle...");
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        attempts = 0; // Reset attempts
        setTimeout(askRiddle, 1500);
    } else {
        attempts++;
        if (attempts >= 3) {
            botMessage(`❌ Wrong! The correct answer was: ${correctAnswers.join(" or ")}. Here's a new riddle.`);
            attempts = 0;
            setTimeout(askRiddle, 2000);
        } else {
            botMessage(`❌ Nope! Try again. (${3 - attempts} attempts left)`);
        }
    }
};



// 📌 Handle send button click
sendBtn.addEventListener('click', checkAnswer);

// 📌 Handle Enter key press
userInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// 📌 Hint button functionality
let hintIndex = 0;  // To track how many hints have been used

hintBtn.addEventListener('click', () => {
    if (hintIndex < 3) {  // Only show hints if less than 3 have been used
        botMessage(`💡 Hint: ${currentRiddle.hints[hintIndex]}`);
        hintIndex++;
    } else {
        botMessage("⚠️ You’ve already used all the hints for this riddle!");
    }
});


// 📌 Skip button functionality
skipBtn.addEventListener('click', () => {
    if (skipsLeft > 0) {
        skipsLeft--;
        botMessage(`⏩ Skipping... You have ${skipsLeft} skips left.`);
        askRiddle();
    } else {
        botMessage("⚠️ No skips left! You have to solve this one.");
    }
});



// 📌 Start the game
setTimeout(askRiddle, 1000);
