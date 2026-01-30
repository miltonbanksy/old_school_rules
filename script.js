// Old statNames as Array
//const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

const statNames = [
    {name: "Strength", bonus: "Melee Attack +2"},
    {name: "Dexterity", bonus: "Rogue Skills +2"},
    {name: "Constitution", bonus: "Hit Points +2"},
    {name: "Intelligence", bonus: "Spellcasting +2"},
    {name: "Wisdom", bonus: "Ranged Attack +2"},
    {name: "Charisma", bonus: "One ability score +2"}
];


const btnGenerateCharacter = document.getElementById('btn-generate-character');
const displayCharacter = document.getElementById('display-character');

function rollxdx(number_of_dice, die_size) {
    let dicePool = [];
    for (let d = 0; d < number_of_dice; d++) {
        const dice = Math.floor(Math.random() * die_size) + 1;
        dicePool.push(dice);
    }
    return dicePool;
}

function sumArray(array) {
    return array.reduce((a, b) => a + b, 0);
}

function generateStats() {
    let dicePool = [];
    for (let x = 0; x < statNames.length; x++) { // for each stat...
        const statScores = sumArray(rollxdx(4, 4))
        dicePool.push(statScores);
    }
    return dicePool;
}

function combineStatsAndScores(dicePool) {
    return Object.fromEntries(
        statNames.map((stat, index) => [stat, dicePool[index]])
    );
}

function generateBonuses(combined_stats_and_scores) {
    console.log(combined_stats_and_scores)
    Object.values(combined_stats_and_scores).forEach(value => {
        if (value >= 12) {
            // fixing this...
            //statNames.bonus...
            console.log(statNames);
        }
    })
}

function generateCharacter() {
    const dicePool = generateStats();

    const combined_stats_and_scores = combineStatsAndScores(dicePool);

    const bonuses = generateBonuses(combined_stats_and_scores);

    console.log(combined_stats_and_scores)

    
    
    return {
        dicePool,
        combined_stats_and_scores
    }
}

btnGenerateCharacter.addEventListener('click', () => {
    const character = generateCharacter();

    displayCharacter.innerHTML = Object.entries(character.objStats)
        .map(([stat, value]) => `<p>${stat}: ${value}</p>`)
        .join('');
});