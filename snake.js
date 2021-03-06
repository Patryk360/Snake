const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 806, 806);

let leaderboard = [];

let fps = 2;
let myName = "Patryk";
let started = false;
let interval;
let x = 0;
let y = 0;
let xPlus = true;
let xMinus = false;
let yPlus = false;
let yMinus = false;

let head = {};
let parts = [];
let turns = [];

let yFood = 0;
let xFood = 0;
let snakeLength = 1;
let point = 0;
let multiFood = false;

const eat = new Audio("./sound/food.mp3");

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

    leaderboard.sort((a, b) => {
        return a.point - b.point;
    });
    leaderboard.reverse();

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

    parts = [];

    ctx.fillStyle = 'red';
    ctx.fillRect(26+x, 0+y, 20, 20);

    head = {x: 26+x, y: 0+y};

    for (let i = 0; i<snakeLength; i++) {
        ctx.fillStyle = 'black';
        ctx.fillRect((0+x)-(26*i), 0+y, 20, 20);
        parts.push({x: (0+x)-(26*i), y: 0+y});
    }

    ctx.fillStyle = 'yellow';
    ctx.fillRect(xFood, yFood, 20, 20);

    if ((26+x == xFood)&&(0+y == yFood)) {
        snakeLength += 1;
        eat.play();
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

        parts = [];

        ctx.fillStyle = 'red';
        ctx.fillRect(26+x, 0+y, 20, 20);

        head = {x: 26+x, y: 0+y};
    
        for (let i = 0; i<snakeLength; i++) {
            ctx.fillStyle = 'black';
            ctx.fillRect((0+x)-(26*i), 0+y, 20, 20);
            parts.push({x: (0+x)-(26*i), y: 0+y});
        }
    
        ctx.fillStyle = 'yellow';
        ctx.fillRect(xFood, yFood, 20, 20);
    }
}

const start = () => {
    if (started) return;
    started = true;
    yFood = randomFood[Math.floor(Math.random()*randomFood.length)];
    xFood = randomFood[Math.floor(Math.random()*randomFood.length)];
    interval = setInterval(() => {
        if (x > 780) x = 0;
        if (y > 780) y = 0;
        if (x < 0) x = 780;
        if (y < 0) y = 780;
        snake(x, y);
        if (xPlus) x += 26;
        if (xMinus) x -= 26;
        if (yPlus) y += 26;
        if (yMinus) y -= 26;
        console.log(parts);
    }, 1000/fps);
}

const stop = () => {
    started = false;
    clearInterval(interval);
    x = 0;
    y = 0;
    snakeLength = 1;
    point = 0;
    multiFood = false;
    document.getElementById("point").innerHTML = point;
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

            turns.push({ x: 26+x, y: y, up: true, down: false, left: false, right: false });
        }
        if (name === "s") {
            xPlus = false;
            xMinus = false;
            yPlus = true;
            yMinus = false;

            turns.push({ x: 26+x, y: y, up: false, down: true, left: false, right: false });
        }
        if (name === "a") {
            xPlus = false;
            xMinus = true;
            yPlus = false;
            yMinus = false;

            turns.push({ x: 26+x, y: y, up: false, down: false, left: true, right: false });
        }
        if (name === "d") {
            xPlus = true;
            xMinus = false;
            yPlus = false;
            yMinus = false;

            turns.push({ x: 26+x, y: y, up: false, down: false, left: false, right: true });
        }
    }
});