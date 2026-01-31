const statNames = [
    {name: "Strength", bonus: "Melee Attack +2"},
    {name: "Dexterity", bonus: "Rogue Skills +2"},
    {name: "Constitution", bonus: "Hit Points +2"},
    {name: "Intelligence", bonus: "Spellcasting +2"},
    {name: "Wisdom", bonus: "Ranged Attack +2"},
    {name: "Charisma", bonus: "One ability score +2"}
];

<<<<<<< HEAD
const callings = [
    {
        calling: "Fighter",
        startingAC: 5,
        startingHP: () => roll1dx(8),
        armor: "Chainmail",
        weapon: "Melee Two-Handed (greatsword, warhammer, greataxe, etc.)",
        gear: ""
    },
    {
        calling: "Wizard",
        startingAC: 10,
        startingHP: () => roll1dx(4),
        armor: "None",
        weapon: "Improvised (staff, knife, etc.)",
        gear: "Spellbook"
    },
    {
        calling: "Rogue",
        startingAC: 7,
        startingHP: () => roll1dx(6),
        armor: "Leather",
        weapon: "Ranged (bow, sling, crossbow, etc.)",
        gear: "Thieves Tools"
    }
];

const startingGear = [
    {item: "Torches", action: roll1dx(6)},
    {item: "Coins", action: roll1dx(10)},
    {item: "Supplies", action: roll1dx(4)},
];


function roll1dx(die_size) {
    return Math.floor(Math.random() * die_size) +1;
}

function roll4d4() {
    return Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 4) + 1
    ).reduce((a, b) => a + b);
}

function generateAbilities() {
    return Object.fromEntries(
        statNames.map(stat => [stat.key, roll4d4()])
    );
}

function generateBonuses(abilities) {
    return Object.fromEntries(
        statNames.map(stat => {
            const value = abilities[stat.key];
            const amount = value >= 12 ? 2 : 0;
            return [stat.key, `${stat.bonus} +${amount}`];
        })
    );
}

function getHighestScore(abilities) {
    return Math.max(...Object.values(abilities));
}

function getTopAbilities(abilities) {
    const highest = getHighestScore(abilities);

    return Object.entries(abilities)
        .filter(([_, value]) => value === highest)
        .map(([key]) => key);
}

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getBestAbility(abilities) {
    const topAbilities = getTopAbilities(abilities);
    return pickRandom(topAbilities);
}

function determineCalling(abilities) {
    const topStats = getTopAbilities(abilities);

    const viableCallings = callings.filter(c =>
        topStats.includes(c.stat)
    );

    if (viableCallings.length === 0) {
        return null;
    }

    return viableCallings[Math.floor(Math.random() * viableCallings.length)];
}

function createCharacter() {
    return {
        abilities: {},
        bonuses: {}
    };
}
=======
>>>>>>> parent of 3982f65 (ChatGPT fixed it for me. I am an AI slave 😭)

function renderCalling(character) {
    if (!character.calling) {
        return `
            <h3>Calling</h3>
        `
    }
}

const btnGenerateCharacter = document.getElementById('btn-generate-character');
const displayCharacter = document.getElementById('display-character');

<<<<<<< HEAD
btnGenerateCharacter.addEventListener('click', () => {
    const character = createCharacter();
    
    character.abilities = generateAbilities();

    // new
    getHighestScore(character.abilities);

    character.calling = determineCalling(character.abilities);

    character.bonuses = generateBonuses(character.abilities);

    const statsHTML = statNames.map(stat => `
        <p>
            <strong>${stat.name}</strong> (${stat.key}):
            ${character.abilities[stat.key]}
            <em> - ${character.bonuses[stat.key]}</em>
        </p>
    `).join('');

    const callingHTML = `
        <h3>Calling</h3>
        <p>
            <strong>${character.calling.calling}</strong>
            (based on ${character.calling.key})
        </p>
    `;

    displayCharacter.innerHTML = `
        ${callingHTML}
        <hr>
        <h3>Abilities</h3>
        ${statsHTML}
    `;
});
=======
>>>>>>> parent of 3982f65 (ChatGPT fixed it for me. I am an AI slave 😭)
