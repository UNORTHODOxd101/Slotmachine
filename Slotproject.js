//1. Accept the deposit from the player
//2. Determine the number of slots to bet on.
//3. Determine the amount to bet on each slot.
//4. Spin the slots.
//5. Check the results of the slots.
//6. Pay the player if they win.
//7. Update the player's balance.
//8. Play again or cash out.

const prompt = require('prompt-sync')(); //import prompt-sync module


const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
"A": 2,
"K": 4,
"Q": 6,
"J": 8,
} // This denotes how many of each symbol is in the slot machine

const SYMBOL_VALUES = {
"A": 5,
"K": 4,
"Q": 3,
"J": 2,
} // This denotes how much each symbol is worth




function deposit(amount) {
    while (true) {
    // Accept the deposit from the player
         const depositAmount = prompt("Enter the amount you want to deposit: ");
         const numberDepositAmount = parseFloat(depositAmount); //convert string to number after user input
        
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Please enter a valid number");
        } else {
            return numberDepositAmount;
        }
    }
};

function getNumberOfLines() {
    while (true) {
    // Determine the number of slots to bet on.
         const lines = prompt("Enter the number of lines you wish to bet on (1-3): ");
         const numberOfLines = parseFloat(lines); //convert string to number after user input
        
        if (isNaN(numberOfLines) || numberOfLines <= 0  || numberOfLines > 3) {
            console.log("Invalid number of lines. Please enter a number between 1 and 3");
        } else {
            return numberOfLines;
        }
    }
};



function betAmount(balance, lines ) { 
    while (true) {
    // Determine the amount to bet on each slot.
        const bet = prompt("Enter the amount you want to bet on each line: ");
        const betAmount = parseFloat(bet); //convert string to number after user input
        
        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
            console.log("Invalid bet amount. Please enter a valid number");
        } else {
            return betAmount;
        }
    }
};

function spinSlots(){
    const symbols = []; //arrays are reference data types allows us to store multiple values in a single variable and manipulate them.
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){ 
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
}//loop through the object and get the key and value of the object
const slots = [[],[],[]]; // 2D array representing each column in the slot machine
for (let i = 0; i < ROWS; i++) {
    const slotSymbols = [...symbols]; //copy the symbols array
    for (let j = 0; j < COLUMNS; j++) {
        const randomIndex = Math.floor(Math.random() * slotSymbols.length);
        const selectedSymbol = slotSymbols[randomIndex];
        slots[j].push(selectedSymbol);
        slotSymbols.splice(randomIndex, 1); //remove the selected symbol from the array
    }
}
return slots;
}
  
//now we need to transposed the slots array to get the rows

const transpose = (slots) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLUMNS; j++) {
            rows[i].push(slots[j][i]);
        }
    }
    return rows;
}


const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | "
            }
        } 
        console.log(rowString);
    }
}

function getWinnings (rows, betAmount, numberOfLines) {
    let winnings = 0;
    for (let row = 0; row < ROWS; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += SYMBOL_VALUES[symbols[0]] * betAmount;
        }
    }
    return winnings;
};

function game () {

let balance = deposit();

while (true) {
console.log("Your balance is $" + balance.toString());
const numberOfLines = getNumberOfLines();
const bet = betAmount(balance, numberOfLines);
balance -= bet * numberOfLines;
const slots = spinSlots();
const rows = transpose(slots);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines);
balance += winnings;
console.log("You Won, $" + winnings.toString());

if (balance <= 0) {
    console.log("You have run out of money");
    break;
}
const playAgain = prompt("Do you want to play again? (y/n): ");
if (playAgain.toLowerCase() != "y") {
    break;
}
}
console.log("Your final balance is $" + balance.toString());
}



game();