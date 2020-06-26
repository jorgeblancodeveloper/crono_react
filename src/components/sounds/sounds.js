/*import soundLibrary from "./resources/soundLibrary";
let sounds= [];
soundLibrary.forEach(el => console.log(
    sounds.push( new Audio(soundLibrary[el].url))
));
sounds[2].play()

const play_sound = (a)=>{
    sounds[a].play()
}

export default play_sound;*/

import { soundLibrary } from "../../resources/sound_library";


let sounds= [];
soundLibrary.forEach(el =>
    sounds.push( new Audio(el.url))
);

//sounds[2].play()

const play_sound = function(a){
    sounds.forEach(el =>{
       // sounds[el].play()
       el.pause();}
    );
    console.log("toco ",a);
    sounds[a].currentTime = 0;
    sounds[a].play()
}

export {play_sound}