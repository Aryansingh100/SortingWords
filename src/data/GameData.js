export const categories = [
    {
        id: "animals",
        name: "Animals",
        sanskritName: "पशवः",
        icon: "🐾"
    },
    {
        id: "family",
        name: "Family",
        sanskritName: "परिवारः",
        icon: "👨‍👩‍👧"
    },
    {
        id: "places",
        name: "Places",
        sanskritName: "स्थानानि",
        icon: "🏫"
    }
];

export const words = [
    // EASY
    {
        id: 1,
        word: "सिंहः",
        meaning: "Lion",
        categoryId: "animals",
        difficulty: "easy"
    },
    {
        id: 2,
        word: "माता",
        meaning: "Mother",
        categoryId: "family",
        difficulty: "easy"
    },
    {
        id: 3,
        word: "गृहम्",
        meaning: "House",
        categoryId: "places",
        difficulty: "easy"
    },

    // MEDIUM
    {
        id: 4,
        word: "अश्वः",
        meaning: "Horse",
        categoryId: "animals",
        difficulty: "medium"
    },
    {
        id: 5,
        word: "भ्राता",
        meaning: "Brother",
        categoryId: "family",
        difficulty: "medium"
    },
    {
        id: 6,
        word: "चिकित्सालयः",
        meaning: "Hospital",
        categoryId: "places",
        difficulty: "medium"
    },

    // HARD
    {
        id: 7,
        word: "गजशावकः",
        meaning: "Elephant calf",
        categoryId: "animals",
        difficulty: "hard"
    },
    {
        id: 8,
        word: "पितामहः",
        meaning: "Paternal grandfather",
        categoryId: "family",
        difficulty: "hard"
    },
    {
        id: 9,
        word: "पुस्तकालयः",
        meaning: "Library",
        categoryId: "places",
        difficulty: "hard"
    }
];

export const difficultySettings = {
    easy: {
        name: "Easy",
        fallTime: 8,
        points: 10,
        lives: 3
    },
    medium: {
        name: "Medium",
        fallTime: 5,
        points: 20,
        lives: 3
    },
    hard: {
        name: "Hard",
        fallTime: 3,
        points: 30,
        lives: 3
    }
};