const axios = require('axios');

class Searchs {
    history = ['pais1', 'pais2', 'pais3'];

    constructor(){
        // TODO: read the database if exist
    }
    
    get paramMapBox () {

        return {
            'access_token': process.env.MAPBOX_KEY,
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
}

module.exports = Searchs;