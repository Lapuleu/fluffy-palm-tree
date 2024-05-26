import(/* webpackChunkName: "od-survey" */ "./ol_od_survey.js").then(_ => selectors[0].current.click());
function loadXMLDoc() { 
    var xmlhttp = new XMLHttpRequest(); 
    xmlhttp.onreadystatechange = function () { 

        // Request finished and response  
        // is ready and Status is "OK" 
        if (this.readyState == 4 && this.status == 200) { 
            empDetails(this); 
        } 
    };
    title = "xml/" + conversation.replace(/\s/g, '') + ".xml";
    xmlhttp.open("GET", title, true); 
    xmlhttp.send(); 
} 
let audioTagLength = 0;
let audio = new Audio("audio/"+conversation.replace(/\s/g, '')+".mp3");
audio.pause();
function empDetails(xml) { 
    var xmlDoc = xml.responseXML; 
    var annotation = xmlDoc.getElementsByTagName("annotation");
    var table = '';
    for(let i = 1; i < annotation.length; i++){
        table += `<div class = "annotations"> `;
        let tempSeg = annotation[i].getElementsByTagName("seg")[0].innerHTML.split(" ");
        let segString="";
        let tempGloss = annotation[i].getElementsByTagName("gloss")[0].innerHTML.split(" ");
        let glossString="";
        let segCount = 0;
        let glossCount = 0;
        for(let d = 0; d<tempSeg.length; d++){
            if(tempSeg[segCount]=="[speaker"){
                segCount++;
                tempSeg[segCount]=tempSeg[segCount-1]+" "+tempSeg[segCount];
            }
            if(tempGloss[glossCount]=="[speaker"){
                glossCount++;
                tempGloss[glossCount]=tempGloss[glossCount-1]+" "+ tempGloss[glossCount];
            }
            segString+='<span class="part segPart'+d+'">'+ tempSeg[segCount]+'</span>';
            glossString+='<span class="part glossPart'+d+'">'+ tempGloss[glossCount]+'</span>';
            segCount++;
            glossCount++;
        }
        let timestamp = annotation[i].getElementsByTagName("timestamp")[0].innerHTML;
        let iu = annotation[i].getElementsByTagName("iu")[0].innerHTML;
        let eng = annotation[i].getElementsByTagName("eng")[0].innerHTML;
        if(annotation[i].getAttribute("who")!=annotation[i-1].getAttribute("who")){
            table += '<div class = "speaker">'  + annotation[i].getAttribute("who") + '</div>';
        }
        table += '<div class = "timestamp transcriptElement"><span class="elementTitle"><button id="timeButton" onclick="setAudioTime(this)">Timestamp</button></span>' + timestamp + '</div>';
        table += '<div class = "iu transcriptElement"><span class="elementTitle">IU</span>' + iu + '</div>';
        table += '<div class = "seg transcriptElement"><span class="elementTitle">Seg</span>' + segString + '</div>';
        table += '<div class = "gloss transcriptElement"><span class="elementTitle">Gloss</span>' + glossString + '</div>';
        table += '<div class = "eng transcriptElement"><span class="elementTitle">English</span>' + eng + '</div>';
        table += '</div>'
    }
    document.getElementById("table").innerHTML = table;
    let metadataString = "";
    let metadata = xmlDoc.getElementsByTagName("metadata")[0];
    metadataString += '<div class = "metadataSubtitle Document"> Document</div>';
    let j = 0;
    for(j = 1; j < metadata.childNodes.length-4; j+=2){
        metadataString += '<div class = metadataElement '+metadata.childNodes[j].tagName+'"><span class="metadataTitle">'+metadata.childNodes[j].tagName.substring(0, 1).toUpperCase()+metadata.childNodes[j].tagName.substring(1).replace(/_/g, " ")+'</span>' + metadata.childNodes[j].innerHTML.replace(/_/g, "-") + '</div>';
    }
    metadataString += '<div class = "metadataSubtitle '+metadata.childNodes[j].tagName+'"> '+metadata.childNodes[j].tagName.substring(0, 1).toUpperCase()+metadata.childNodes[j].tagName.substring(1).replace(/_/g, " ")+'</div>';
    //Speakers
    let speakerSize = metadata.childNodes[j].childNodes.length;
    let metadataSubString; 
    for(let s = 1; s < speakerSize; s+=2){
        metadataSubString = metadata.childNodes[j].childNodes[s];
        metadataString += '<div class = "metadataElement '+metadataSubString.tagName+'"><span class="metadataTitle">'+metadataSubString.tagName.substring(0, 1).toUpperCase()+metadataSubString.tagName.substring(1).replace(/_/g, " ")+'</span>' + '</div>';
        let size = metadataSubString.childNodes.length;
        for(let p = 1; p < size; p+=2){
            let metadataSubSubString = metadataSubString.childNodes[p];
            metadataString += '<div class = "'+metadataSubSubString.tagName+' metadataElement"><span class="metadataTitle">'+metadataSubSubString.tagName.substring(0, 1).toUpperCase()+metadataSubSubString.tagName.substring(1).replace(/_/g, " ")+'</span>' + metadataSubSubString.innerHTML + '</div>';
        }
    }
    j+=2;
    metadataString += '<div class = "metadataSubtitle '+metadata.childNodes[j].tagName+'"> '+metadata.childNodes[j].tagName.substring(0, 1).toUpperCase()+metadata.childNodes[j].tagName.substring(1).replace(/_/g, " ")+'</div>';
    let creatorSize = metadata.childNodes[j].childNodes.length;
    for(let p = 1; p < creatorSize; p+=2){
        metadataSubString = metadata.childNodes[j].childNodes[p];
        metadataString += '<div class = "'+metadataSubString.tagName+' metadataElement"><span class="metadataTitle">'+metadataSubString.tagName.substring(0, 1).toUpperCase()+metadataSubString.tagName.substring(1).replace(/_/g, " ")+'</span>' + metadataSubString.innerHTML + '</div>';
    }
    document.getElementById("metadata").innerHTML += metadataString;
}
document.addEventListener('DOMContentLoaded', function() {
    let conversationHeader = '<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Corpus of Conversationl Uyghur</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"><link rel="stylesheet" href="css/styles.css"><link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet"><script src = "js/jquery-2.1.4.min.js"> </script></head><body><header><nav id="nav" class="navbar navbar-expand-sm navbar-light"><div id="nav-container" class="container"><a id="brand" class="navbar-brand align-middle" href="English-Home.html">Corpus of Conversational Uyghur</a><ul id="tot-dropdown"class="nav navbar-nav navbar-right"><svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#fff" d="M31.33,23.48a7.06,7.06,0,0,0-4.79,1.87A1.48,1.48,0,0,0,25.6,25s0,0,0,0a8.13,8.13,0,0,1-3.11-.59,12.28,12.28,0,0,0,2.48-6.3h.66a1.5,1.5,0,0,0,0-3H21.34V12.78a1.5,1.5,0,1,0-3,0v2.34H14.08a1.5,1.5,0,0,0,0,3h7.84A9,9,0,0,1,20,22.67a9.32,9.32,0,0,1-1.76-2.93,1.5,1.5,0,1,0-2.82,1,12.38,12.38,0,0,0,2.11,3.63,9.28,9.28,0,0,1-3.42.6h0a1.5,1.5,0,1,0,0,3h0A11.3,11.3,0,0,0,20,26.54,10.42,10.42,0,0,0,24.71,28a7,7,0,0,0-.51,2.63v1.12H13.77a1.5,1.5,0,0,0-1.14.52,1.47,1.47,0,0,0-.34,1.21c0,.1.19,1.23.53,2.82a1,1,0,0,1-1.57,1C8.1,35,4.74,32.2,3.69,30.23A1.82,1.82,0,0,0,3.54,30a4.07,4.07,0,0,1-.74-2.35V11.52A4.13,4.13,0,0,1,6.93,7.39H32.67a4.13,4.13,0,0,1,4.13,4.13v12ZM61.2,30.61V46.7a4,4,0,0,1-.74,2.35,1.17,1.17,0,0,0-.15.27c-1,2-4.41,4.77-7.56,7.09a1,1,0,0,1-1.57-1c.34-1.6.52-2.73.53-2.83a1.49,1.49,0,0,0-1.48-1.73H31.33A4.13,4.13,0,0,1,27.2,46.7V30.61a4.13,4.13,0,0,1,4.13-4.13H57.07A4.13,4.13,0,0,1,61.2,30.61Zm-10.42,14L49.05,40.3l-3.42-8.56h0a1.3,1.3,0,0,0-.08-.17l-.06-.1-.09-.12-.09-.1-.1-.09-.13-.1L45,31l-.16-.09h0a.38.38,0,0,0-.1,0l-.16-.05-.15,0h-.3l-.13,0-.17.05a.38.38,0,0,0-.1,0h0l-.15.09-.11.05-.12.1-.1.09-.09.1-.1.12s0,.07-.05.1l-.09.17h0L39.42,40.3l-1.73,4.32a1.51,1.51,0,0,0,.84,2,1.55,1.55,0,0,0,.56.11,1.51,1.51,0,0,0,1.39-1l1.34-3.35h4.84L48,45.73a1.49,1.49,0,0,0,1.39,1,1.54,1.54,0,0,0,.55-.11A1.5,1.5,0,0,0,50.78,44.62ZM43,39.38h2.44l-1.22-3Z"/></svg>'+
    '<button id="dropdown"type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20"> Language </button><ul id="drop-menu" class="dropdown-menu" aria-labelledby="dropdownMenuOffset"><li><a class="dropdown-item" href="English-Home.html">English</a></li><li><a class="dropdown-item" href="#">Uyghur</a></li><li><hr class="dropdown-divider"></li><li><a class="dropdown-item" href="#">Coming Soon</a></li></ul></ul></div></div></nav></header>';
    let conversationBody = '<div id="main-content" class="container"> <div id="container" class="container"> <div id="homepage-container" class="row"> <h1 id = "top" class="title text-center"> Conversation </h1> <div id="intro"> <ul id="toggle-collection"> <li style = "justify-content: center;" class="hold">Select Tiers to Display</li> <li class="hold form-check form-switch"> <div id="check-holder"> <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked></input> </div> <label class="form-check-label" for="flexSwitchCheckDefault">Intonation Unit </label> </li> <li class="hold form-check form-switch"> <div id="check-holder"> <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked> </div> <label class="form-check-label" for="flexSwitchCheckDefault">Segmented Text </label> </li> <li class="hold form-check form-switch"> <div id="check-holder"> <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked> </div> <label class="form-check-label" for="flexSwitchCheckDefault">Gloss </label> </li> <li class="hold form-check form-switch"> <div id="check-holder"> <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked> </div> <label class="form-check-label" for="flexSwitchCheckDefault">English Translation </label> </li> </ul> <div id="rest-collection"> <div id="audio-container"><div class="recording"><button class="playButton smallimage" onclick="togglePlayback()"></button><p id=audiotime>'+
    '00:00/00:00</p><input type="range" id="playbar" name="playbar" min="0" max="1" value="0" step="0.01" class="playbar"><div id="volumediv"><label id="volumelbl" for="volume"><img class = "smallimage" src="images/speaker.svg"</img></label><input type="range" id="volume" name="volume" min="0" max="1" step="0.1" value="0.5" class="volumebar"></input></div><div id="speeddiv"><label for="speed"><img class = "smallimage" src="images/Pb-speed.svg"</img></label><select id="speed" name="speed"><option value="0.25"> 0.25</option><option value="0.5"> 0.5</option><option value="0.75"> 0.75</option><option value="1"selected> 1</option><option value="1.25"> 1.25</option><option value="1.5"> 1.5</option><option value="1.75"> 1.75</option><option value="2"> 2</option></select></div></div></div><a class="scroll" href="#top">Scroll to top</a> <a class="scroll" href="#metadata"> Scroll to bottom for metadata </a> </div> </div> <div id="conversation-page-container" class="container"> <div id = "table"> </div> <a class="scroll" href="#top"> Scroll to top </a> <div id="metadata"> <div class="title text-center"> Metadata </div> </div> </div> </div> </div> </div>';
    let html = document.querySelector("html");
    html.innerHTML = conversationHeader + conversationBody + html.innerHTML;
    audioTagLength = audio.src.length;
    document.getElementsByClassName("title")[0].innerText= conversation;
    let conversationFooter = '<div class="container"> <div class="row"> <section id="contact" class="text-center"> <span>Contact: </span> <br> Email - <a class="footerLink" href="mfiddler@ucsb.edu">mfiddler@ucsb.edu</a> <br> Web design - Haibibullah Abdul-Kerim <p>*Project organized by Michael Fiddler, in collaboration with the <a class="footerLink" href="https://uyghursfoundation.org/en/">Uyghur Projects Foundation</a></p> <hr class="visible-xs text-center"> </section> </div> <div class="text-center">© Copyright Michael Fiddler 2022 </div> </div>';
    let footer = document.querySelector("footer");
    if(footer.innerHTML === ""){
        footer.innerHTML = conversationFooter;
    }
    
    loadXMLDoc();
    var selectors = document.getElementsByClassName("form-check-input");
var iu = document.getElementsByClassName("iu");
var seg = document.getElementsByClassName("seg");
var gloss = document.getElementsByClassName("gloss");
var eng = document.getElementsByClassName("eng");
    selectors[0].addEventListener('click', function(){
        change(iu);
    });
    selectors[1].addEventListener('click', function(){
        change(seg);
    });
    selectors[2].addEventListener('click', function(){
        change(gloss);
    });
    selectors[3].addEventListener('click', function(){
        change(eng);
    });
    const volumeControl = document.getElementById('volume');
    const speedControl = document.getElementById('speed');
    const playbar = document.getElementById('playbar');
    volumeControl.addEventListener('input', function() {
        audio.volume = this.value;
    });
    speedControl.addEventListener('input', function() {
        audio.playbackRate = this.value;
    });
    playbar.addEventListener('input', function() {
        audio.currentTime = this.value * audio.duration;
        updatePlaybar();
    });
});

