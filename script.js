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
        gear: "Rope"
    },
    {
        calling: "Wizard",
        startingAC: 10,
        startingHD: "1d4",
        startingHP: () => roll1dx(4),
        armor: "None",
        weapon: "Improvised (staff, knife, etc.)",
        gear: "Spellbook, Rope"
    },
    {
        calling: "Rogue",
        startingAC: 7,
        startingHD: "1d6",
        startingHP: () => roll1dx(6),
        armor: "Leather",
        weapon: "Ranged (bow, sling, crossbow, etc.)",
        gear: "Thieves Tools, Rope"
    }
];

const spell_verbs = ["create", "destroy", "modify", "percieve"];
const spell_subjects = ["water", "air", "fire", "plant", "illusions", "mind", "body", "animal", "earth", "metal"];

function findSumOfArray(array) {
    console.log(array);
    return array.reduce((acc, cur) => acc + cur, 0);
}

function findLowestNumberInArray(array) {
    return array.reduce((a, b) => Math.min(a, b));
}

function findHighestNumberInArray(array) {
    let max = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }

    return max;
}

function rollxdx(number_of_dice, number_of_sides) {
    dice_pool = [];
    for (let d = 0; d < number_of_dice; d++) {
        const roll = Math.floor(Math.random() * number_of_sides +1 );
        dice_pool.push(roll);
    }
    return dice_pool;
}

function roll1dx(die_size) {
    return Math.floor(Math.random() * die_size) + 1;
}

function roll4d4() {
    return Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 4) + 1
    ).reduce((a, b) => a + b);
}

function capitalizeFirstLetter(inputElement) {
    if (inputElement.length > 0) {
        return inputElement.charAt(0).toUpperCase() + inputElement.slice(1).toLowerCase();
    }
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

const startingGear = [
    {item: "Torches", action: roll1dx(6)},
    {item: "Coins", action: roll1dx(10)},
    {item: "Supplies", action: roll1dx(4)},
];


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

    const amountTorches = roll1dx(6);
    const amountCoins = roll1dx(10);
    const amountSupplies = roll1dx(4);

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

    
    displayGear.innerHTML = `
        <br>
        <b>Level 1 Saving Throws</b>
        <br>Paralysis, Poison, Death: 8
        <br>Rods, Sticks, Wands: 7
        <br>Petrification or Metamorphosis: 6
        <br>Dragon's Breath: 5
        <br>Spells: 4
        <br><br>
        <b>Gear</b>
        <br>Armor: ${charClass.armor}
        <br>Weapon: ${charClass.weapon}
        <br>Backpack: ${charClass.gear},
        Torches (${amountTorches})
        Coins (${amountCoins})
        Supplies (${amountSupplies})
    `;
};

const monsters = [
    {"type": "common", hd: () => roll1dx(4), attacks: () => 1},
    {"type": "miniboss", hd: () => roll1dx(8), attacks: () => findLowestNumberInArray(rollxdx(2, 4))},
    {"type": "boss", hd: () => roll1dx(12), attacks: () => findHighestNumberInArray(rollxdx(2, 4))},
    {"type": "legendary", hd: () => roll1dx(20), attacks: () => roll1dx(8)}
];

const btnGenerateMonster = document.querySelector("#btn-generate-monster");
const displayGenerateMonster = document.querySelector("#display-generate-monster");
const btnsMonsterType = document.querySelectorAll(".btn-monster");

function findMonsterType(button) {
    const monster = monsters.find(type => type["type"] === button.value);
    return monster;
};

btnsMonsterType.forEach(button => {
    button.addEventListener('click', () => {

        const monster = findMonsterType(button);

        const monster_hd = monster.hd();
        console.log(`HD: ${monster_hd}`)
        
        const monster_hp = findSumOfArray(rollxdx(monster_hd, 6));
        console.log(`HP: ${monster_hp}`);

        const monster_attacks = monster.attacks();
        
        console.log(`Attacks: ${monster_attacks}`);

        // These stats are generated the same regardless of type:
        const monster_ac = roll1dx(10);
        const roll_3d6 = rollxdx(3, 6);
        const monster_save = findSumOfArray(roll_3d6);
        const roll2d4 = rollxdx(2, 4);
        console.log(roll2d4);
        const monster_attack_bonus = findLowestNumberInArray(roll2d4);
        console.log(monster_attack_bonus);

        // Display Monster Stats:
        displayGenerateMonster.innerHTML = `
            Monster Type: ${monster['type']}
            <br>AC: ${monster_ac}, HD: ${monster_hd}, HP: ${monster_hp}
            <br>Attacks: ${monster_attacks}
            <br>Save: ${monster_save}
            <br>Attack and Special Bonus: +${monster_attack_bonus}
        `; 
    });
});


const frameDisplayTable = document.getElementById('frame-display-table');
frameDisplayTable.classList.add('hide');
const tableRowFighter = document.getElementById('table-row-fighter');
const tableRowRogue = document.getElementById('table-row-rogue');
const tableRowWizard = document.getElementById('table-row-wizard');
const frameDisplayCharacter = document.getElementById('frame-display-character');
const displayCharacter = document.getElementById('display-character');
const displayAbilityScores2 = document.getElementById('display-ability-scores2');
const displayGear = document.getElementById('display-gear');


tableRowFighter.addEventListener('click', () => {
    generateCharacterDetails('Fighter');
});

tableRowRogue.addEventListener('click', () => {
    generateCharacterDetails('Rogue');
});

tableRowWizard.addEventListener('click', () => {
    generateCharacterDetails('Wizard');
});

function get_value_from_array(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
};

const btnCreateSpell = document.querySelector("#btn-create-spell");
const displayCreateSpell = document.querySelector("#display-create-spell");

btnCreateSpell.addEventListener('click', () => {
    const random_spell_range = roll1dx(20);
    const random_spell_verb = get_value_from_array(spell_verbs);
    const random_spell_subject = get_value_from_array(spell_subjects);

    const random_spell_verb_caps = capitalizeFirstLetter(random_spell_verb);
    const random_spell_subject_caps = capitalizeFirstLetter(random_spell_subject);
    displayCreateSpell.innerHTML = `${random_spell_verb_caps} ${random_spell_subject_caps}, Range ${random_spell_range} ft.`
});