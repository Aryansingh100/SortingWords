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

    // =====================================
    // EASY — Familiar Hindi/Sanskrit words
    // =====================================

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
    {
        id: 4,
        word: "गजः",
        meaning: "Elephant",
        categoryId: "animals",
        difficulty: "easy"
    },
    {
        id: 5,
        word: "पिता",
        meaning: "Father",
        categoryId: "family",
        difficulty: "easy"
    },
    {
        id: 6,
        word: "विद्यालयः",
        meaning: "School",
        categoryId: "places",
        difficulty: "easy"
    },
    {
        id: 7,
        word: "वानरः",
        meaning: "Monkey",
        categoryId: "animals",
        difficulty: "easy"
    },
    {
        id: 8,
        word: "भ्राता",
        meaning: "Brother",
        categoryId: "family",
        difficulty: "easy"
    },
    {
        id: 9,
        word: "उद्यानम्",
        meaning: "Garden",
        categoryId: "places",
        difficulty: "easy"
    },
    {
        id: 10,
        word: "मन्दिरम्",
        meaning: "Temple",
        categoryId: "places",
        difficulty: "easy"
    },

    // =====================================
    // MEDIUM — Intermediate vocabulary
    // =====================================

    {
        id: 11,
        word: "अश्वः",
        meaning: "Horse",
        categoryId: "animals",
        difficulty: "medium"
    },
    {
        id: 12,
        word: "भगिनी",
        meaning: "Sister",
        categoryId: "family",
        difficulty: "medium"
    },
    {
        id: 13,
        word: "चिकित्सालयः",
        meaning: "Hospital",
        categoryId: "places",
        difficulty: "medium"
    },
    {
        id: 14,
        word: "शशकः",
        meaning: "Rabbit",
        categoryId: "animals",
        difficulty: "medium"
    },
    {
        id: 15,
        word: "पितामहः",
        meaning: "Paternal grandfather",
        categoryId: "family",
        difficulty: "medium"
    },
    {
        id: 16,
        word: "पुस्तकालयः",
        meaning: "Library",
        categoryId: "places",
        difficulty: "medium"
    },
    {
        id: 17,
        word: "मृगः",
        meaning: "Deer",
        categoryId: "animals",
        difficulty: "medium"
    },
    {
        id: 18,
        word: "मातामही",
        meaning: "Maternal grandmother",
        categoryId: "family",
        difficulty: "medium"
    },
    {
        id: 19,
        word: "भोजनालयः",
        meaning: "Dining hall",
        categoryId: "places",
        difficulty: "medium"
    },
    {
        id: 20,
        word: "कूर्मः",
        meaning: "Tortoise",
        categoryId: "animals",
        difficulty: "medium"
    },

    // =====================================
    // HARD — Advanced Sanskrit vocabulary
    // =====================================

    {
        id: 21,
        word: "गजशावकः",
        meaning: "Elephant calf",
        categoryId: "animals",
        difficulty: "hard"
    },
    {
        id: 22,
        word: "पितृव्यः",
        meaning: "Paternal uncle",
        categoryId: "family",
        difficulty: "hard"
    },
    {
        id: 23,
        word: "वेधशाला",
        meaning: "Observatory",
        categoryId: "places",
        difficulty: "hard"
    },
    {
        id: 24,
        word: "शार्दूलः",
        meaning: "Tiger",
        categoryId: "animals",
        difficulty: "hard"
    },
    {
        id: 25,
        word: "मातुलः",
        meaning: "Maternal uncle",
        categoryId: "family",
        difficulty: "hard"
    },
    {
        id: 26,
        word: "न्यायालयः",
        meaning: "Court of law",
        categoryId: "places",
        difficulty: "hard"
    },
    {
        id: 27,
        word: "नकुलः",
        meaning: "Mongoose",
        categoryId: "animals",
        difficulty: "hard"
    },
    {
        id: 28,
        word: "पितृष्वसा",
        meaning: "Paternal aunt",
        categoryId: "family",
        difficulty: "hard"
    },
    {
        id: 29,
        word: "विश्रामगृहम्",
        meaning: "Rest house",
        categoryId: "places",
        difficulty: "hard"
    },
    {
        id: 30,
        word: "मकरः",
        meaning: "Crocodile",
        categoryId: "animals",
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