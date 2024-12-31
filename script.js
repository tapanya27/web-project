let emojis = ["😍", "🥲", "😎", "😭", "🤡", "💖", "💥", "✌", "😍", "🥲", "😎", "😭", "🤡", "💖", "💥", "✌"]

const grid = document.querySelector(".grid");
const reset = document.querySelector("button");
const result = document.getElementById('result');
 const scoreDisplay = document.createElement('div');
  scoreDisplay.classList.add('bold-result');
   document.querySelector('.container').appendChild(scoreDisplay);

   const timerDisplay = document.createElement('div'); 
    timerDisplay.classList.add('bold-result'); 
    document.querySelector('.container').appendChild(timerDisplay);

var lastClickedDiv = null
let startTime,endTime,timerInterval;
let score=0;
let timeLeft=120;

const shuffleEmojis = () => {
    for (let x = 15; x > 0; x--) {
        let y = Math.floor(Math.random()*(x+1))
        let temp = emojis[x]
        emojis[x] = emojis[y]
        emojis[y] = temp
    }
}

const reveal = (card, emoji) => {
    card.style.backgroundColor = "#fff"
    card.style.transform = "rotateY(180deg)"
    card.innerText = emoji
}

const cover = (card) => {
    card.style.backgroundColor = "#229b7f";
    card.style.transform = "rotateY(0deg)"
    card.innerText = ""
}
const updateScore = (points) => { 
    score += points;
     scoreDisplay.textContent = `Score: ${score}`;
};

const startTimer = () => {
     clearInterval(timerInterval);
      timeLeft = 120;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
         timerInterval = setInterval(() => {
             timeLeft -= 1;
              timerDisplay.textContent = `Time Left: ${timeLeft}s`;
               if (timeLeft <= 0) { 
                clearInterval(timerInterval);
                 alert('Time is up!'); 
                 reset.click(); 
                 } 
                }, 1000); 
            };


const createCards = () => {
    shuffleEmojis();
    grid.innerHTML="";
    score=0;
    scoreDisplay.textContent = `Score: ${score}`;

    for (let x = 0; x < 16; x++) {
        const div = document.createElement("div")
        div.classList.add("card")
        grid.appendChild(div);

        div.addEventListener("click",() => {
            reveal(div, emojis[x])
            if (lastClickedDiv !== null) {
                if (lastClickedDiv.innerText !== div.innerText) {
                    const clickedDiv = lastClickedDiv
                    const currentDiv = div
                    setTimeout(() => {
                        cover(clickedDiv);
                        cover(currentDiv);
                        updateScore(-1);
                    }, 500);
                
                }
                else {
                    updateScore(4);
                     if (Array.from(grid.querySelectorAll(".card")).every(card => card.innerText !== "")) 

                    {
                        clearInterval(timerInterval);
                         endTime = new Date(); 
                        let timeDiff = (endTime - startTime) / 1000;
                        timerDisplay.textContent=''; 
                        if(timeDiff>60){
                            let minutes=Math.floor(timeDiff/60);
                            let seconds=Math.floor(timeDiff%60);
                            result.textContent=`Congrats! You completed the game in ${minutes} min and ${seconds} sec.`;
                        }
                        else{
                     result.textContent=`Congrats! You completed the game in ${timeDiff.toFixed(2)} seconds.`; } }}
                lastClickedDiv = null
            } else {
                lastClickedDiv = div
            }
        })
    }
}


reset.addEventListener("click", () => {
    shuffleEmojis();
    const cards = Array.from(grid.querySelectorAll(".card"))
    cards.forEach((card) => {
        cover(card)
    });
    result.textContent='';
    startTime=new Date();
    score=0;
    scoreDisplay.textContent = `Score: ${score}`; 
    startTimer();
});
startTime=new Date();
startTimer();


createCards()