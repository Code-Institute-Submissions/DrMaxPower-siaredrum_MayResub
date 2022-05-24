//document.addEventListener("DOMContentLoaded", )
let sequencer;
var playState = false;
var kickCol = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
};
var clapCol = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
};
var crashCol = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
};
var ohatCol = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
};
var arumbleCol = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
};
var brumbleCol = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false
};

var pos;           
var bpm = 125;    
var colids = 15;



for(let i = 0; i <= colids; i++) {          
    document.getElementById('kick'+String(i)).addEventListener('click', () => {
        buttonHandler('kick', kickCol, i);
    })
    document.getElementById('clap'+String(i)).addEventListener('click', () => {
        buttonHandler('clap', clapCol, i);
    })
    document.getElementById('ohat'+String(i)).addEventListener('click', () => {
        buttonHandler('ohat', ohatCol, i);
    })
    document.getElementById('crash'+String(i)).addEventListener('click', () => {
        buttonHandler('crash', crashCol, i);
    })
    document.getElementById('arumble'+String(i)).addEventListener('click', () => {
        buttonHandler('arumble', arumbleCol, i);
    })
    document.getElementById('brumble'+String(i)).addEventListener('click', () => {
        buttonHandler('brumble', brumbleCol, i);
    })
}

function buttonHandler(soundstring, sound, col) {       
    if(sound[col]) {
        document.querySelector('.'+soundstring+'col'+String(col)).style="border-radius: 0px;";
        document.querySelector('.'+soundstring+'col'+String(col)).innerHTML = "";
        sound[col] = false;
    } else {
        document.querySelector('.'+soundstring+'col'+String(col)).style="border-radius: 50%;";
        if (soundstring=='kick') {
            document.querySelector('.'+soundstring+'col'+String(col)).innerHTML = "💣";
        }
        if (soundstring=='clap') {
            document.querySelector('.'+soundstring+'col'+String(col)).innerHTML = "👏🏽";
        }
        if (soundstring=='ohat') {
            document.querySelector('.'+soundstring+'col'+String(col)).innerHTML = "🥂";
        }
        if (soundstring=='crash') {
            document.querySelector('.'+soundstring+'col'+String(col)).innerHTML = "👒";
        }
        if (soundstring=='arumble') {
            document.querySelector('.'+soundstring+'col'+String(col)).innerHTML = "🌪️";
        }
        if (soundstring=='brumble') {
            document.querySelector('.'+soundstring+'col'+String(col)).innerHTML = "🌪️";
        }
        sound[col] = true;
    }
}

function runSeq() {
    let intervalseq;
    pos = 0;  
    function stepTime() {
        if(pos < 15) {
            for(let i = 0; i < colids; i++) {
                if(kickCol[pos] == true) {
                    document.getElementById('kick').currentTime = 0;
                    document.getElementById('kick').play();
                }
                if(clapCol[pos] == true) {
                    document.getElementById('clap').currentTime = 0;
                    document.getElementById('clap').play();
                }
                if(ohatCol[pos] == true) {
                    document.getElementById('ohat').currentTime = 0;
                    document.getElementById('ohat').play();
                }
                if(crashCol[pos] == true) {
                    document.getElementById('crash').currentTime = 0;
                    document.getElementById('crash').play();
                }
                if(arumbleCol[pos] == true) {
                    document.getElementById('arumble').currentTime = 0;
                    document.getElementById('arumble').play();
                }
                if(brumbleCol[pos] == true) {
                    document.getElementById('brumble').currentTime = 0;     
                    document.getElementById('brumble').play();
                }
                if(i == pos) {      
                    document.querySelector('.poscol'+String(pos)).style="background-color: yellow;";
                } else {
                    document.querySelector('.poscol'+String(i)).style="background-color: darkgray;";
                }
            }
            pos++;
        } else {
            clearInterval(intervalseq);
        }
    }
    stepTime();
    intervalseq = setInterval(() => {stepTime()}, bpm);
}
function startSeq() {
    runSeq();
    sequencer = setInterval(() => {
        runSeq();
    },2000);
}

document.getElementById('play').addEventListener('click', () => {
    playState = !playState;
    if(playState) {
        startSeq();
        document.querySelector(".fa-play").className = "fas fa-pause";
    } else {
        clearInterval(sequencer);
        document.querySelector(".fa-pause").className = "fas fa-play";
    }
});
