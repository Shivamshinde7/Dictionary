const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound  = document.getElementById("sound");
const btn = document.getElementById("search-word");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputword = document.getElementById("inputword").value;
    // console.log(inputword);

    fetch(`${url}${inputword}`).then((response) => response.json()).then((data) => {
        console.log(data)
        result.innerHTML = `
        <h3 class="input-word"> ${inputword}  <button onclick="soundPlay()";>
        <i class="fa-solid fa-volume-high"></i>
        </button>
        </h3> 
        <span>
        ${data[0].meanings[0].partOfSpeech}</span>  
        , <span> ${data[0].phonetic}</span>
        <p  class="word-meaning"> 
        ${data[0].meanings[0].definitions[0].definition}</p>
        <p class="black-bg-text"> ${data[0].meanings[0].definitions[0].example || ""} </p>
        `;
        let audioSrc = data[0].phonetics[0].audio;
                if (audioSrc.startsWith('//')) {
                    audioSrc = 'https:' + audioSrc;
                } else if (!audioSrc.startsWith('http')) {
                    audioSrc = 'https://' + audioSrc;
                }
                const sound = document.getElementById("sound");
                sound.setAttribute("src", audioSrc);
                console.log(sound);
            }).catch(error => {
                console.error('Error fetching the word data:', error);
                result.innerHTML = `<p class="error">Sorry, an error occurred while fetching the word data.</p>`;
            });
        });

        function soundPlay(){
            const sound = document.getElementById("sound");
            sound.play();
        }