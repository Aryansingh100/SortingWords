import "https://zimjs.org/cdn/020/zim";

import {
    categories,
    words,
    difficultySettings
} from "./data/GameData.js";

import {
    observeUser,
    getPlayerName,
    logout
} from "./auth/AuthService.js";

import {
    openAuthModal
} from "./auth/AuthUI.js";

new Frame(
    FIT,
    1024,
    768,
    light,
    dark,
    ready
);

function createCategoryBox(category) {

    const box = new Container(
    220,
    140
);

box.category = category;

// Treat the whole box as one interactive object
box.mouseChildren = false;
box.mouseEnabled = true;

    const background = new Rectangle({
        width: 220,
        height: 140,
        color: white,
        borderColor: "#333333",
        borderWidth: 4,
        corner: 15
    });

    background.addTo(box);

    box.setBounds(0, 0, 220, 140);

    box.hitArea = new createjs.Shape();
    box.hitArea.graphics
    .beginFill("#000")
    .drawRect(0, 0, 220, 140);

    const icon = new Label({
        text: category.icon,
        size: 34
    });

    icon
        .centerReg()
        .loc(110, 30, box);


    const sanskritLabel = new Label({
        text: category.sanskritName,
        size: 28,
        color: "#222222"
    });

    sanskritLabel
        .centerReg()
        .loc(110, 75, box);


    const englishLabel = new Label({
        text: category.name,
        size: 18,
        color: "#666666"
    });

    englishLabel
        .centerReg()
        .loc(110, 110, box);


    return box;
}

function getClosestSlot(
    boxX,
    boxPositions
) {

    let closestIndex = 0;

    let smallestDistance = Infinity;


    boxPositions.forEach(
        (position, index) => {

            const distance =
                Math.abs(
                    boxX - position
                );

            if (
                distance < smallestDistance
            ) {
                smallestDistance = distance;
                closestIndex = index;
            }

        }
    );


    return closestIndex;
}

function findCollidingBox(fallingWord, categoryBoxes) {

    return categoryBoxes.find(box => {
        return fallingWord.hitTestBounds(box);
    });

}

function createFallingWord(wordData) {

    const word = new Label({
        text: wordData.word,
        size: 36,
        color: "#222222",
        bold: true,
        backgroundColor: "#ffffff",
        backgroundBorderColor: "#306b9b",
        backgroundBorderWidth: 3,
        corner: 12,
        padding: 15
    });

    // Remember which word this object represents
    word.wordData = wordData;

    // The falling word should not be draggable
    word.mouseEnabled = false;

    return word;
}

