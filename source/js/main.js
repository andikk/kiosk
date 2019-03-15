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

    LoadWeather();

    function LoadWeather() {
      $( ".weather" ).load( "Weather_Summary_Monitor4.htm");
    }

    setInterval(LoadWeather, 10000);
 });





