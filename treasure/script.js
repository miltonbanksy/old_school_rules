const inputNumberOfTreasure = document.querySelector('#input-number-of-treasure');
const inputNumberOfPcs = document.querySelector('#input-number-of-pcs');
const inputNumberOfHirelings = document.querySelector('#input-number-of-hirelings');
const btnDivideTreasure = document.querySelector('#btn-divide-treasure');
const displayTreasureDistribution = document.querySelector('#display-treasure-distribution');

inputNumberOfPcs.value = 1;
inputNumberOfHirelings.value = 0;

 
btnDivideTreasure.addEventListener('click', () => {
    const total_treasure = Number(inputNumberOfTreasure.value);
    const total_pcs = Number(inputNumberOfPcs.value);
    let total_hirelings = Number(inputNumberOfHirelings.value);

    const hirelingZero = (total_hirelings <= 0) ? 0 : 0.5;

    const pc_display = (total_pcs <= 1) ? "PC" : "PCs";
    const pc_gets = (total_pcs <=1) ? "gets" : "each get";

    let hireling_display = "";
    let hireling_gets = "";

    

    // Get the number of shares
    const numberOfShares = total_pcs + (total_hirelings * hirelingZero);
    
    // Get the value of a full-share
    const full_share = total_treasure / numberOfShares;

    // Get the value of a half-share (rounded down)
    let half_share_rounded = 0;
    let half_share = 0;

    if ( total_hirelings == 1 ) {
        half_share_rounded = Math.floor(full_share / 2);
        half_share = half_share_rounded, " gp";
        hireling_display = "Hireling";
        hireling_gets = "gets";
    } else if ( total_hirelings <= 0 ) {
        total_hirelings = 0;
        half_share = "";
        hireling_display = "Hirelings";
        hireling_gets = "";
    } else {
        half_share_rounded = Math.floor(full_share / 2);
        half_share = half_share_rounded, " gp";
        hireling_display = "Hirelings";
        hireling_gets = "each get";
    }

    // Find the total amount to pay all hirelings
    const total_pay_all_hirelings = half_share * total_hirelings;

    // Find the remaining treasure after paying the hirelings
    const treasure_after_hirelings = total_treasure - total_pay_all_hirelings;

    // Divide remaining treasure between all PCs
    const treasure_per_pc = Math.floor(treasure_after_hirelings / total_pcs);

    const leftover = treasure_after_hirelings % total_pcs;


    displayTreasureDistribution.innerHTML = `
        Total Treasure: ${total_treasure} gp
        <br>${total_pcs} ${pc_display} ${pc_gets} ${treasure_per_pc} gp
        <br>${total_hirelings} ${hireling_display} ${hireling_gets} ${half_share}
        <br>Total Hireling Pay: ${total_pay_all_hirelings} gp
        <br>Remaining Treasure: ${leftover} gp
        `
});