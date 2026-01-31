const statNames = [
    { key: "STR", name: "Strength", bonus: "Melee Attack" },
    { key: "DEX", name: "Dexterity", bonus: "Rogue Skills" },
    { key: "CON", name: "Constitution", bonus: "Hit Points" },
    { key: "INT", name: "Intelligence", bonus: "Spellcasting" },
    { key: "WIS", name: "Wisdom", bonus: "Ranged Attack" },
    { key: "CHA", name: "Charisma", bonus: "One ability score" }
];

const callings = [
    {
        calling: "Fighter",
        startingAC: 5,
        startingHD: "1d8",
        startingHP: () => roll1dx(8),
        armor: "Chainmail",
        weapon: "Melee Two-Handed (greatsword, warhammer, greataxe, etc.)",
        gear: ""
    },
    {
        calling: "Wizard",
        startingAC: 10,
        startingHD: "1d4",
        startingHP: () => roll1dx(4),
        armor: "None",
        weapon: "Improvised (staff, knife, etc.)",
        gear: "Spellbook"
    },
    {
        calling: "Rogue",
        startingAC: 7,
        startingHD: "1d6",
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
    return Math.floor(Math.random() * die_size) + 1;
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

function createCharacterAbilities() {
    return {
        abilities: {},
        bonuses: {}
    };
}

const btnGenerateCharacter = document.getElementById('btn-generate-character');
const displayAbilityScores = document.getElementById('display-ability-scores');
const btnGenerateFighterHP = document.getElementById('btn-generate-fighter-hp');
const displayFighterHP = document.getElementById('display-fighter-hp');

let character = {};


btnGenerateCharacter.addEventListener('click', () => {
    displayAbilityScores.classList.remove('hide');
    frameDisplayCharacter.classList.add('hide');
    frameDisplayTable.classList.remove('hide');

    character = createCharacterAbilities();
    
    character.abilities = generateAbilities();
    character.bonuses = generateBonuses(character.abilities);

    displayAbilityScores.innerHTML = statNames.map(stat => `
        <p>
            ${stat.name}:
            ${character.abilities[stat.key]}
            <em>- ${character.bonuses[stat.key]}</em>
        </p>
    `).join('');
});




function generateCharacterDetails(calling) {
    displayAbilityScores.classList.add('hide');
    frameDisplayCharacter.classList.remove('hide');

    const charClass = callings.find(row => row.calling === calling);

    let fighterLevel = 0;
    let rogueLevel = 0;
    let wizardLevel = 0;

    if (charClass.calling === "Fighter") {
        fighterLevel = 1;
        rogueLevel = 0;
        wizardLevel = 0;
    } else if (charClass.calling === "Rogue") {
        fighterLevel = 0;
        rogueLevel = 1;
        wizardLevel = 0;
    } else if (charClass.calling === "Wizard") {
        fighterLevel = 0;
        rogueLevel = 0;
        wizardLevel = 1;
    };

    displayCharacter.innerHTML = `
        <h2>Character Summary</h2>
        <strong>Fighter</strong> (${fighterLevel})
        <strong>Rogue</strong> (${rogueLevel})
        <strong>Wizard</strong> (${wizardLevel})
        <br>AC${charClass.startingAC}, HD${charClass.startingHD}, HP${charClass.startingHP()}
        <br><br><b>Ability Scores</b>
    `;

    displayAbilityScores2.innerHTML = statNames.map(stat => `
        <div>
            ${stat.name}:
            ${character.abilities[stat.key]}
            <em>- ${character.bonuses[stat.key]}</em>
        </div>
    `).join('');
}


const frameDisplayTable = document.getElementById('frame-display-table');
frameDisplayTable.classList.add('hide');
const tableRowFighter = document.getElementById('table-row-fighter');
const tableRowRogue = document.getElementById('table-row-rogue');
const tableRowWizard = document.getElementById('table-row-wizard');
const frameDisplayCharacter = document.getElementById('frame-display-character');
const displayCharacter = document.getElementById('display-character');
const displayAbilityScores2 = document.getElementById('display-ability-scores2');


tableRowFighter.addEventListener('click', () => {
    generateCharacterDetails('Fighter');
});

tableRowRogue.addEventListener('click', () => {
    generateCharacterDetails('Rogue');
});

tableRowWizard.addEventListener('click', () => {
    generateCharacterDetails('Wizard');
});