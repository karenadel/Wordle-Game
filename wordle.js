let answer="CLICK";


function newGame() {
    const inputs = document.querySelectorAll(".inputfield");
    inputs.forEach(input => {
        input.value = "";
        input.style.backgroundColor = "";
        input.style.border = "";
    });
    game(1);
}
function game(ind){
    console.log("game with index ="+ind);
    if(ind>6) {alert("Better luck next time! The word was: "+answer);return;}

    let hash = new Array(26).fill(0);
    for (let i = 0; i < answer.length; i++) {
        hash[answer.charCodeAt(i) - "A".charCodeAt(0)]++;
    }

    const inputs = document.querySelectorAll(".inputfield"+ind);
    inputs[0].focus();
    let cnt=0;

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value.length === input.maxLength) {
                if (index < inputs.length - 1) {
                    cnt++;
                    inputs[index + 1].focus();
                }
                if(index===inputs.length - 1) cnt++;
            }
        });
        input.addEventListener("keydown",(event)=>{
            if (event.key === "Backspace" && cnt>=1) {
                    cnt--;
                    inputs[cnt].focus();
                    //console.log(cnt);
                }
        });
        input.addEventListener("keydown",(event)=>{
            console.log(event.key);
            console.log(cnt);
            if (event.key === "Enter") {
                    if(cnt===5){
                        let green=0;
                        for(let i=0;i<=4;i++){
                            if(answer[i]===inputs[i].value.toUpperCase()){
                                inputs[i].style.backgroundColor='#55b44d';
                                inputs[i].style.border='2px solid #007233';
                                hash[answer.charCodeAt(i) - 'A'.charCodeAt(0)]--;
                                green++;
                            }
                            else if(hash[inputs[i].value.toUpperCase().charCodeAt(0) - "A".charCodeAt(0)]>0){
                                inputs[i].style.backgroundColor='#e1a733';
                                inputs[i].style.border='2px solid #996704';
                                hash[inputs[i].value.toUpperCase().charCodeAt(0) - "A".charCodeAt(0)]--;
                            }
                            else {
                                inputs[i].style.backgroundColor='#5e5e60';
                                inputs[i].style.border='2px solid #17171b';
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



////////////////
//// cnt is completely broken
//// style alerts
//// get new words from dictionary each new game
//// add functionality to header buttons
//// a new game landing screen
//// store statistics
////////////////
