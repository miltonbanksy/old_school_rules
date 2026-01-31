const statNames = [
    { key: "STR", name: "Strength", bonus: "Melee Attack" },
    { key: "DEX", name: "Dexterity", bonus: "Rogue Skills" },
    { key: "CON", name: "Constitution", bonus: "Hit Points" },
    { key: "INT", name: "Intelligence", bonus: "Spellcasting" },
    { key: "WIS", name: "Wisdom", bonus: "Ranged Attack" },
    { key: "CHA", name: "Charisma", bonus: "One ability score" }
];

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

function createCharacter() {
    return {
        abilities: {},
        bonuses: {}
    };
}

const btnGenerateCharacter = document.getElementById('btn-generate-character');
const displayCharacter = document.getElementById('display-character');

btnGenerateCharacter.addEventListener('click', () => {
    const character = createCharacter();
    
    character.abilities = generateAbilities();
    character.bonuses = generateBonuses(character.abilities);

    displayCharacter.innerHTML = statNames.map(stat => `
        <p>
            <strong>${stat.name}</strong> (${stat.key}):
            ${character.abilities[stat.key]}
            <em>- ${character.bonuses[stat.key]}</em>
        </p>
    `).join('');
});