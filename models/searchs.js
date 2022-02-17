const fs = require('fs')
const axios = require('axios');

class Searchs {
    history = [];
    dbPath = './db/database.json'
   
    constructor(){
        // TODO: read the database if exist
        this.readDb();
    }
    
    get paramMapBox () {

        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5
        }
    } 

    saveHistory(name = '') {
        if(!this.history.includes(name)){

            if (this.history.length < 5){
                this.history.unshift(name);
            }
            else {
                this.history.pop();
                this.history.unshift(name);
            }
            this.saveDb(this.history);
        }
    }
    
    async city(place=''){
        try{
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramMapBox
            })
            const answer = await instance.get();
            
            if(answer.data.features.length > 0){
                return answer.data.features.map(place =>(
                    {
                        id:place.id,
                        name:place.place_name,
                        lng:place.center[0],
                        lat:place.center[1]
                    }
                ));
            }

            return [];
        }catch(error){
            console.log(error)
            return [];
        }
        
    }

    async weatherPlace(lon,lat){
        try{

            const instance = axios.create({
                baseURL : 'https://api.openweathermap.org/data/2.5/weather',
                params : {
                    'appid' : process.env.OPENWEATHER_KEY,
                    lat,
                    lon,
                    'lang':'es',
                    'unit':'metric'
                }
            })

            const anwser = await instance.get();
            return {
                desc: anwser.data.weather[0].description,
                min: anwser.data.main.temp_min,
                max: anwser.data.main.temp_max
            };
        }catch(error){
            console.log(error)
        }
    }

    saveDb(data){
        fs.writeFileSync(this.dbPath, JSON.stringify(data))
    }

    readDb(){
        if(fs.existsSync(this.dbPath)){
            this.history = JSON.parse(fs.readFileSync(this.dbPath));
        }
    }
}

module.exports = Searchs;