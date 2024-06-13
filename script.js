const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`) //Concatenating the Base URL with inputword.
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
      <div class="word">
          <h4>${inpWord}</h4>
          <button onclick='playSound()'
          ><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>${data[0].phonetic}</p>
        </div>
        <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>`;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h4 class="error"> Sorry, coudn't find the word!</h4>`;
    });
});

function playSound() {
  sound.play();
}
