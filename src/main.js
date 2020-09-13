import { allCharacters, filterBySpecies, filterByStatus, filterByGender, getSpeciesArray, getStatusArray, getGenderArray, order } from './data.js'


document.querySelector('#all').addEventListener('click', allCharacters);

const getListAllCharacters = () => {
    drawResults(allCharacters);
}
document.querySelector('#all').addEventListener('click', getListAllCharacters);

const getListSpecies = (species) => {
    let filteredSpecies = filterBySpecies(species);
    drawResults(filteredSpecies);
}

const speciesArray = getSpeciesArray();
speciesArray.forEach(species => {
    if (document.querySelector('#' + species.toLowerCase()))
        document.querySelector('#' + species.toLowerCase()).addEventListener('click', () => getListSpecies(species));
    // else    
    //     console.log("Esta especie no tiene elemento en HTML: " + species);
})

const getListStatus = (status) => {
    let filteredStatus = filterByStatus(status);
    drawResults(filteredStatus);
}

const statusArray = getStatusArray();
statusArray.forEach(status => {
    if (document.querySelector('#' + status.toLowerCase()))
        document.querySelector('#' + status.toLowerCase()).addEventListener('click', () => getListStatus(status));
    // else    
    //     console.log("Esta especie no tiene elemento en HTML: " + status);
})

const getListGender = (gender) => {
    let filteredGender = filterByGender(gender);
    drawResults(filteredGender);
}

const genderArray = getGenderArray();
genderArray.forEach(gender => {
    if (document.querySelector('#' + gender.toLowerCase()))
        document.querySelector('#' + gender.toLowerCase()).addEventListener('click', () => getListGender(gender));
    // else    
    //     console.log("Esta especie no tiene elemento en HTML: " + gender);
})

const getListAtoZ = () => {
    let sortedAscending = [];
    sortedAscending = order.ascending(allCharacters);
    drawResults(sortedAscending);
}
document.querySelector('#orderAtoZ').addEventListener('click', getListAtoZ);

const getListZtoA = () => {
    let sortedDescending = [];
    sortedDescending = order.descending(allCharacters);
    drawResults(sortedDescending);
}
document.querySelector('#orderZtoA').addEventListener('click', getListZtoA);

const overlay = document.getElementById('overlay');

const clickToShowCharacterDetail = (characterElement) => {
    const path = characterElement.dataset.image;
    const name = characterElement.dataset.name;
    const species = characterElement.dataset.species;
    const gender = characterElement.dataset.gender;
    const status = characterElement.dataset.status;
    overlay.classList.add('active');
    document.querySelector('#overlay img').src = path;
    document.querySelector('#overlay .description').innerHTML = `
        <div>
            <div class="character-name">${name}</div>
            <div>Status: ${status}</div>
            <div>Gender: ${gender}</div>
            <div>Specie: ${species}</div>
        </div>
     `;
};

document.querySelector('#btn-close').addEventListener('click', () => {
    overlay.classList.remove('active');
});
overlay.addEventListener('click', (event) => {
    event.target.id === 'overlay' ? overlay.classList.remove('active') : "";
})


function drawCharactersPage(index, arrayOfCharacters) {
    let pageOfCharacters = arrayOfCharacters.slice(index, index + 20);

    const elementOrderedList = document.getElementById('listCharacters');
    elementOrderedList.innerHTML = "";

    for (let i = 0; i < pageOfCharacters.length; i++) {

        const result = pageOfCharacters[i];
        const elementDiv = document.createElement("div");
        elementDiv.classList.add("character");

        elementDiv.dataset.image = result.image;
        elementDiv.dataset.name = result.name;
        elementDiv.dataset.species = result.species;
        elementDiv.dataset.gender = result.gender;
        elementDiv.dataset.status = result.status;

        elementDiv.addEventListener('click', () => clickToShowCharacterDetail(elementDiv))
        elementDiv.innerHTML = `
                <img src="${result.image}" alt="${result.name}">
                <h3>${result.name}</h3>`
        elementOrderedList.appendChild(elementDiv);
    }
}

