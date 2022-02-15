
const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

const main = async () => {
    const searchs = new Searchs();
    let opt = '';
    do {
        opt = await inquirerMenu();
        switch(opt){
            case 1:
                const place = await readInput('Please type the place: ');
                await searchs.city(place);
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