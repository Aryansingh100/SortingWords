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

    const background = new Rectangle({
        width: 220,
        height: 140,
        color: white,
        borderColor: "#333333",
        borderWidth: 4,
        corner: 15
    });

    background.addTo(box);


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
}