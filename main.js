let enteredCity = document.getElementById('entered_city');
let submitButton = document.getElementById('submit_button');
let API_key = "6778f336382c3774112c0c4f6c32a647";
let showCity = document.getElementById('city');
let current_temp = document.getElementById('current_temperature');
let sky_status= document.getElementsByClassName('sky');
let bg_img = document.getElementsByTagName('img');
let minMaxTemp = document.getElementById('min-max-temp');
let today_date = document.getElementById('date');
let link="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+API_key;
function fetch_data(){
    let city=enteredCity.value;
    let link="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+API_key;
    fetch(link)
.then(response=>response.json())
.then(   data=>
   {
        
        var City = data['name'];
        var curr_temp = (data['main']['temp'] - 273.15).toFixed(2);
        var min_temp = (data['main']['temp_min']-273.15).toFixed(2);
        var max_temp =(data['main']['temp_max']-273.15).toFixed(2);
        var pressure = data['main']['pressure'];
        var weather = data['weather'][0]['main']
        var windSpeed = data['wind']['speed'];
        var cloud = data['clouds']['all'];
        var today = new Date();
        var date = today.getDate();
        var day = today.getDay();
        var month = today.getMonth();
        var year = today.getFullYear();
        document.getElementsByTagName('body')[0].style.background = "url(https://source.unsplash.com/1500x1000/?"+City+")"
        document.getElementsByTagName('body')[0].style.backgroundRepeat="no-repeat";
        today_date.innerText = weekDay(day) +" | "+date+"/"+toMonthName(month)+"/"+year;
        current_temp.innerHTML = curr_temp + "&deg;C";
        minMaxTemp.innerHTML = min_temp + "&deg;C | "+max_temp + "&deg;C" ;
        showCity.innerText = City;
        sky_status[1].innerText = weather;
        if(weather=="Clouds"){
            sky_status[0].setAttribute('class' , 'fas fa-cloud fa 4x sky'); 
        }
        else if(weather=="Clear"){
            sky_status[0].setAttribute('class' , 'fas fa-sun fa 4x sky'); 
        }
        else if(weather=="Thunderstorm"){
            sky_status[0].setAttribute('class' , 'fas fa-bolt fa 4x sky'); 
        }
        else if(weather=="Drizzle"){
            sky_status[0].setAttribute('class' , 'fas fa-cloud-rain fa 4x sky'); 
        }
        else if(weather=="Rain"){
            sky_status[0].setAttribute('class' , 'fas fa-cloud-shower-heavy fa 4x sky'); 
        }
        else if(weather=="Snow"){
            sky_status[0].setAttribute('class' , 'fas fa-snow-flake fa 4x sky'); 
        }
        else{
            sky_status[0].setAttribute('class' , 'fas fa-smog fa 4x sky');
        }
        bg_img[0].setAttribute('src','https://source.unsplash.com/600x900/?'+weather+" sky");
        document.getElementById('feels').innerHTML = "Feels like : "+(data['main']['feels_like']-273.15).toFixed(2)+"&deg;C";
        document.getElementById('windspeed').innerText = "Wind Speed : "+data['wind']['speed']+" m/s";
        document.getElementById('pressure').innerText = "Pressure : "+data['main']['pressure']+" hPa";
        document.getElementById('humidity').innerText = "Humidity : "+data['main']['humidity']+" %";
        document.getElementById('sunrise').textContent = "Sunrise : "+ unixstamp_to_time(data['sys']['sunrise'])
        document.getElementById('sunset').textContent = "Sunset : "+ unixstamp_to_time(data['sys']['sunset'])

    })
.catch(err=>"Incorrect City Name ")
}

function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber );
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
  function weekDay(dayIndex) {
    return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
  }

function unixstamp_to_time(unixTimestamp){
    dateObj = new Date(unixTimestamp * 1000);
    utcString = dateObj.toUTCString();
    time = utcString.slice(-11, -4);
    return time;
  }