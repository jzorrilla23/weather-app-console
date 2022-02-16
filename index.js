require('dotenv').config();
const { readInput, inquirerMenu, pause, showPlaces } = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

const main = async () => {
    const searchs = new Searchs();
    let opt = '';
    do {
        opt = await inquirerMenu();
        switch(opt){
            case 1:
                const termn = await readInput('Please type the place: ');
                const places = await searchs.city(termn);
                const id = await showPlaces(places);
                const place = places.find(place => place.id == id);
                console.log('\nPais Selecionado\n'.green)
                console.log('City      : ' + place.name)
                console.log('Latitudt  : ' + place.lat)
                console.log('Longitudt : ' + place.lng + '\n')
                break;
            
            case 2:
                console.log('Hisotrial')
                break;
            
            default:
                break;
        }
        if (opt !== 0)
            await pause();
    } while (opt != 0)
}

main();
