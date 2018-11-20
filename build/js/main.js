$(document).ready(function() {

    var path = window.location.pathname;
    var monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    var dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    var langLocale = "ru";
    var cityLocalName = "Погода в Ставрополе";
    var dateLocaleLable = "Дата";
    var tempLocaleLable = "Температура";
    var queryParams = {
        q: "Stavropol",
        num_of_days: "5",
        tp: "24",
        format: "json",
        lang: langLocale,
        key: "e7643a7100d14ce0adb72111180410",
        showmap: "yes"
    };


     var newDate = new Date();
     newDate.setDate(newDate.getDate());
     $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
     setInterval(function() {
       var seconds = new Date().getSeconds();
       $("#sec").html((seconds < 10 ? "0" : "") + seconds);
     }, 1000);
     setInterval(function() {
       var minutes = new Date().getMinutes();
       $("#min").html((minutes < 10 ? "0" : "") + minutes);
     }, 1000);
     setInterval(function() {
       var hours = new Date().getHours();
       $("#hours").html((hours < 10 ? "0" : "") + hours);
     }, 1000);

     $('#myclock').thooClock({
       dialColor:'#222',
       secondHandColor:'#C00',
       size:300,
       showNumerals:false,
       brandText:'СКФУ'
     });



    if (path.indexOf("/en/") > 0) {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        langLocale = "en";
        cityLocalName = "Weather in Stavropol";
        dateLocaleLable = "Date";
        tempLocaleLable = "Temperature";
    }


  $('.weather-header').html(cityLocalName);
    var weatherTable = $('.weather-table');
    weatherTable.html('<tr><th class="text-center">' + dateLocaleLable + '</th>' + '<th class="text-center">' + tempLocaleLable + '</th><th></th></tr>');
    weatherTable.append('<tbody>');

    var jqxhr = $.get('https://api.worldweatheronline.com/premium/v1/weather.ashx', queryParams);
    jqxhr.done(function (responseData) {
        var weatherBody = $('.weather-table tbody');
        $.each(responseData, function (weatherData, dataElement) {
            var weather = dataElement.weather;
            $.each(weather, function (weatherElement, value) {
                var tmpDate = String(value.date);
                var tmpDateArray = tmpDate.split("-");
                var tmpWeatherIconUrl = value.hourly[0]['weatherIconUrl'];
                var weatherString = '<tr><td class="text-center">' + tmpDateArray[2] + '.' + tmpDateArray[1] + '.' + tmpDateArray[0] + '</td>'
                    + '<td class="text-center">' + value.mintempC + '&#8451' + ' &#8660 ' + value.maxtempC + '&#8451</td>'
                    + '<td class="text-center"><img src="' + tmpWeatherIconUrl[0]['value'] + '"/></td></tr>';
                weatherBody.append(weatherString);
            });

        });
    })


   });