import "https://zimjs.org/cdn/020/zim";

import {
    categories,
    words
} from "./data/GameData.js";

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

function getRandomWord(wordList) {

    const randomIndex = Math.floor(
        Math.random() * wordList.length
    );

    return wordList[randomIndex];
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

    box.drag();

box.on("pressup", () => {

    const originalSlot =
        box.slotIndex;


    const targetSlot =
        getClosestSlot(
            box.x,
            boxPositions
        );


    if (
        targetSlot === originalSlot
    ) {

        box.loc(
            boxPositions[originalSlot],
            620
        );

        return;
    }


    const targetBox =
        categoryBoxes.find(
            otherBox =>
                otherBox.slotIndex ===
                targetSlot
        );


    targetBox.slotIndex =
        originalSlot;

    box.slotIndex =
        targetSlot;


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

    const feedbackLabel = new Label({
    text: "",
    size: 36,
    bold: true,
    color: "#222222"
    });

    feedbackLabel
    .centerReg()
    .loc(512, 115);

    function checkAnswer(fallingWord, hitBox) 
    {
        const wordCategory =
            fallingWord.wordData.categoryId;

        const boxCategory =
            hitBox.category.id;

        const isCorrect =
            wordCategory === boxCategory;

        if (isCorrect) {

            feedbackLabel.text = "Correct!";
            feedbackLabel.color = "#16803c";

        } else {

            feedbackLabel.text = "Incorrect!";
            feedbackLabel.color = "#dc2626";

        }

        console.log("Word:", fallingWord.wordData.word);
        console.log("Expected:", wordCategory);
        console.log("Caught by:", boxCategory);
        console.log("Correct:", isCorrect);
    }

    // Select a random Sanskrit word
    const selectedWord = getRandomWord(words);

    // Select one of the three lanes
    const randomLane = Math.floor(
    Math.random() * boxPositions.length
);

    // Create the ZIM word object
    const fallingWord = createFallingWord(selectedWord);

    // Place the word at the top of its lane
    fallingWord
    .centerReg()
    .loc(
        boxPositions[randomLane],
        140
    );

    // Animate downward
    let collisionHandled = false;

function checkCollision() {

    if (collisionHandled) {
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

    // Stop the word immediately upon contact
    fallingWord.stopAnimate();

    // Stop checking for collisions
    Ticker.remove(checkCollision);

    // Evaluate the category
    checkAnswer(fallingWord, hitBox);
}

    // Check for collisions every frame
    Ticker.add(checkCollision);

    // Animate the word through the box area
    fallingWord.animate
    ({
        props: {
            y: 700
        },
        time: 5,
        ease: "linear",
        call: () => {

            if (collisionHandled) {
                return;
            }

            // Fallback if the word reaches the bottom without touching a category box
            Ticker.remove(checkCollision);

            feedbackLabel.text = "Missed!";
            feedbackLabel.color = "#dc2626";

        }
    });
}