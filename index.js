
// https://api.openweathermap.org/data/2.5/weather?q=
//  {city name}
//  &appid=
//  {API key}
// &units={metric-C- or imperial-F-}
// $lang={lang}


// apiKey : c7f58327b37dc27ca3be426fc568f522


let weather ={
    apikey: 'c7f58327b37dc27ca3be426fc568f522',

        //  Fetching function :

        fetchWeather: function (city) {
            fetch(
              "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apikey
            )
              .then((response) => {
                if (!response.ok) {
                  alert("No weather found.");
                  throw new Error("No weather found.");
                }
                return response.json();
              })
              .then((data) => this.displayWeather(data));
          },

        // End of fetching function 


        //   Display Function : 

        displayWeather : (data)=>{
            const {name} = data;
            const {icon,description} = data.weather[0];
            const {temp,humidity} = data.main;
            const {speed} = data.wind;
            let time = 'night';

            document.querySelector('.city').innerHTML = 'Weather in '+name;
            document.querySelector('.icon').src  =   'https://openweathermap.org/img/wn/'+icon+'.png';
            document.querySelector('.description').innerHTML = description;
            document.querySelector('.temp').innerHTML = temp;
            document.querySelector('.humidity').innerHTML = 'Humidity:  '+ humidity + '%';
            document.querySelector('.wind').innerHTML = 'Wind speed:   ' + speed + 'km/h';
            let card = document.querySelector('.card');
            // let sec = document.getElementById('sec');
                // unit = document.getElementById("unit");



            card.style.backgroundColor = 'rgba(238, 238, 238, 0.548)';
            card.style.color = 'black';

            str = description.replace(/\s/g, '');

            if(icon.match(/^(\d{2}(d))$/)) 
            {
                time = 'day'; 
                card.style.backgroundColor = 'rgba(17, 34, 51, 0.548)';
                card.style.color = 'white'
            }

        //  API background :

             let bckurl = '-' + str + '-' + time ;
        
            // console.log(time);
        
            document.body.style.backgroundImage =       
             "url('https://source.unsplash.com/1600x900/?weather" + bckurl + "')";
           // "url(./weather.png)";
        //  End of API bck 

        // End of Display Func 
        
      },



        //   Search Function :

        search: function () {
            this.fetchWeather(document.querySelector(".search-bar").value);
          },

        //   End of Search Function 


        //   End of weather object ;) 
        };

        document.querySelector(".search button").addEventListener("click", function () {
          weather.search();
        });

        document
          .querySelector(".search-bar")
          .addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
              weather.search();
            }
          });
      
        weather.fetchWeather("Beirut");
