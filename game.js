const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

// console.log(score);

startScreen.addEventListener('click', start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

let player = { speed : 2, score: 0};

let keys = {
    ArrowRight:false,
    ArrowLeft:false,
    ArrowUp:false,
    ArrowDown:false
}

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(a,b){
    let aRect = a.getBoundingClientRect()
    let bRect = b.getBoundingClientRect()

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y >=(637+60)){
            item.y -= 780;
        }

        item.y += player.speed+1;
        item.style.top = item.y + 'px';
    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML= "Game Over <br> Your final score is " + (player.score+1) + " <br> Press here to restart the game."
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        if(isCollide(car, item)){
            endGame();
        }
        if(item.y >= 750){
            item.y = -550;
            item.style.left = Math.floor(Math.random()*350) + "px";
        }
        item.y += player.speed+1;
        item.style.top = item.y + 'px';
    })
}


function gamePlay(){

    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);

    if(player.start){

        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > 150){player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom-90)){player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width - 50)){player.x += player.speed}

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        player.score++
        score.innerText = "Score:  "+player.score;
    }
}


function start(){
    // gameArea.classList.remove('hide');
    gameArea.innerText ="";
    startScreen.classList.add('hide');
    score.classList.remove("hide");

    player.start = true;
    player.score = 0;

    window.requestAnimationFrame(gamePlay);


    for(let x=0; x<6; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*130);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    } 

    for(let x=0; x<4; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x+1)*330)*-1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random()*350) + "px";
        gameArea.appendChild(enemyCar);
    } 
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(- 2);
    }
    return '#'+ c() + c() + c();
}
