
const symbolNos = {
   A: 3,
    B: 4,
    C: 5,
    D: 6
};

const symbolValues = {
   A: 10,
    B: 8,
    C: 6,
    D: 4
};

let balance = 0;

function setDeposit() {
    const depositAmount = parseFloat(document.getElementById('deposit').value);
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert('Invalid amount!');
    } else {
        balance = depositAmount;
        document.getElementById('balance').innerText = balance;
    }
}

function spin() {
    const lines = parseInt(document.getElementById('lines').value);
    const betAmount = parseFloat(document.getElementById('bet').value);

    if (isNaN(lines) || lines <= 0 || lines > 3) {
        alert('Invalid number of lines!');
        return;
    }
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > (balance / lines)) {
        alert('Invalid Bet Amount!');
        return;
    }

    
    const display = spinReels();
    displaySlots(display);
    const rows = transpose(display);
    const jackpot = calculateWinnings(rows, betAmount, lines);
    
    document.getElementById('result').innerText = 'You Won $' + jackpot;
    if(jackpot>0){
        balance += jackpot;
        document.getElementById('balance').innerText = balance;
    }
    else{
        balance -= betAmount * lines;
        document.getElementById('balance').innerText = balance;

    }


    if (balance <= 0) {
        alert('Your balance is insufficient');
    }
}

function spinReels() {
    const symbols = [];
    for (const [symbol, times] of Object.entries(symbolNos)) {
        for (let i = 0; i < times; i++) {
            symbols.push(symbol);
        }
    }

    const display = [[], [], []];
    for (let i = 0; i < 3; i++) {
        const reelSymbols = [...symbols];
        for (let j = 0; j < 3; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            display[i].push(reelSymbols[randomIndex]);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return display;
}

function transpose(display) {
    const rows = [];
    for (let i = 0; i < 3; i++) {
        rows.push([]);
        for (let j = 0; j < 3; j++) {
            rows[i].push(display[j][i]);
        }
    }
    return rows;
}

function displaySlots(display) {
    const displayDiv = document.getElementById('display');
    displayDiv.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'slot-column';
        display[i].forEach(symbol => {
            const p = document.createElement('p');
            p.innerText = symbol;
            columnDiv.appendChild(p);
        });
        displayDiv.appendChild(columnDiv);
    }
}

function calculateWinnings(rows, bet, lines) {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[1];
        if (symbols.every(symbol => symbol === symbols[0])) {
            winnings += bet * symbolValues[symbols[0]];
        }
    }
    
    return winnings;
}


function playAgain() {
    document.getElementById('deposit').value = '';
    document.getElementById('lines').value = '';
    document.getElementById('bet').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('display').innerHTML = '';
}