function shuffleWords(wordList) {

    const shuffled = [...wordList];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(
            Math.random() * (i + 1)
        );

        [shuffled[i], shuffled[randomIndex]] =
            [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}

function ready() {

    const background = new Rectangle(
    1024,
    768,
    "#bde7f0"
    );

    background.addTo();

    const title = new Label({
    text: "Sanskrit Word Sort",
    size: 40,
    color: "#222222",
    bold: true
    });

    title
    .centerReg()
    .loc(512, 60);

    const boxPositions = [
    170,
    512,
    854
    ];

    const categoryBoxes = [];

    categories.forEach((category, index) => {

    const box = createCategoryBox(category);

    box.slotIndex = index;

    box
        .centerReg()
        .loc(
            boxPositions[index],
            620
        );

    let dragOffsetX = 0;

    box.on("mousedown", (event) => {

        dragOffsetX = box.x - event.stageX;

    });

    box.on("pressmove", (event) => {

        box.x = event.stageX + dragOffsetX;

    });

    box.on("pressup", () => {

        const originalSlot = box.slotIndex;

        const targetSlot = getClosestSlot(
            box.x,
            boxPositions
        );

        if (targetSlot === originalSlot) {

            box.loc(
                boxPositions[originalSlot],
                620
            );

            return;
        }

        const targetBox = categoryBoxes.find(
            otherBox => otherBox.slotIndex === targetSlot
        );

        if (!targetBox) {
            return;
        }

        // Exchange the slot indices
        targetBox.slotIndex = originalSlot;
        box.slotIndex = targetSlot;

        // Move both boxes to their new slots
        targetBox.loc(
            boxPositions[originalSlot],
            620
        );

        box.loc(
            boxPositions[targetSlot],
            620
        );

    });

    categoryBoxes.push(box);

    });

    // GAME SETTINGS
    const FEEDBACK_DELAY = 1000;

    // Difficulty selection
    let selectedDifficulty = "easy";

    // The word list will be created when Play is clicked
    let roundWords = [];

    // Game state
    let currentWordIndex = 0;
    let score = 0;
    let lives = 3;
    let gameOver = false;
    let gameStarted = false;

    // Currently falling word
    let activeWord = null;

    // Current collision listener
    let activeCollisionCheck = null;

    const feedbackLabel = new Label({
    text: "",
    size: 36,
    bold: true,
    color: "#222222"
    });

    feedbackLabel
    .centerReg()
    .loc(512, 190);

    const scoreLabel = new Label({
    text: "Score: 0",
    size: 25,
    color: "#222222",
    bold: true
    });

    scoreLabel.loc(40, 25);

    const livesLabel = new Label({
        text: "Lives: 3",
        size: 25,
        color: "#dc2626",
        bold: true
    });

    livesLabel.loc(850, 25);


    const progressLabel = new Label({
        text: `Words: 0 / ${roundWords.length}`,
        size: 22,
        color: "#333333"
    });

    progressLabel
        .centerReg()
        .loc(512, 105);

    const startScreen = new Container(1024, 768);
    startScreen.addTo();

    const startBackground = new Rectangle({
        width: 1024,
        height: 768,
        color: "#bde7f0"
    });

    startBackground.addTo(startScreen);

    // =======================================
    // ZATAM LOGIN STATUS
    // =======================================

    const userLabel = new Label({
        text: "Playing as Guest",
        size: 20,
        color: "#2f5d8c",
        bold: true
    });

    userLabel.centerReg().loc(512, 120, startScreen);

    const loginButton = new Button({
        width: 200,
        height: 50,
        label: "Sign In",
        backgroundColor: "#2f5d8c",
        rollBackgroundColor: "#23496d",
        color: white,
        corner: 12
    });

    loginButton.centerReg().loc(512, 660, startScreen);

    loginButton.on("click", async () => {
        if (loginButton.label.text === "Logout") {
            try {
                await logout();
            } catch (error) {
                console.error("Logout failed:", error);
            }
        } else {
            openAuthModal();
        }
    });

    observeUser(user => {
        if (user) {
            userLabel.text = `Welcome, ${getPlayerName(user)}!`;
            loginButton.label.text = "Logout";
        } else {
            userLabel.text = "Playing as Guest";
            loginButton.label.text = "Sign In";
        }
    });

    const startTitle = new Label({
        text: "Sanskrit Word Sort",
        size: 55,
        color: "#2f5d8c",
        bold: true
    });

    startTitle.centerReg().loc(512, 220, startScreen);

    const instructions = new Label({
        text: "Move the correct category box to catch each falling Sanskrit word!",
        size: 23,
        color: "#333333"
    });

    instructions.centerReg().loc(512, 310, startScreen);

    const difficultyButtons = {};

    const difficultyOptions = [
        { id: "easy", x: 260 },
        { id: "medium", x: 512 },
        { id: "hard", x: 764 }
    ];

    difficultyOptions.forEach(option => {

        const button = new Button({
            width: 190,
            height: 65,
            label: difficultySettings[option.id].name,
            backgroundColor: "#ffffff",
            rollBackgroundColor: "#dbeafe",
            color: "#222222",
            corner: 12
        });

        button.centerReg().loc(
            option.x,
            405,
            startScreen
        );

        button.on("click", () => {
            selectedDifficulty = option.id;
            updateDifficultyButtons();
        });

        difficultyButtons[option.id] = button;
    });

    function updateDifficultyButtons() 
    {
        Object.entries(difficultyButtons).forEach(([id, button]) => {

            const selected = id === selectedDifficulty;

            if (button.label && typeof button.label !== "string") {
                button.label.color = selected
                    ? "#2f5d8c"
                    : "#222222";
            }
        });

    }

    updateDifficultyButtons();

    const playButton = new Button({
    width: 240,
    height: 75,
    label: "Play Game",
    backgroundColor: "#2f5d8c",
    rollBackgroundColor: "#23496d",
    color: white,
    corner: 15
    });

    playButton.centerReg().loc(512, 530, startScreen);

    playButton.on("click", () => 
    {

        if (gameStarted) {
            return;
        }

        // Get settings for the selected difficulty
        const settings = difficultySettings[selectedDifficulty];

        // Filter words based on difficulty
        const selectedWords = words.filter(
            word => word.difficulty === selectedDifficulty
        );

        // Don't start an empty round
        if (selectedWords.length === 0) {
            console.error(
                "No words found for difficulty:",
                selectedDifficulty
            );
            return;
        }

        // Shuffle only the selected words
        roundWords = shuffleWords(selectedWords);

        // Reset game state
        currentWordIndex = 0;
        score = 0;
        lives = settings.lives;
        gameOver = false;
        gameStarted = true;

        // Remove the start screen
        startScreen.removeFrom();

        // Start the selected difficulty
        updateGameUI();
        spawnNextWord();

    });


    function updateGameUI() 
    {

        scoreLabel.text = `Score: ${score}`;

        livesLabel.text = `Lives: ${lives}`;

        progressLabel.text =
            `${difficultySettings[selectedDifficulty].name} | Words: ${currentWordIndex} / ${roundWords.length}`;
    }

    function removeActiveWord() 
    {

        // Remove the collision listener
        if (activeCollisionCheck) {

            Ticker.remove(activeCollisionCheck);

            activeCollisionCheck = null;
        }

        // Remove the current word from the stage
        if (activeWord) {

            activeWord.stopAnimate();

            activeWord.removeFrom();

            activeWord = null;
        }
    }

    function endGame() 
    {

        gameOver = true;

        removeActiveWord();

        feedbackLabel.text = "";

        const endScreen = new Container(1024, 768);
        endScreen.addTo();

        const overlay = new Rectangle({
            width: 1024,
            height: 768,
            color: "rgba(0, 0, 0, 0.55)"
        });

        overlay.addTo(endScreen);

        const panel = new Rectangle({
            width: 550,
            height: 400,
            color: "#ffffff",
            corner: 25
        });

        panel.centerReg().loc(512, 380, endScreen);

        const finalMessage = new Label({
            text: lives <= 0 ? "Game Over!" : "Round Complete!",
            size: 46,
            color: "#2f5d8c",
            bold: true
        });

        finalMessage.centerReg().loc(512, 280, endScreen);

        const finalScore = new Label({
            text: `Final Score: ${score}`,
            size: 32,
            color: "#222222"
        });

        finalScore.centerReg().loc(512, 360, endScreen);

        const restartButton = new Button({
            width: 230,
            height: 65,
            label: "Play Again",
            backgroundColor: "#16803c",
            rollBackgroundColor: "#12632f",
            color: white,
            corner: 12
        });

        restartButton.centerReg().loc(512, 460, endScreen);

        restartButton.on("click", () => {
            window.location.reload();
        });

    }

    function finishWord(isCorrect, missed = false) 
    {

        if (gameOver) {
            return;
        }

        if (isCorrect) {
            score += difficultySettings[selectedDifficulty].points;

            feedbackLabel.text = "Correct!";
            feedbackLabel.color = "#16803c";
        } else {
            lives--;

            feedbackLabel.text = missed
                ? "Missed!"
                : "Incorrect!";

            feedbackLabel.color = "#dc2626";
        }

        removeActiveWord();

        updateGameUI();

        setTimeout(() => {

            if (
                lives <= 0 ||
                currentWordIndex >= roundWords.length
            ) {
                endGame();
            } else {
                feedbackLabel.text = "";
                spawnNextWord();
            }

        }, FEEDBACK_DELAY);
    }

    // Select a random Sanskrit word
    function spawnNextWord() 
    {

    if (gameOver) {
        return;
    }

    // No more words left
    if (currentWordIndex >= roundWords.length) {

        endGame();
        return;
    }

    // Get the next unused word
    const selectedWord =
        roundWords[currentWordIndex];

    currentWordIndex++;

    // Choose a random falling lane
    const randomLane = Math.floor(
        Math.random() * boxPositions.length
    );

    // Create the falling word
    const fallingWord =
        createFallingWord(selectedWord);

    fallingWord
        .centerReg()
        .loc(
            boxPositions[randomLane],
            140
        );

    // Store the current word
    activeWord = fallingWord;

    let collisionHandled = false;

    // Check collisions while the word falls
    function checkCollision() {

        if (collisionHandled || gameOver) {
            return;
        }

        const hitBox = findCollidingBox(
            fallingWord,
            categoryBoxes
        );

        if (!hitBox) {
            return;
        }

        collisionHandled = true;

        // Compare the word and box categories
        const isCorrect =
            fallingWord.wordData.categoryId ===
            hitBox.category.id;

        console.log(
            "Word:",
            fallingWord.wordData.word
        );

        console.log(
            "Expected:",
            fallingWord.wordData.categoryId
        );

        console.log(
            "Caught by:",
            hitBox.category.id
        );

        finishWord(isCorrect);
    }

    // Store the listener so we can remove it later
    activeCollisionCheck = checkCollision;

    Ticker.add(checkCollision);

    // Start falling
    fallingWord.animate({
        props: {
            y: 700
        },
        time: difficultySettings[selectedDifficulty].fallTime,
        ease: "linear",

        call: () => {

            if (collisionHandled || gameOver) {
                return;
            }

            collisionHandled = true;

            // No category box was touched
            finishWord(false, true);
        }
    });
    }
}