function drawResults(arrayOfCharacters) {

    const buttonsContainer = document.getElementById("buttonsContainer");
    buttonsContainer.innerHTML = "";

    drawCharactersPage(0, arrayOfCharacters);

    for (let pageIndex = 0; pageIndex < arrayOfCharacters.length; pageIndex = pageIndex + 20) {
        const button = document.createElement("button");
        const buttonText = document.createTextNode(parseInt(pageIndex / 20) + 1);
        button.appendChild(buttonText);

        if (pageIndex == 0) button.classList.add('active');

        button.addEventListener('click', function () {
            pageIndex == pageIndex;
            drawCharactersPage(pageIndex, arrayOfCharacters);
            let currentButton = document.querySelector(".buttonsContainer button.active");
            currentButton.classList.remove("active");
            button.classList.add("active");
        });
        buttonsContainer.appendChild(button);
    }
}

// Searching function
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = allCharacters.filter(character => {
        return character.name.toLowerCase().includes(searchString);
    });
    drawResults(filteredCharacters);
});


/* Menu responsive */
let mainMenu = document.getElementById("iconMenu");
let topnav = document.getElementById("myTopnav");
let contador = 0;

mainMenu.addEventListener("click", function () {
    if (contador == 0) {
        topnav.className = ("topnav close-menu");
        contador = 1;
    } else {
        topnav.classList.remove("close-menu");
        topnav.className = ("topnav open-menu");
        contador = 0;
    }
    scrollableSpecies.style.display = 'none'
})

window.addEventListener('resize', function () {
    if (screen.width > 750) {
        contador = 0;
        topnav.classList.remove("close-menu");
        topnav.className("topnav open-menu");
    }
})

window.addEventListener('resize', function () {
    if (screen.width > 750) {
        speciesBtn.addEventListener('click', function () {
            scrollableSpecies.removeAttribute("style");
        })
    }
})



/*CRECE LETRA ACTIVO*/
window.addEventListener('load', () => {
    const menuLinks = document.querySelectorAll('#myTopnav a');
    menuLinks.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            menuLinks.forEach((menuLinks) => menuLinks.classList.remove('active'));
            event.target.classList.add('active');
        });
    });
})

/*----SCROLL------*/
const speciesBtn = document.getElementById('species');
const genderBtn = document.getElementById('gender');
const statusBtn = document.getElementById('status');
const orderBtn = document.getElementById('order');
const scrollableSpecies = document.getElementById('scroll');
const scrollableGender = document.getElementById('scrollGender');
const scrollableStatus = document.getElementById('scrollStatus');
const scrollableOrder = document.getElementById('scrollOrder');

if (screen.width <= 750 && screen.width > 400 ) {
    genderBtn.addEventListener('click', function() {
        scrollableSpecies.style.display = 'none'
    })
    
    statusBtn.addEventListener('click', function() {
        scrollableSpecies.style.display = 'none'
    })
    
    orderBtn.addEventListener('click', function() {
        scrollableSpecies.style.display = 'none'
    })
    
    speciesBtn.addEventListener('click', function() {
        scrollableSpecies.style.display = 'flex'
    })
}

if (screen.width <= 400) {
    speciesBtn.addEventListener('click', function() {
        scrollableSpecies.style.display = 'flex'
        scrollableGender.style.display = 'none'
        scrollableStatus.style.display = 'none'
        scrollableOrder.style.display = 'none'
    })
    genderBtn.addEventListener('click', function() {
        scrollableGender.style.display = 'flex'
        scrollableSpecies.style.display = 'none'
        scrollableStatus.style.display = 'none'
        scrollableOrder.style.display = 'none'
    })
    
    statusBtn.addEventListener('click', function() {
        scrollableStatus.style.display = 'flex'
        scrollableSpecies.style.display = 'none'
        scrollableGender.style.display = 'none'
        scrollableOrder.style.display = 'none'
    })
    
    orderBtn.addEventListener('click', function() {
        scrollableOrder.style.display = 'flex'
        scrollableSpecies.style.display = 'none'
        scrollableGender.style.display = 'none'
        scrollableStatus.style.display = 'none'
    })

}

