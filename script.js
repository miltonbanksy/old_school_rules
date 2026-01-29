const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

const btnGenerateCharacter = document.getElementById('btn-generate-character');
const displayCharacter = document.getElementById('display-character');

function rollxdx(number_of_dice, die_size) {
    let dicePool = [];
    for (let d = 0; d < number_of_dice; d++) {
        const dice = Math.floor(Math.random() * die_size) + 1;
        dicePool.push(dice);
    }
    console.log(dicePool)
    return dicePool;
}

function sumArray(array) {
    return array.reduce((a, b) => a + b, 0);
}

function generateStats() {
    let dicePool = [];
    for (let x = 0; x < statNames.length; x++) { // for each stat...
        const roll4d4 = sumArray(rollxdx(4, 4))
        dicePool.push(roll4d4);
    }
    return dicePool;
}

function generateCharacter() {
    const dicePool = generateStats();
    console.log(dicePool)

    const objStats = Object.fromEntries(
        statNames.map((stat, index) => [stat, dicePool[index]])
    );
    
    return {
        objStats
    }
}

btnGenerateCharacter.addEventListener('click', () => {
    const character = generateCharacter();

    displayCharacter.innerHTML = Object.entries(character.objStats)
        .map(([stat, value]) => `<p>${stat}: ${value}</p>`)
        .join('');
});