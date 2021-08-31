const music=document.querySelector('audio')
const prevBtn=document.getElementById('prev')
const playBtn=document.getElementById('play')
const nextBtn=document.getElementById('next')
const title=document.getElementById('title')
const img =document.querySelector('img');
const artist =document.getElementById('artist')
const progressContainer=document.getElementById('progress-container')
const progress=document.getElementById('progress')
const currentTimeel=document.getElementById("curent-time")
const durationel=document.getElementById('duration')

const songs=[
    {
        name:'abdelaziz-1',
        displayname:'Electric Chill Machine',
        artiste:'Abdelaziz Lounes'
    },
    {
        name:'abdelaziz-2',
        displayname:'seven nation army(Remix)',
        artiste:'Abdelaziz Lounes'
    },
    {
        name:'abdelaziz-3',
        displayname:'Good night,disco queen',
        artiste:'Abdelaziz Lounes'
    },
    {
        name:'abdelaziz-4',
        displayname:'Front Row (Remix)',
        artiste:'Abdelaziz Lounes'
    },
    {
        name:'abdelaziz-5',
        displayname:'My special surprize 😁',
        artiste:'Abdelaziz Lounes'
    }];

let isplaying=false;
let songIndex=0;

function playSong(){
    music.play();
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','pause')
    isplaying=true;
}
function pauseSong(){
    music.pause();
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','play')
    isplaying=false;
}

playBtn.addEventListener('click',()=>(isplaying ? pauseSong() : playSong()));

function loadSongs(song){
    title.textContent=song.displayname;
    artist.textContent=song.artiste;
    music.src=`music/${song.name}.mp3`;
    img.src=`img/${song.name}.jpg`;
}
function prevmusic(){
    songIndex--;
    if (songIndex<0) {
        songIndex=songs.length-1;
    }
    loadSongs(songs[songIndex])
}
function nextmusic(){
    songIndex++;
    if (songIndex>4) {
        songIndex=0;
    }
    loadSongs(songs[songIndex])
    playSong();
}
 function updateProgressbar(e){
    if(isplaying){
        const {currentTime,duration}=e.srcElement
        progressbar=(currentTime/duration) * 100
        progress.style.width=`${progressbar}%`
        let currentminut=Math.floor(currentTime/60)
        let currentsecond=Math.floor(currentTime%60)
        if (currentsecond<10) {
            currentsecond=`0${currentsecond}`
        }
        currentTimeel.textContent=`${currentminut}:${currentsecond}`
    }
 }
function setprogressbar(e){
    console.log(e);
    const width=this.clientWidth;
    const clickX=e.offsetX;
    console.log(clickX);
    const {duration}= music;
    music.currentTime=(clickX/width)*duration
}


prevBtn.addEventListener('click',prevmusic)
nextBtn.addEventListener('click',nextmusic)
music.addEventListener("ended",nextmusic)
music.addEventListener('timeupdate',updateProgressbar)
progressContainer.addEventListener('click',setprogressbar)