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

    categories.forEach((category, index) => {
    const box = createCategoryBox(category);
    box
        .centerReg()
        .loc(
            boxPositions[index],
            620
        );
    });
}