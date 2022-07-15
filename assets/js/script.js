const button = document.querySelector("button");
button.addEventListener("click", () => {
  getDatasTMDB();
});

async function getDatasTMDB() {
  // All Request
  const apiResponse = await fetch(
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ed4f8d19af55320e21e8595c388decdd"
  );

  const apiJSON = await apiResponse.json();
  if (apiResponse.ok) {
    setDatasToDoc(apiJSON);
  } else {
    console.log("Error in API request");
  }
}

function setDatasToDoc(apiJSON) {
  // Container
  let container = document.querySelector(".container");
  stylesContainer(container);

  let template = document.querySelector(".template");

  // Images -> URL
  let baseURL = "https://image.tmdb.org/t/p/w500/";

  for (let index = 0; index < apiJSON.results.length; index++) {
    // Clonando conteúdos do 'template'
    let itemNovo = template.content.cloneNode(true);

    // Card
    let card = itemNovo.querySelector(".card");

    // Card -> image
    let img = itemNovo.querySelector(".poster");
    img.src = `${baseURL}${apiJSON.results[index].poster_path}`;

    // Card -> h1
    let h1 = itemNovo.querySelector(".title");
    h1.innerText = `${apiJSON.results[index].title}`;

    // Card description
    let pDesc = itemNovo.querySelector(".desc");
    pDesc.innerText = `${apiJSON.results[index].overview}`;

    // Card -> language
    let pLang = itemNovo.querySelector(".original-lang");
    pLang.innerText = `Original Language: ${apiJSON.results[index].original_language}`;

    // Add parent Nodes
    card.append(h1, pDesc, pLang);
    container.append(card);
  }
  document.querySelector("button").style.display = "none";
}

function stylesContainer(container) {
  container.style.backgroundColor = "#050552";
  container.animate(
    [
      // keyframes
      { opacity: "0" },
      { opacity: "1" },
    ],
    {
      // timing options
      duration: 1000,
      iterations: 1,
      fill: "forwards",
    }
  );
}
