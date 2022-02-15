const axios = require('axios');

class Searchs {
    history = ['pais1', 'pais2', 'pais3'];

    constructor(){
        // TODO: read the database if exist
    }
    
    get paramMapBox () {

        return {
            'access_token': 'pk.eyJ1Ijoiam9zdWV6b3JyaWxsYTIzIiwiYSI6ImNrem9uM2p6MTBiYTIyb25ha3JsOG1jMHoifQ.vhYivRgn3zOvbjGkXAFZPg',
            'language': 'es',
            'limit': 5
        }
    } 

    async city(place=''){
        try{
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramMapBox
            })
            const answer = await instance.get();
            console.log(answer.data);
            // answer.data.features.forEach(element => {
            //     console.log(element.text);
            // });
            // console.log(answer.data.features);
            return [];
        }catch(error){
            return [];
        }
        
    }
}

module.exports = Searchs;