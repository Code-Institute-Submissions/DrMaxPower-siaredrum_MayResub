/*jshint esversion: 6 */ 

// Global variables
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
// BPM = 120 
// 2000ms / 16 steps  = 125ms per stepInterval
var stepInterval = 125;
var colids = 15;
let sequencer;



for (let i = 0; i <= colids; i++) {
        // concatinate the ID for the targeted button   
    document.getElementById('kick'+String(i)).addEventListener('click', () => {

        // Trigger the function buttonHandler of the selected button
        buttonHandler('kick', kickCol, i);
    });

    document.getElementById('clap'+String(i)).addEventListener('click', () => {
        buttonHandler('clap', clapCol, i);
    });
    document.getElementById('ohat'+String(i)).addEventListener('click', () => {
        buttonHandler('ohat', ohatCol, i);
    });
    document.getElementById('crash'+String(i)).addEventListener('click', () => {
        buttonHandler('crash', crashCol, i);
    });
    document.getElementById('arumble'+String(i)).addEventListener('click', () => {
        buttonHandler('arumble', arumbleCol, i);
    });
    document.getElementById('brumble'+String(i)).addEventListener('click', () => {
        buttonHandler('brumble', brumbleCol, i);
    });
}

function buttonHandler(soundstring, sound, col) {
   
    if(sound[col]) {
        // If btn is trigged with sound + fx, reset sound and fx  

        document.querySelector('.'+soundstring+'col'+String(col)).
        style="border-radius: 0px;  box-shadow: none";
        document.querySelector('.'+soundstring+'col'+String(col)).innerHTML = "";
        sound[col] = false;

    } else {
        // If btn is not trigged with sound + fx, activate sound and fx

        document.querySelector('.'+soundstring+'col'+String(col)).
        style="border-radius: 50%; box-shadow: 0rem 0rem 1px 1px rgb(252 233 169 / 20%);";
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

                    // Reset Time of the trigged sound in the Sequence
                    document.getElementById('kick').currentTime = 0;

                    //  Play the sound of the activated btn in the Sequence
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

                    // Silence  the rumble of the other channel if they interfere
                    document.getElementById('brumble').currentTime = 1;

                    // Start direction sound is shifted for prefered sound.
                    document.getElementById('arumble').currentTime = 0.5;
                    document.getElementById('arumble').play();
                }
                if(brumbleCol[pos] == true) {
                    document.getElementById('arumble').currentTime = 1;
                    document.getElementById('brumble').currentTime = 0.3;     
                    document.getElementById('brumble').play();
                }

                // Sequencer position indicator 
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
    // activate the function stepTime with 125ms stepInterval for every colids in the loop
    stepTime();
    intervalseq = setInterval(() => {stepTime();}, stepInterval);
}
function startSeq() {
    runSeq();
    sequencer = setInterval(() => {
        runSeq();
    },16*stepInterval);
}

document.getElementById('play').addEventListener('click', () => {
    // Target the play btn if the Sequence should play or stop
    playState = !playState;
    if(playState) {
        startSeq();
        document.querySelector(".fa-play").className = "fas fa-pause";
    } else {
        clearInterval(sequencer);
        document.querySelector(".fa-pause").className = "fas fa-play";
    }
});
