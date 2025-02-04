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
let displayedTitle = document.querySelector(".track-name");
let body = document.querySelector("body");
let reset = document.querySelector(".reset");
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let trackList = {};

//Prevent the form from reloading the page
form.addEventListener("submit", (e)=>{
    e.preventDefault();
})

let currentValue;

for (let i = 0; i < localStorage.length; i++) {
    createLi(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    // console.log();
}


function createLi(name, location) {
    let li = document.createElement("li");
    let trackName = form.file.value;
    trackName = trackName.slice(12,trackName.length);
    if (name) {
        li.textContent = name;    
    }

    else {
        li.textContent = trackName;
    }
    ol.appendChild(li);
    let del = document.createElement("div");
    del.classList.add("del");
    del.textContent = "X";
    console.log(li);
    li.appendChild(del);
    del.addEventListener("click", ()=>{
        ol.removeChild(li);
    })
    li.addEventListener("click", ()=>{
        audio.removeAttribute("src");
        let fileName = trackName;
        if (name) {
            audio.setAttribute("src", `${location}`);    
            displayedTitle.textContent = name;
        }
        else {
            audio.setAttribute("src", `assets/audio/${fileName}`);
            displayedTitle.textContent = fileName;
        }
        play.innerHTML = '|<span>></span>';
        console.log(li);
    })
    currentValue = form.file.value;
    
    let currentTrack = localStorage.getItem(name);
    previous.addEventListener("click", ()=> {
        console.log("Previous");
        // audio.setAttribute("src", trackList);
    })

    next.addEventListener("click", ()=> {
        console.log("Next");
    })
}


reset.addEventListener("click", ()=> {
    localStorage.clear();
    ol.innerHTML = "";
})

addSong.addEventListener("click", ()=>{
    
    if (form.file.value) {
        if(form.file.value == currentValue) {
            alert(`You've already added this file.\nPlease choose another one.`);
        }

        else {
            createLi();
            localStorage.setItem(form.file.value.slice(12, form.file.value.length), `assets/audio/${form.file.value.slice(12, form.file.value.length)}`);
            console.log(localStorage);
            trackList[form.file.value.slice(12, form.file.value.length)] = `assets/audio/${form.file.value.slice(12, form.file.value.length)}`;
            console.log(trackList);
        }
    }
    else {
        alert("Select an audio file!");
    }
});
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
    audio.volume = (volume.value) / 100;
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


