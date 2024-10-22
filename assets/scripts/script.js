let audio = document.querySelector("audio");
let play = document.querySelector(".play");
let fullDuration = document.querySelector(".full-time");
let startTime = document.querySelector(".start-time");
let slider = document.querySelector(".track-slider");
let trackBar = document.querySelector(".track-bar");
let output = document.querySelector("output");
let volume = document.querySelector(".volume-slider");
let disk = document.querySelector(".disk");
let form = document.querySelector("form");
let ol = document.querySelector("ol");
let addSong = document.querySelector(".add");
let trackName = document.querySelector(".track-name");
let body = document.querySelector("body");

//Prevent the form from reloading the page
form.addEventListener("submit", (e)=>{
    e.preventDefault();
})

function createLi() {
    let createdAudio = document.createElement("audio");
    createdAudio.setAttribute('preload', 'metadata');
    body.appendChild(createdAudio);
    
    let li = document.createElement("li");
    li.textContent = form.file.value;
    ol.appendChild(li);
    li.addEventListener("click", ()=>{
        audio.removeAttribute("src");
        console.log(audio);
        // console.log(createdAudio);
        let fileName = li.textContent.slice(12,li.textContent.length);
        console.log(fileName);
        audio.setAttribute("src", `assets/audio/${fileName}`);
        trackName.textContent = fileName;
        // console.log(li);
    })
    console.log(`assets/audio/${li.textContent}`);
    console.log(audio);
}

addSong.addEventListener("click", createLi);
// output.textContent = volume.value;

play.addEventListener("click", ()=>{
    if (audio.paused) {
        audio.play();
        play.innerHTML = '||';
        disk.style.setProperty('animation-play-state', 'running');
    }
    
    else {
        audio.pause();
        play.innerHTML = '|<span>></span>';
        disk.style.setProperty('animation-play-state', 'paused')
    }
})

audio.addEventListener('loadedmetadata', ()=>{
    displayAudioDuration(audio.duration);
})

audio.addEventListener('timeupdate', ()=>{
    slider.value = Math.floor(audio.currentTime);
    trackBar.style.setProperty('--seek-before-width', audio.currentTime / audio.duration * 100 + '%');
    startTime.textContent = calcDuration(audio.currentTime);
})

//Function that formats the duration of the audio in mm:ss
function calcDuration(secs) {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);
    let returnedSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSecs}`;
}

//Displays the duration of the audio
function displayAudioDuration(param) {
    fullDuration.textContent = calcDuration(param);
}


function showRangeProgress(rangeInput) {
    if (rangeInput === slider) {
        trackBar.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        startTime.textContent = calcDuration(rangeInput.value);
        // console.log(startTime);
    }
    
    else {
        output.textContent = rangeInput.value;
        volume.style.setProperty('--seek-before-width', rangeInput.value + '%');
        // console.log(volume);
    }
}
volume.addEventListener('input', (e)=>{
    showRangeProgress(e.target);
})

slider.addEventListener('input', (e)=>{
    showRangeProgress(e.target);
    audio.currentTime = slider.value;  
})

//Handling the slider
//Setting the max value to the duration of the audio in seconds
function setSliderMax() {
    slider.max = Math.floor(audio.duration);
}
if (audio.readyState > 0) {
    
}

//This conditional simply displays the duration if available or adds an event listener to do so when available
if (audio.readyState > 0) {
    displayAudioDuration(audio.duration);
    setSliderMax();
}
    else {
        audio.addEventListener('loadedmetadata', ()=>{
            displayAudioDuration(audio.duration);
            setSliderMax();
        });
        
    }

// let bufferedAmount = audio.seekable.end(audio.seekable.length - 1);
console.log(audio.seekable.length);


