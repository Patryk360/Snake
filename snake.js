const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 806, 806);

let leaderboard = [];

let myName = "Patryk";
let started = false;
let interval;
let x = 0;
let y = 0;
let xPlus = true;
let xMinus = false;
let yPlus = false;
let yMinus = false;

let turn;

let yFood = 0;
let xFood = 0;
let snakeLength = 1;
let point = 0;
let multiFood = false;

const randomFood = [];

let i = 0;
while (i < 780) {
    i += 26;
    randomFood.push(i);
}

document.getElementById("name").value = myName;
leaderboard.push({name: myName, point: 0});

const leaderboardF = () => {
    let topHTML = "<tr><th>Name</th><th>Point</th></tr>";

    for (const topName of leaderboard) {
        topHTML += `<tr><td>${topName.name}</td><td>${topName.point}</td></tr>`;
    }

    document.getElementById("leaderboard").innerHTML = topHTML;
}

leaderboardF();

const snake = (x, y) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 806, 806);

    for (let i = 0; i<snakeLength; i++) {
        ctx.fillStyle = 'black';
        ctx.fillRect((0+x)-(26*i), 0+y, 20, 20);
    }

    ctx.fillStyle = 'yellow';
    ctx.fillRect(xFood, yFood, 20, 20);

    ctx.fillStyle = 'red';
    ctx.fillRect(26+x, 0+y, 20, 20);

    if ((26+x == xFood)&&(0+y == yFood)) {
        snakeLength += 1;
        yFood = randomFood[Math.floor(Math.random()*randomFood.length)];
        xFood = randomFood[Math.floor(Math.random()*randomFood.length)];

        point += 10;
        if (multiFood) point += 20;
        if (snakeLength == 5) multiFood = true;

        document.getElementById("point").innerHTML = point;
        const leader = leaderboard.find(a => a.name == myName);
        leader.point += 10;
        if (multiFood) leader.point += 20;
        leaderboardF();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 806, 806);
    
        ctx.fillStyle = 'black';
        ctx.fillRect(0+x, 0+y, 20, 20);
    
        ctx.fillStyle = 'yellow';
        ctx.fillRect(xFood, yFood, 20, 20);
    
        ctx.fillStyle = 'red';
        ctx.fillRect(26+x, 0+y, 20, 20);
    }
}

const start = () => {
    if (started) return;
    started = true;
    yFood = randomFood[Math.floor(Math.random()*randomFood.length)];
    xFood = randomFood[Math.floor(Math.random()*randomFood.length)];
    interval = setInterval(() => {
        if (x > 806) x = 0;
        if (y > 806) y = 0;
        snake(x, y);
        if (xPlus) x += 26;
        if (xMinus) x -= 26;
        if (yPlus) y += 26;
        if (yMinus) y -= 26;
    }, 500);
}

const stop = () => {
    started = false;
    clearInterval(interval);
    x = 0;
    y = 0;
    snakeLength = 1;
    point = 0;
    multiFood = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 806, 806);
}

const changeName = () => {
    const nameValue = document.getElementById("name").value;
    myName = nameValue;
    const leader = leaderboard.find(a => a.name == myName);
    if (!leader) leaderboard.push({name: myName, point: 0});
    document.getElementById("point").innerHTML = point;
    leaderboardF();
}

document.addEventListener('keydown', (event) => {
    const name = event.key;
    if (started) {
        if (name === "w") {
            xPlus = false;
            xMinus = false;
            yPlus = false;
            yMinus = true;
        }
        if (name === "s") {
            xPlus = false;
            xMinus = false;
            yPlus = true;
            yMinus = false;
        }
        if (name === "a") {
            xPlus = false;
            xMinus = true;
            yPlus = false;
            yMinus = false;
        }
        if (name === "d") {
            xPlus = true;
            xMinus = false;
            yPlus = false;
            yMinus = false;
        }
    }
});