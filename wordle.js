let answer="SHORE";
let cntByRow = [0,0,0,0,0,0,0];
let hashByRow = [null,null,null,null,null,null,null];
let arr = [];

function newGame() {
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
    if(ind>6) {alert("Better luck next time! The word was: "+answer);return;}

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
                                alert("Correct!");
                                wonthegame=true;
                                return;
                            }
                            game(ind + 1);
                        }, 300);//game logic will be added later
                    }
                    else alert("Not enough letters");
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
//// Animations
//// a new game landing screen
//// valid dectionary guesses only
//// get new words from dictionary each new game
//// style alerts
//// add functionality to header buttons (hints, themes, game modes, statistics etc)
//// store statistics
//////////////////////////////////////////////
