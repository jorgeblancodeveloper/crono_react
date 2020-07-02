import { soundLibrary } from "../../resources/sound_library";


let sounds= [];
soundLibrary.forEach(el =>
    sounds.push( new Audio(el.url))
);

//sounds[2].play()

const play_sound = function(a){
    sounds.forEach(el =>{
       el.pause();}
    );
    sounds[a].currentTime = 0;
    sounds[a].play()
}

export {play_sound}