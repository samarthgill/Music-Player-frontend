let songIndex = 0;
let Masterpaly = document.getElementById('Masterclass');
let image = document.getElementById('Masterclass');
let progressbar = document.getElementById('audio');
let nextElement = document.getElementById('next');
let i = 0;
let songs = [
    { songName: "Pump Up", filePath: "https://dl2.djring.com/sd2.djjohal.com/128/522359/Khauf%20%20The%20Fear(DJJOhAL.Com).mp3" },
    { songName: "Jatt Chete Ni Aunda", filePath: "https://dl2.djring.com/sd2.djjohal.com/128/522391/(DJJOhAL.Com).mp3" },
    { songName: "Demand", filePath: "https://dl2.djring.com/sd2.djjohal.com/128/522409/(DJJOhAL.Com).mp3" },
    { songName: "Fragrance", filePath: "https://dl2.djring.com/sd2.djjohal.com/128/522402/(DJJOhAL.Com).mp3" },
    { songName: "Warning", filePath: "https://dl2.djring.com/sd2.djjohal.com/128/522399/(DJJOhAL.Com).mp3" },
    { songName: "Jungle The Raja", filePath: "https://dl2.djring.com/sd2.djjohal.com/128/522344/(DJJOhAL.Com).mp3" },
    { songName: "Vision", filePath: "https://dl2.djring.com/sd2.djjohal.com/128/522377/(DJJOhAL.Com).mp3" },
    { songName: "Kine Pani ", filePath: "https://dl2.djring.com/sd2.djjohal.com/128/522380/(DJJOhAL.Com).mp3" },
    { songName: "Golden", filePath: "https://p320.djpunjab.is/data/48/57090/306792/Golden%20-%20Ranjit%20Bawa.mp3" },
    { songName: "No Limits", filePath: "https://p320.djpunjab.is/data/48/57090/306790/No%20Limits%20-%20Ranjit%20Bawa.mp3" },
    { songName: "Big Dreams", filePath: "https://p320.djpunjab.is/data/48/57090/306789/Big%20Dreams%20-%20Ranjit%20Bawa.mp3" },
    { songName: "The Power", filePath: "https://p320.djpunjab.is/data/48/57090/306787/The%20Power%20-%20Ranjit%20Bawa.mp3" },


];

let audioElement = new Audio(songs[songIndex].filePath);

// Play/Pause functionality
Masterpaly.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        image.src = 'play.png';
    } else {
        audioElement.pause();
        image.src = 'pause.png';
    }
});
// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    progressbar.value = progress;
     

});

progressbar.addEventListener('change', () => {
    let time = progressbar.value * audioElement.duration / 100;
    audioElement.currentTime = time;
 
});

// Function to play the selected song
function playSong(index) {
    let audio = new Audio(songs[index].filePath); // Create an Audio object with the selected song's filePath
    audio.play();  // Play the audio
    console.log("Playing: " + songs[index].songName); // Log the name of the song being played
}

// Next song functionality
nextElement.addEventListener('click', () => {
    songIndex = songIndex + 1;
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    document.getElementById('songname').textContent=songs[songIndex].songName;
});

// Back song functionality
let backElement = document.getElementById('back');
backElement.addEventListener('click', () => {
    songIndex = songIndex -1;
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    document.getElementById('songname').textContent=songs[songIndex].songName;
});

// Volume control functionality
audioElement.volume = 0.5;
document.getElementById('high').addEventListener('click', () => {
    if (audioElement.volume < 1)
        audioElement.volume = audioElement.volume + 0.1;
});

document.getElementById('low').addEventListener('click', () => {
    if (audioElement.volume > 0)
        audioElement.volume = audioElement.volume - 0.1;
});

// Function to add a song to the songs array
function addSong(songName, filePath) {
    const newSong = { songName, filePath };
    songs.push(newSong);
    updateSongList(); // Call to update the song list after adding a song
}

function updateSongList() {
    const songContainer = document.getElementById('songs'); // Get the element where songs are listed
    songContainer.innerHTML = ""; // Clear the current list

    songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.id = 'song';
        songElement.innerHTML = `
            <img src="No Limits.jpg" id="img2">
            <h3 id="h5">${song.songName}</h3>
            <img src="play.png" id="img3" data-index="${index}">
        `;
        songContainer.appendChild(songElement);
    });
    const playButtons = document.querySelectorAll('#img3');
    playButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const songIndex = event.target.getAttribute('data-index');
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
            document.getElementById('songname').textContent=songs[songIndex].songName;
            
        });
    });
}
document.getElementById('addsong').addEventListener('click', () => {
    let songName = prompt('Enter song name');
    let filePath = prompt('Enter song file path (URL)');
        addSong(songName, filePath);

});

// Initial update of the song list on page load
updateSongList();

    