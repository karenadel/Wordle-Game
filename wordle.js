let answer;
let cntByRow = [0,0,0,0,0,0,0];
let hashByRow = [null,null,null,null,null,null,null];
let arr = [];

const message = document.querySelector("#message");

function showMessage(text) {
    console.log(text);
    message.innerHTML = text;
    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show");
    }, 1500);
}

function newGame() {
    answer = WORDS[Math.floor(Math.random() * WORDS.length)];
    const inputs = document.querySelectorAll(".inputfield");
    inputs.forEach(input => {
        input.value = "";
        input.style.backgroundColor = "";
        input.style.border = "";
    });
    const keys = document.querySelectorAll(".key");
    keys.forEach(key=>{
        key.style.backgroundColor = "";
        key.style.border = "";
    })
    cntByRow.fill(0);
    arr = [];
    game(1);
}
function game(ind){
    console.log("game with index ="+ind);
    if(ind>6) {showMessage("Better luck next time! The word was: "+answer); return;}

    let hash = new Array(26).fill(0);
    for (let i = 0; i < answer.length; i++) {
        hash[answer.charCodeAt(i) - "A".charCodeAt(0)]++;
    }
    hashByRow[ind] = hash;
    arr = [];

    const inputs = document.querySelectorAll(".inputfield"+ind);
    inputs[0].focus();
    if (inputs[0].dataset.bound) return; 
    inputs[0].dataset.bound = "true";    

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value.length === input.maxLength) {
                if (index < inputs.length - 1) {
                    cntByRow[ind]++;
                    inputs[index + 1].focus();
                }
                if(index===inputs.length - 1) cntByRow[ind]++;
            }
        });
        input.addEventListener("keydown",(event)=>{
            if (event.key === "Backspace" && cntByRow[ind]>=1) {
                    cntByRow[ind]--;
                    inputs[cntByRow[ind]].focus();
                    inputs[cntByRow[ind]].value = "";
                    //console.log(cnt);
                }
        });
        input.addEventListener("keydown",(event)=>{
            console.log(event.key);
            console.log(cntByRow[ind]);
            if (event.key === "Enter") {
                    if(cntByRow[ind]===5){
                        let hash = hashByRow[ind];
                        let green=0;
                        for(let i=0;i<5;i++){
                            if(answer[i]===inputs[i].value.toUpperCase()){
                                inputs[i].style.backgroundColor='#55b44d';
                                inputs[i].style.border='2px solid #007233';
                                const key=document.querySelector(".key"+answer[i]);
                                key.style.backgroundColor='#55b44d';
                                key.style.border='2px solid #007233';
                                hash[answer.charCodeAt(i) - 'A'.charCodeAt(0)]--;
                                green++;
                            }
                            else arr.push(i);
                        }
                        for(let i=0;i<arr.length;i++){
                            if(hash[inputs[arr[i]].value.toUpperCase().charCodeAt(0) - "A".charCodeAt(0)]>0){
                                inputs[arr[i]].style.backgroundColor='#e1a733';
                                inputs[arr[i]].style.border='2px solid #996704';
                                const key=document.querySelector(".key"+inputs[arr[i]].value.toUpperCase());
                                key.style.backgroundColor='#e1a733';
                                key.style.border='2px solid #996704';
                                hash[inputs[arr[i]].value.toUpperCase().charCodeAt(0) - "A".charCodeAt(0)]--;
                            }
                            else {
                                inputs[arr[i]].style.backgroundColor='#5e5e60';
                                inputs[arr[i]].style.border='2px solid #17171b';
                                const key=document.querySelector(".key"+inputs[arr[i]].value.toUpperCase());
                                key.style.backgroundColor='#5e5e60';
                                key.style.border='2px solid #17171b';
                            }
                        }
                        setTimeout(() => {
                            if (green === 5) {
                                showMessage("Correct!");
                                wonthegame=true;
                                return;
                            }
                            game(ind + 1);
                        }, 300);//game logic will be added later
                    }
                    else {
                        const row = document.querySelector(".guess" + ind);
                        row.classList.add("shake");
                        row.addEventListener("animationend", () => row.classList.remove("shake"), { once: true });
                        showMessage("Not enough letters");
                    }
                }
        });
        
    });
}

const keys = document.querySelectorAll(".key");

keys.forEach(key => {
    key.addEventListener("mousedown", (e) => e.preventDefault()); // keep focus on the input field
    key.addEventListener("click", () => {
        const currentInput = document.activeElement;
        if (!currentInput.classList.contains("inputfield")) return; // safety check
        currentInput.value = key.textContent;
        currentInput.dispatchEvent(new Event("input"));
    });
});

document.querySelector(".backspace").addEventListener("mousedown", (e) => e.preventDefault());
document.querySelector(".backspace").addEventListener("click", () => {
    document.activeElement.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Backspace" })
    );
});

document.querySelector(".enter").addEventListener("mousedown", (e) => e.preventDefault());
document.querySelector(".enter").addEventListener("click", () => {
    document.activeElement.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter" })
    );
});



//////////////// TODO /////////////////////////
//// Animations (tile flip for reveal)
//// a new game landing screen
//// add functionality to header buttons (hints, themes, game modes, statistics)
//// store statistics
//// valid dectionary guesses only
//////////////////////////////////////////////

//////// later we can use an api to fetch a new word each time a new game is started. For now, we can just hardcode the answer variable to a specific word.