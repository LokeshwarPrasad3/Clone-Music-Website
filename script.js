
console.log("Hii my amazon music");

// initialize
let songIndex = 0;
let audioElement = new Audio('./Songs/Besharam-Rang.mp3');
// audioElement.play();

//main play button 
let masterPlay = document.getElementById('masterPlay');
// range of song
let myProgressBar = document.getElementById('music-progress');
// wave git target
let waveGif = document.getElementById('wave-gif');

// song item target 
let songItems = Array.from(document.getElementsByClassName('song-items'));
// cover image
let converImage = document.getElementsByClassName('cover-img');
// name of song span target
let songName = document.getElementsByClassName('song-name');
// list play button target
let songItemPlay = document.getElementsByClassName('songItemPlay');
// button clicked then previous paly
let previousPlay = document.getElementById('previousPlay');
// button clicked then next paly
let nextPlay = document.getElementById('nextPlay');
// below the range bar 
let shortSongName = document.getElementById('short-song-name');
let songDuration = document.querySelectorAll('.song_duration');

// ****************************************************

// Define the getAudioDuration function
function getAudioDuration(filePath) {
    return new Promise(resolve => {
        const audioElement = new Audio(filePath);
        audioElement.addEventListener('loadedmetadata', () => {
            resolve(audioElement.duration);
        });
    });
}

// Function to update the duration in HTML
function updateDurationInHTML(songIndex, duration) {
    const element = document.getElementsByClassName('song_duration')[songIndex];
    if (element) {
        element.innerText = duration;
    }
}

// songs details
let songs = [
    { songName: "Beshram-rang", filePath: './Songs/Besharam-Rang.mp3', coverPath: './Cover/beshram-rang.jpg' },
    { songName: "Jawan movie song", filePath: './Songs/jawan-songs.m4a', coverPath: './Cover/jawan.jpg' },
    { songName: "Bramhastra song", filePath: './Songs/bramhastra-song.mp3', coverPath: './Cover/bramhastra-cover.jpg' },
    { songName: "Naino ne bandhi .", filePath: './Songs/naino-ne-bandhi.m4a', coverPath: './Cover/naino-ne-bandhi.jpg' },
    { songName: "Teri-Ankho-me", filePath: './Songs/teri-ankhon.mp3', coverPath: './Cover/teri-ankho-me.jpeg' },
    { songName: "Pushpa-song", filePath: './Songs/Pushpa-song.mp3', coverPath: './Cover/pushpa-song.jpg' },
    { songName: "apna-bna-le Piya", filePath: './Songs/apna-bna-le.mp3', coverPath: './Cover/apna-bna-le.jpg' },
    { songName: "Bahalara-la", filePath: './Songs/Baharala-la-madhumas.mp3', coverPath: './Cover/baharala-la.jpg' },
    { songName: "Tere-Bina Song", filePath: './Songs/bin-tere-kya-jina.mp3', coverPath: './Cover/teri-ankho-me.jpeg' },
]

// Asynchronously set the duration for each song and update HTML
async function setSongDurationsAndUpdateHTML() {
    for (let i = 0; i < songs.length; i++) {
        const duration = await getAudioDuration(songs[i].filePath);
        songs[i].duration = duration; // Update duration in the songs array
        updateDurationInHTML(i, (duration/60).toFixed(2)); // Update duration in HTML
    }
}

// Call the function to set durations and update HTML
setSongDurationsAndUpdateHTML().then(() => {
    console.log(songs); // Each song object now has the 'duration' key with its value
});


// ****************************************************


// handle play/pause 
masterPlay.addEventListener('click', () => {
    // if paused song and not start then start
    if (audioElement.paused || audioElement.currentTime <= 0) {

        // then play selected song
        audioElement.play();
        // change icon of play to pause
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // show the gif
        waveGif.style.opacity = 1;

    }
    // if played already song
    else {
        // stop the song
        audioElement.pause();
        // change the pause to play
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        // show the gif
        waveGif.style.opacity = 0;
    }
})

// event in my progress bar
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // update range of song bar 
    // calculate percentages using buildin function methods
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    console.log(progress);
    // set progress to bar
    myProgressBar.value = progress;
})

// if clicked in any point in progress bar then change play time (using change event)
myProgressBar.addEventListener('change', () => {
    // change % to duration 
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

// put all the details in song items
songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('song-name')[0].innerText = songs[i].songName;
    element.getElementsByClassName('song_duration')[0].innerText = songs[i].duration;
})


// make all icon  play of playlist items
const makeAllPlay = () => {
    Array.from(songItemPlay).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// list play button target
Array.from(songItemPlay).forEach((element) => {
    element.addEventListener('click', (e) => {
        //console.log(e.target); // element get targetted

        // except song do play icon
        makeAllPlay();

        // then play that song and change icon to pause
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        // which is played when clicked
        index = parseInt(e.target.id);

        // play the audio
        audioElement.src = songs[index].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        // and master play stop song
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        // show the gif
        waveGif.style.opacity = 1;

        shortSongName.innerText = `  ${songs[index].songName}`;


    })
});


// previous play 
nextPlay.addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    // play the audio
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // and master play stop song
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');

    // show the gif
    waveGif.style.opacity = 1;

    shortSongName.innerText = `   ${songs[songIndex].songName}`;

})


// previous play 
previousPlay.addEventListener('click', () => {
    if (songIndex > songs.length) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    // play the audio
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // and master play stop song
    masterPlay.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');

    // show the gif
    waveGif.style.opacity = 1;
    shortSongName.innerText = `   ${songs[songIndex].songName}`;

})