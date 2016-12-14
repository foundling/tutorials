Vue.http.get('ip-to-location.com')
    .then((locationData) => {
        //   
        return Vue.http.get('weather-data.com/api/v2/' + res.city);

    }).then((weatherData) => {

        return Vue.http.get('imgur.com/pictures/' + weatherData.mood);

    }).then((images) => {
        
        return images;
    });
