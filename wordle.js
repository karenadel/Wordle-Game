let answer;
let cntByRow = [0,0,0,0,0,0,0];
let hashByRow = [null,null,null,null,null,null,null];
let arr = [];
let gotC=false; let gotV=false;
let mode=0;
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
    gotC=false; gotV=false;
    answer = WORDS[Math.floor(Math.random() * WORDS.length)];
    console.log(answer);
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

    let div = document.querySelector(".consonant");
    let p = div.querySelector("p");
    if (p) {
        p.remove();
    }
    let div2 = document.querySelector(".vowel");
    let p2 = div2.querySelector("p");
    if (p2) {
        p2.remove();
    }

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
            input.value = input.value.replace(/[^a-zA-Z]/g, "");
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
        // 
        input.addEventListener("keydown",(event)=>{
            console.log(event.key);
            console.log(cntByRow[ind]);
            if (event.key === "Enter") {
                if(cntByRow[ind]===5){
                    let hash = hashByRow[ind];
                    let green=0;
                    let colors = [];

                    for (let i = 0; i < 5; i++) {
                        if (answer[i] === inputs[i].value.toUpperCase()) {
                            colors[i] = { bg: '#55b44d', border: '2px solid #007233', letter: answer[i] };
                            hash[answer.charCodeAt(i) - 'A'.charCodeAt(0)]--;
                            green++;
                        } else arr.push(i);
                    }

                    for (let i = 0; i < arr.length; i++) {
                        const idx = arr[i];
                        const letter = inputs[idx].value.toUpperCase();
                        if (hash[letter.charCodeAt(0) - "A".charCodeAt(0)] > 0) {
                            colors[idx] = { bg: '#e1a733', border: '2px solid #996704', letter };
                            hash[letter.charCodeAt(0) - "A".charCodeAt(0)]--;
                        } else {
                            colors[idx] = { bg: '#5e5e60', border: '2px solid #17171b', letter };
                        }
                    }

                    const flipDuration = 500; // must match CSS animation duration
                    const stagger = 300;      // delay between each tile starting its flip

                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            inputs[i].classList.add("flip");
                            setTimeout(() => {
                                inputs[i].style.backgroundColor = colors[i].bg;
                                inputs[i].style.border = colors[i].border;
                                const key = document.querySelector(".key" + colors[i].letter);
                                if (colors[i].bg === '#55b44d' || key.style.backgroundColor !== 'rgb(85, 180, 77)') {
                                    key.style.backgroundColor = colors[i].bg;
                                    key.style.border = colors[i].border;
                                }
                            }, flipDuration / 2); // swap color when tile is edge-on
                        }, i * stagger);
                    }

                    setTimeout(() => {
                        if (green === 5) {
                            showMessage("Correct!");
                            wonthegame = true;
                            return;
                        }
                        game(ind + 1);
                    }, 4 * stagger + flipDuration + 100);
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

function showHint(){
    const disp=document.querySelector(".hintDisplay");
    console.log(disp);
    disp.style.display="flex";
}
function selectMode(){
    const disp=document.querySelector(".modedisplay");
    console.log(disp);
    disp.style.display="flex";
    disp.addEventListener("click", function(event){
        if (event.target === disp) {
            disp.style.display = "none";
        }
    });
}
function closeHint(){
    const disp=document.querySelector(".hintDisplay");
    disp.style.display="none";
}



function showConsonant(){
    if(gotC) return;
    if(answer!==""){
        let answeranswer=answer+answer;
        let i = Math.floor(Math.random() * 5);;
        let x=i;
        let cons; let cb=false;
        for(;i<(5+x);i++){
            if(!(answeranswer[i]==='A'||answeranswer[i]==='E'||answeranswer[i]==='I'||answeranswer[i]==='O'||answeranswer[i]==='U')){
                cb=true; cons=answeranswer[i];
            }
            if(cb) break;
        }
        let container = document.querySelector(".consonant");
        let p = document.createElement("p");
        p.textContent = cons;
        container.appendChild(p);
        gotC=true;
    }
    // else{
    //     let container = document.getElementById("consonant");
    //     let p = document.createElement("p");
    //     p.textContent = "No game started!";
    //     container.appendChild(p);
    // }
}

function showVowel(){
    if(gotV) return;
    let vow; let vb=false;
    if(answer!==""){
        let i = Math.floor(Math.random() * 5);;
        let x=i;
        let answeranswer=answer+answer;
        for(;i<(5+x);i++){
            if(answeranswer[i]==='A'||answeranswer[i]==='E'||answeranswer[i]==='I'||answeranswer[i]==='O'||answeranswer[i]==='U'){
                vb=true; vow=answeranswer[i];
                console.log(vow);
            }
            if(vb) break;
        }
        let container = document.querySelector(".vowel");
            let p = document.createElement("p");
            p.textContent = vow;
            container.appendChild(p);
            gotV=true;
    }

}



function ModeShape(shape){
    const disp=document.querySelector(".modedisplay");
    disp.style.display="none";

    if(shape===1){
        console.log("staircase");
        const figure=document.querySelectorAll(".box-row");
        
        figure.forEach(function(fig){fig.style.display="flex";});

        const keyb=document.querySelector(".keyboard");
        keyb.style.opacity = "0";
        keyb.style.pointerEvents = "none";
        mode=1;
    }
}

function ExitMode(){
    const disp=document.querySelector(".modedisplay");
    disp.style.display="none";
    if(mode===1){
        const keyb=document.querySelector(".keyboard");
        keyb.style.opacity = "1";
        keyb.style.pointerEvents = "auto";

        const figure=document.querySelectorAll(".box-row");
        figure.forEach(function(fig){fig.style.display="none";});
    }
}





//////////////// TODO /////////////////////////
//// add game modes -> checkerboard, very hard(forcing greens in place 
//// add 3 themes
//// store statistics, make statistics button work, Daily streak
//// add a choose number of guesses option (3-10)
//// add a choose number of letters option (3-10)
//// valid dictionary guesses only
//////////////////////////////////////////////


//////// later we can store session using cookies or local storage to keep track of the number of games played, won, lost, and the current streak. We can also store the last played word to prevent repetition.