function change(cur){
  for(let i=0; i<cur.length; i++){
    if (cur[i].style.display === 'none'){
        cur[i].style.display = 'flex';
        window.setTimeout(function(){
            cur[i].style.opacity = 1;
            cur[i].style.transform = 'scale(1)';
          },0);
    }
    else{
        cur[i].style.opacity = 0;
        cur[i].style.transform = 'scale(0)';
        window.setTimeout(function(){
        cur[i].style.display = 'none';
        },700);
    }
  }
}
function setAudioTime(elem){
    let time = elem.parentNode.parentNode.childNodes[1].nodeValue.split("-")[0].substring(3);
    const [m,s] = time.split(":");
    const seconds = (parseInt(m,10)*60+parseInt(s,10));
    audio.currentTime=seconds;
    audio.play();
    updatePlaybar();
}

window.addEventListener("load", function(e) { 
    setTimeout(() => {
        let max = 0;
        let segParts = document.getElementsByClassName("seg");
        let glossParts = document.getElementsByClassName("gloss");
        for(let c = 0; c<Math.min(segParts.length, glossParts.length); c++){
            let segLine = segParts[c].childNodes;
            let glossLine = glossParts[c].childNodes;
            for(let d = 1; d<Math.min(segLine.length, glossLine.length); d++){
                max = Math.max(segLine[d].offsetWidth, glossLine[d].offsetWidth)+10;
                segLine[d].style.width=max+"px";
                glossLine[d].style.width=max+"px";
            }
        }
    }, 1);
    var r = document.querySelector(':root');
    r.style.setProperty("--height", (getComputedStyle(r)["height"]));
});
function togglePlayback() {
   if (audio.paused) {
        audio.play();
        updatePlaybarInterval = setInterval(updatePlaybar, 100); // Update playbar every 100 milliseconds
    } else {
        audio.pause();
        clearInterval(updatePlaybarInterval); // Clear the interval
    }
}
function updatePlaybar() {
    playbar.value = audio.currentTime / audio.duration;
    const audtime= document.getElementById("audiotime");
    const current= new Date(parseInt(audio.currentTime,10)*1000).toISOString().slice(14,19);
    const dura= new Date(parseInt(audio.duration,10)*1000).toISOString().slice(14,19);
    audtime.innerText = current+'/'+dura;
}
