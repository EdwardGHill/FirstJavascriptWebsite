// Function to display the team on the page
function displayTeam(teamData, targetContainer) {
  const container = document.getElementById(targetContainer);
  container.innerHTML = ""; // Clear the previous content
  
  // Iterate over each Pokemon in the teamData
  teamData.forEach(pokemon => {
    const pokemonElement = document.createElement("p");
    pokemonElement.classList.add("flex", "items-center", "text-blue-500", "cursor-pointer");

    // Create the Pokémon icon
    const pokemonIcon = document.createElement("img");
    pokemonIcon.src = `https://img.pokemondb.net/sprites/sword-shield/icon/${pokemon.icon_name}.png`;
    pokemonIcon.alt = `${pokemon.name} icon`;
    pokemonIcon.classList.add("w-6", "h-6", "mr-2");

    // Create the Pokémon name element
    const pokemonName = document.createElement("span");
    pokemonName.textContent = pokemon.name;

    // Add click event listener to get Pokémon details
    pokemonElement.addEventListener("click", () => {
      getPokemonDetails(pokemon.name);
    });

    // Append the Pokémon icon and name to the container
    pokemonElement.appendChild(pokemonIcon);
    pokemonElement.appendChild(pokemonName);

    container.appendChild(pokemonElement);
  });
}

// Function to call the API endpoint and handle the response
function fetchTeamData(targetContainer, endpoint) {
  fetch(`http://localhost:8000/pokemon/${endpoint}`)
    .then(response => response.json())
    .then(data => {
      displayTeam(data, targetContainer); // Call the function to display the team
    })
    .catch(error => {
      console.error(error);
    });
}

// Add event listeners to the buttons
document.getElementById("randomTeamButton").addEventListener("click", () => {
  fetchTeamData("teamContainer", "random_team");
});

document.getElementById("StrongTeamButton").addEventListener("click", () => {
  fetchTeamData("strongteamContainer", "strong_team");
});

document.getElementById("WeakTeamButton").addEventListener("click", () => {
  fetchTeamData("weakteamContainer", "weak_team");
});

document.getElementById("LegendaryTeamButton").addEventListener("click", () => {
  fetchTeamData("legendaryteamContainer", "legendary_team");
});

document.getElementById("RainbowTeamButton").addEventListener("click", () => {
  fetchTeamData("rainbowteamContainer", "rainbow_team");
});

// Function to clear all the team results
function clearResults() {
  const teamContainers = [
    "teamContainer",
    "strongteamContainer",
    "weakteamContainer",
    "legendaryteamContainer",
    "rainbowteamContainer"
  ];

  teamContainers.forEach(container => {
    const containerElement = document.getElementById(container);
    containerElement.innerHTML = "";
  });
}

// Add event listener to the clear results button
document.getElementById("clearResultsButton").addEventListener("click", clearResults);

