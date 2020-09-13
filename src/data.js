import charactersData from './data/rickandmorty/rickandmorty.js';

export const allCharacters = charactersData;

export const filterBySpecies = (species) => 
    allCharacters.filter(c => c.species == species)

export const filterByStatus = (status) => 
    allCharacters.filter(c => c.status == status)

export const filterByGender = (gender) => 
    allCharacters.filter(c => c.gender == gender)


export const getSpeciesArray = () => {
    let speciesList = [];
    allCharacters.forEach(c => {
        if (!speciesList.includes(c.species))
            speciesList.push(c.species) 
    })
    return speciesList;
}    

export const getStatusArray = () => {
    let statusList = [];
    allCharacters.forEach(c => {
        if (!statusList.includes(c.status))
            statusList.push(c.status) 
    })
    return statusList;
}  

export const getGenderArray = () => {
    let genderList = [];
    allCharacters.forEach(c => {
        if (!genderList.includes(c.gender))
            genderList.push(c.gender) 
    })
    return genderList;
}


export const order = {
    ascending: (allCharacters) => {
        return allCharacters.sort(function(a,b) { 
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
    },
    descending: (allCharacters) => {
        return allCharacters.sort(function(a,b) { 
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        });
    },    
};