function searchPokemon() {
  const inputElement = document.getElementById('pokemonNameInput');
  const pokemonName = inputElement.value;

  fetch(`http://localhost:8000/pokemon/search/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      // Sort the data based on the Pokémon's ID
      data.sort((a, b) => a.id - b.id);

      const pokemonListElement = document.getElementById('pokemonList');
      pokemonListElement.innerHTML = '';

      data.forEach(pokemon => {
        const listItem = document.createElement('li');
        const pokemonNameLink = document.createElement('a');
        pokemonNameLink.textContent = pokemon.name;
        pokemonNameLink.classList.add('text-blue-500', 'cursor-pointer');
        pokemonNameLink.addEventListener('click', () => {
          getPokemonDetails(pokemon.name);
          scrollToDetailsContainer();
        });
        listItem.appendChild(pokemonNameLink);
        pokemonListElement.appendChild(listItem);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
  
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchPokemon);

// Add a global variable to keep track of the current Pokémon ID
let currentPokemonId = 0;

// Function to get Pokémon details by ID
function getPokemonDetailsById(pokemonId) {
  fetch(`http://localhost:8000/pokemon/id/${pokemonId}`)
    .then(response => response.json())
    .then(data => {
      // Process the response data here
      displayPokemonDetails(data);
    })
    .catch(error => {
      console.error(error);
    });
}


function getPokemonDetails(pokemonName) {
  fetch(`http://localhost:8000/pokemon/name/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      // Process the response data here
      getPokemonDetailsById(data.id); // Pass the pokemonId to getPokemonDetailsById
    })
    .catch(error => {
      console.error(error);
    });
}

function displayPokemonDetails(pokemonDetails, pokemonId) {

  currentPokemonId = pokemonId || pokemonDetails.id;
  // Create the box element
  const detailsBox = document.createElement("div");
  detailsBox.classList.add("bg-gray-100", "p-4", "mt-4", "rounded");

  // Create the heading element
  const heading = document.createElement("h3");
  heading.classList.add("text-lg", "font-bold", "mb-2");
  heading.textContent = pokemonDetails.name;

  // Create the Pokémon image element
  const pokemonImage = document.createElement("img");
  pokemonImage.src = `https://img.pokemondb.net/sprites/home/normal/1x/${pokemonDetails.icon_name}.png`;
  pokemonImage.alt = `${pokemonDetails.name} image`;
  pokemonImage.classList.add("w-20", "h-20", "mx-auto");
  pokemonImage.classList.add("pokemon-image");

  // Create the details elements
  const idElement = document.createElement("p");
  idElement.textContent = `ID: ${pokemonDetails.id}`;

  const genElement = document.createElement("p");
  genElement.textContent = `Generation Introduced: ${pokemonDetails.generation}`;

  const type1Element = document.createElement("p");
  type1Element.textContent = `Type 1: ${pokemonDetails.type_1}`;

  const type2Element = document.createElement("p");
  type2Element.textContent = `Type 2: ${pokemonDetails.type_2}`;

  const totalElement = document.createElement("p");
  totalElement.textContent = `Total Base Stats: ${pokemonDetails.total}`;

  const hpElement = document.createElement("p");
  hpElement.textContent = `Base HP: ${pokemonDetails.hp}`;
  
  const attackElement = document.createElement("p");
  attackElement.textContent = `Base Attack: ${pokemonDetails.attack}`;

  const defenseElement = document.createElement("p");
  defenseElement.textContent = `Base Defense: ${pokemonDetails.defense}`;

  const speedElement = document.createElement("p");
  speedElement.textContent = `Base Speed: ${pokemonDetails.speed}`;

  const spatkElement = document.createElement("p");
  spatkElement.textContent = `Base Special Attack: ${pokemonDetails.sp_atk}`;

  const spdefElement = document.createElement("p");
  spdefElement.textContent = `Base Special Defense: ${pokemonDetails.sp_def}`;

  // Append the elements to the details box
  detailsBox.appendChild(heading);
  detailsBox.appendChild(pokemonImage);
  detailsBox.appendChild(idElement);
  detailsBox.appendChild(genElement);
  detailsBox.appendChild(type1Element);
  detailsBox.appendChild(type2Element);
  detailsBox.appendChild(totalElement);
  detailsBox.appendChild(hpElement);
  detailsBox.appendChild(attackElement);
  detailsBox.appendChild(defenseElement);
  detailsBox.appendChild(speedElement);
  detailsBox.appendChild(spatkElement);
  detailsBox.appendChild(spdefElement);

    // Create the "Add to Favorites" button
    const addToFavoritesBtn = document.createElement("button");
    addToFavoritesBtn.classList.add("bg-blue-500", "text-white", "py-2", "px-4", "rounded", "mt-4", "mr-2");
    addToFavoritesBtn.textContent = "Add to Favorites";
  
    // Check if the Pokémon is already in favorites
    fetch("http://localhost:8000/favorites")
      .then((response) => response.json())
      .then((favorites) => {
        const isFavorite = favorites.some(
          (favorite) => favorite.pokemon_id === pokemonDetails.id
        );
  
        if (isFavorite) {
          // Create the "Remove from Favorites" button
          const removeFromFavoritesBtn = document.createElement("button");
          removeFromFavoritesBtn.classList.add("bg-red-500", "text-white", "py-2", "px-4", "rounded", "mt-4", "mr-2");
          removeFromFavoritesBtn.textContent = "Remove from Favorites";
  
          // Add an event listener to the "Remove from Favorites" button
          removeFromFavoritesBtn.addEventListener("click", () => {
            removeFromFavorites(pokemonDetails.id); // Call the function to remove the Pokémon from favorites
          });
  
          // Append the "Remove from Favorites" button to the details box
          detailsBox.appendChild(removeFromFavoritesBtn);
        } else {
          // Add an event listener to the "Add to Favorites" button
          addToFavoritesBtn.addEventListener("click", () => {
            addToFavorites(pokemonDetails.id); // Call the function to add the Pokemon to favorites
          });
  
          // Append the "Add to Favorites" button to the details box
          detailsBox.appendChild(addToFavoritesBtn);
        }

    // Create the "Previous" button
  const previousBtn = document.createElement("button");
  previousBtn.classList.add("bg-blue-500", "text-white", "py-2", "px-4", "rounded", "mt-4", "mr-2");
  previousBtn.textContent = "Previous";
  
  // Add an event listener to the "Previous" button
  previousBtn.addEventListener("click", () => {
    if (currentPokemonId > 1) {
      currentPokemonId--;
      getPokemonDetailsById(currentPokemonId);
    }
  });
  
  // Create the "Next" button
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("bg-blue-500", "text-white", "py-2", "px-4", "rounded", "mt-4");
  nextBtn.textContent = "Next";
  
  
  // Add an event listener to the "Next" button
  nextBtn.addEventListener("click", () => {
    if (currentPokemonId < 722) {  //should use dynamic count of total pokemon here for scaleability!
      currentPokemonId++;
      getPokemonDetailsById(currentPokemonId);
    }
  });

  // Append the "Previous" and "Next" buttons to the details box
  
  if (currentPokemonId > 1) {
  detailsBox.appendChild(previousBtn);
  }
  if (currentPokemonId < 721) {
  detailsBox.appendChild(nextBtn);
  }

    // Display the details box on the page
    const detailsContainer = document.getElementById("pokemonDetailsContainer");
    detailsContainer.innerHTML = ""; // Clear previous content
    detailsContainer.appendChild(detailsBox);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while fetching the favorites list');
  });
}

getPokemonDetailsById(currentPokemonId);

function addToFavorites(pokemonId) {
  fetch("http://localhost:8000/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pokemon_id: pokemonId,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // Update the details box to show the "Remove from Favorites" button
        const addToFavoritesBtn = document.querySelector("#pokemonDetailsContainer button");
        const removeFromFavoritesBtn = document.createElement("button");
        removeFromFavoritesBtn.classList.add(
          "bg-red-500",
          "text-white",
          "py-2",
          "px-4",
          "rounded",
          "mt-4",
          "mr-2"
        );
        removeFromFavoritesBtn.textContent = "Remove from Favorites";
        removeFromFavoritesBtn.addEventListener("click", () => {
          removeFromFavorites(pokemonId);
        });

        addToFavoritesBtn.parentNode.insertBefore(
          removeFromFavoritesBtn,
          addToFavoritesBtn.nextSibling
        );
        addToFavoritesBtn.parentNode.removeChild(addToFavoritesBtn);
        
        alert("Pokemon added to favorites!");
      } else if (response.status === 400) {
        alert("This pokemon is already in Favorites");
      } else if (response.status === 404) {
        alert("Pokemon not found");
      } else {
        alert("An error occurred");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred");
    });
}

function removeFromFavorites(pokemonId) {
  fetch(`http://localhost:8000/favorites/${pokemonId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // Update the details box to show the "Add to Favorites" button
        const removeFromFavoritesBtn = document.querySelector("#pokemonDetailsContainer button");
        const addToFavoritesBtn = document.createElement("button");
        addToFavoritesBtn.classList.add("bg-blue-500", "text-white", "py-2", "px-4", "rounded", "mt-4", "mr-2");
        addToFavoritesBtn.textContent = "Add to Favorites";
        addToFavoritesBtn.addEventListener("click", () => {
          addToFavorites(pokemonId);
        });

        removeFromFavoritesBtn.parentNode.insertBefore(
          addToFavoritesBtn,
          removeFromFavoritesBtn.nextSibling
        );
        removeFromFavoritesBtn.parentNode.removeChild(removeFromFavoritesBtn);
        
        alert("Pokemon removed from favorites!");
      } else {
        alert("An error occurred");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred");
    });
}

// Array of generation button IDs
const generationButtons = ["gen1Button", "gen2Button", "gen3Button", "gen4Button", "gen5Button", "gen6Button"];

// Function to call the API endpoint and handle the response
function fetchPokemonByGeneration(generation) {
  fetch(`http://localhost:8000/pokemon/generation/${generation}`)
    .then(response => response.json())
    .then(data => {
      // Sort the data based on the Pokémon's ID
      data.sort((a, b) => a.id - b.id);

      const genListElement = document.getElementById("genList");
      genListElement.innerHTML = "";

      data.forEach(pokemon => {
        const listItem = document.createElement("li");

        // Create the image element for the Pokémon icon
        const pokemonIcon = document.createElement("img");
        pokemonIcon.src = `https://img.pokemondb.net/sprites/sword-shield/icon/${pokemon.icon_name}.png`;
        pokemonIcon.alt = `${pokemon.name} icon`;
        pokemonIcon.classList.add("pokemon-icon");

        // Create the text content for the Pokémon name
        const pokemonName = document.createElement("span");
        pokemonName.textContent = `${pokemon.id}. ${pokemon.name}`;

        // Add the Pokémon icon and name to the list item
        listItem.appendChild(pokemonIcon);
        listItem.appendChild(pokemonName);

        // Add classes and event listener to the list item
        listItem.classList.add("text-blue-500", "cursor-pointer", "flex", "flex-col", "items-center");
        listItem.addEventListener("click", () => {
          getPokemonDetails(pokemon.name, pokemon.id);
          scrollToDetailsContainer();
        });

        // Add the list item to the results list
        genListElement.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

// Get all generation buttons
const genButtons = document.getElementsByClassName("genButton");

// Function to handle the click event on generation buttons
function handleGenerationButtonClick(event) {
  // Remove the 'bg-blue-700' class from all buttons
  for (const button of genButtons) {
    button.classList.remove("bg-blue-700");
  }

  // Add the 'bg-blue-700' class to the clicked button
  event.target.classList.add("bg-blue-700");
}

// Attach the click event listener to each generation button
for (const button of genButtons) {
  button.addEventListener("click", handleGenerationButtonClick);
}


// Attach event listeners to generation buttons dynamically
generationButtons.forEach((buttonId, index) => {
  const generation = index + 1;
  document.getElementById(buttonId).addEventListener("click", () => {
    fetchPokemonByGeneration(generation);
  });
});

document.getElementById("genClearButton").addEventListener("click", clearGenResults);
function clearGenResults() {
const genListElement = document.getElementById('genList');
genListElement.innerHTML = '';
for (const button of genButtons) {
  button.classList.remove("bg-blue-700");
}
}

// Function to scroll to the pokemonDetailsContainer
function scrollToDetailsContainer() {
  const detailsContainer = document.getElementById("pokemonDetailsContainer");
  detailsContainer.scrollIntoView({ behavior: "smooth" });
}


//WORK AROUND FOR SORTING DATA INTO COLUMNS BUT FEELS LIKE THERE SHOULD BE A CSS SOLUTION
// function displayPokemonByType(typeName) {
//   fetch(`http://localhost:8000/pokemon/type/${typeName}`)
//     .then(response => response.json())
//     .then(data => {
//       const typeListElement = document.getElementById("typeList");

//       // Clear the typeListElement before populating it
//       typeListElement.innerHTML = "";

//       const totalColumns = 6; // Number of columns in the grid
//       const numRows = Math.ceil(data.length / totalColumns);

//       for (let row = 0; row < numRows; row++) {
//         for (let col = 0; col < totalColumns; col++) {
//           const index = row + col * numRows;
//           if (index >= data.length) {
//             break;
//           }

//           const listItem = document.createElement("li");
//           listItem.textContent = `${data[index].id}. ${data[index].name}`;
//           listItem.classList.add("text-blue-500", "cursor-pointer");
//           listItem.addEventListener("click", () => {
//             getPokemonDetails(data[index].name);
//             scrollToDetailsContainer();
//           });
//           typeListElement.appendChild(listItem);
//         }
//       }
//     })
//     .catch(error => {
//       console.error("Error:", error);
//     });
// }

function displayPokemonByType(typeName) {
  fetch(`http://localhost:8000/pokemon/type/${typeName}`)
    .then(response => response.json())
    .then(data => {
      // Sort the data based on the Pokémon's ID
      data.sort((a, b) => a.id - b.id);

      const typeListElement = document.getElementById("typeList");

      // Clear the existing list items
      typeListElement.innerHTML = "";

      // Create list items for each Pokémon
      data.forEach(pokemon => {
        const listItem = document.createElement("li");
        listItem.classList.add("text-blue-500", "cursor-pointer", "flex", "flex-col", "items-center");

        // Create the Pokémon icon
        const pokemonIcon = document.createElement("img");
        pokemonIcon.src = `https://img.pokemondb.net/sprites/sword-shield/icon/${pokemon.icon_name}.png`;
        pokemonIcon.alt = `${pokemon.name} icon`;
        pokemonIcon.classList.add("pokemon-icon");

        // Create the Pokémon name element
        const pokemonName = document.createElement("span");
        pokemonName.textContent = `${pokemon.id}. ${pokemon.name}`;

        // Add click event listener to get Pokémon details
        listItem.addEventListener("click", () => {
          getPokemonDetails(pokemon.name);
          scrollToDetailsContainer();
        });

        // Append the Pokémon icon and name to the list item
        listItem.appendChild(pokemonIcon);
        listItem.appendChild(pokemonName);

        // Append the list item to the type list
        typeListElement.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}


// Function to clear the type list
function clearTypeList() {
  const typeListElement = document.getElementById("typeList");
  typeListElement.innerHTML = "";
}

// Get all the type buttons
const typeButtons = document.querySelectorAll(".typeButton");

// Attach event listeners to type buttons
typeButtons.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    document.getElementById('container').scrollTop = 0;
    const type = event.target.textContent;
    clearTypeList();
    displayPokemonByType(type);
  });
});

document.getElementById("typeClearButton").addEventListener("click", clearTypeList);
function clearTypeList() {
const typeListElement = document.getElementById('typeList');
typeListElement.innerHTML = '';
}

// Get the favorites container and button elements
const favoritesContainer = document.getElementById("favoritesContainer");
const favoritesButton = document.getElementById("FavoritesButton");
const clearFavoritesButton = document.getElementById("ClearFavoritesButton");

// Add an event listener to the "Show Favorites" button
favoritesButton.addEventListener("click", () => {
  // Fetch the favorite Pokémon IDs
  fetch('http://localhost:8000/favorites')
    .then(response => response.json())
    .then(favorites => {
      if (favorites.length === 0) {
        favoritesContainer.textContent = "No favorite Pokémon found.";
        return;
      }

      // Get the list of Pokémon IDs
      const pokemonIds = favorites.map(favorite => favorite.pokemon_id);

      // Fetch the details of each Pokémon
      const fetchPokemonDetails = pokemonIds.map(pokemonId =>
        fetch(`http://localhost:8000/pokemon/id/${pokemonId}`)
          .then(response => response.json())
          .then(pokemon => pokemon.name)
      );

      // Wait for all fetch requests to resolve
      Promise.all(fetchPokemonDetails)
        .then(pokemonNames => {
          // Clear the favorites container
          favoritesContainer.innerHTML = "";

          // Create a list element to display the favorite Pokémon
          const listElement = document.createElement("ul");
          listElement.classList.add("list-disc", "text-left");

          // Iterate over the Pokémon names and create list items
          pokemonNames.forEach(pokemonName => {
            const listItem = document.createElement("li");
            listItem.textContent = pokemonName;
            listElement.appendChild(listItem);
          });

          // Append the list element to the favorites container
          favoritesContainer.appendChild(listElement);
        })
        .catch(error => {
          console.error('Error:', error);
          favoritesContainer.textContent = "An error occurred while fetching the favorite Pokémon names.";
        });
    })
    .catch(error => {
      console.error('Error:', error);
      favoritesContainer.textContent = "An error occurred while fetching the favorite Pokémon IDs.";
    });
});

// Function to clear the favorites list
function clearFavoritesList() {
  favoritesContainer.innerHTML = "";
}

clearFavoritesButton.addEventListener("click", clearFavoritesList);
// Call the function to attach the event listeners after the dynamic content is loaded
window.addEventListener("DOMContentLoaded", attachEventListeners);