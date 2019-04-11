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
       size:220,
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
//загрузка данных о погоде
//сначала загружаем при загрузке страницы в первый раз
    LoadWeather();

    function LoadWeather() {
      $( ".weather" ).load( "Weather_Summary_Monitor4.htm");
    }
//а потом обновлем с опеределнныминтервалом
    setInterval(LoadWeather, 10000);

//загрузка новостей
var newsTitel;
var newsText;

//контейнер для слайдера новостей, в него будем добавлять новости
var carousel = document.querySelector('.carousel-inner-news');

var requestURL = "http://195.209.244.38/handleSolrSelect";
var requestString = requestURL + "?q=*&fq=type:NewsBlock&fq=category:\"/Glavnaya\"&wt=json";

var allNews = {};

$.get('data2.json',function (data2) {
  //загрузили объект parts
  var parts = data2.parts;

  //перебираем parts
  $.each(parts, function (i, partId) {
    //находим новость с конкретным ID
    newsItem=data2[partId];

    //конвертируем из JSON обекта в JavaScript объект
    newsItemJS = $.parseJSON(newsItem);

    //получаем значения полей
    var newsTitel = newsItemJS.title;
    var newsText = newsItemJS.short_description;
    var newsFullText = newsItemJS.full_description

     //находим шаблон для вставки в конетейнер слайдера новостей
     var newsTemplate = document.querySelector('#news-template').content;

     //находим блок с содержимым новости
     var newNewsTemplate = newsTemplate.querySelector('.news-item');

     //если это первый слайд добавим класс active
     if (i === 1) {
       newNewsTemplate.classList.add('active');
     }
     else {
       newNewsTemplate.classList.remove('active');
     }

     //склонируем html элемент
     var news = newNewsTemplate.cloneNode(true);

     //добавим заголовок новости
     var newsTitelHTML = news.querySelector('.news-title');
     newsTitelHTML.textContent = newsTitel;

     //добавим текст новости
     var newsTextHTML = news.querySelector('.news-text');
     newsTextHTML.textContent = newsText;

     //вешаем обработчик события на кнопку Подробнее
     var buttonMore = news.querySelector('.button-more');
     buttonMore.addEventListener( "click" , function() {
       //меняем содержимое модального окна
       var modalTitle=document.querySelector('.modal-title');
       modalTitle.textContent=newsTitel;

       var modalBody=document.querySelector('.modal-body--index');
       modalBody.innerHTML = newsFullText;

       var newsLinks=modalBody.querySelectorAll('a');
       for (n = 0; n < newsLinks.length; n++) {
         newsLinks[n].removeAttribute('href');
       }

       var newsImages=modalBody.querySelectorAll('img');
       for (k = 0; k < newsImages.length; k++) {
         var imagePath = newsImages[k].src;
         imagePath ="http://195.209.244.38/" + imagePath.substr(22);
         //console.log(imagePath);
         newsImages[k].src = imagePath;
       }
     });

     //вставим сформированную разметку в контейнер для новостей
     carousel.appendChild(news);

  })

},"json");

//функция для инициализации библиотеки для прокрутки
function scrollInitModal() {
  //инициализировали jScrollPane
  $('.modal-body--index').jScrollPane();

  //получили ссылку на апи
  var pane = $('.modal-body--index');
  var api = pane.data('jsp');

  //по клику по кнопкам прокручиваем окно
  $('.btn--down').click(function () {
    api.scrollByY(300);
    return false;
  });

  $('.btn--up').click(function () {
    api.scrollByY(-300);
    return false;
  });
}

//при открытии модального окна инициализируем библиотеку для прокрутки
//необходимо вызывать при открытии, т.к. только после откытия считается высота содержимого окна
$('#ModalCenter').on('shown.bs.modal', function (e) {
  scrollInitModal();
})

//при закрытии модального окна очищаем библиотеку для прокртки
$('#ModalCenter').on('hidden.bs.modal', function (e) {
  var pane = $('.modal-body--index');
  var api = pane.data('jsp');
  api.destroy();
})

function scrollInitPage() {
   //инициализировали jScrollPane
  $('.blockToScroll').jScrollPane();

  //получили ссылку на апи
  var pane = $('.blockToScroll');
  var api = pane.data('jsp');

  //по клику по кнопкам прокручиваем окно
  $('.btn-menu--up').click(function () {
    api.scrollByY(300);
    return false;
  });

  $('.btn-menu--down').click(function () {
    api.scrollByY(-300);
    return false;
  });
}

//scrollInitPage();

});



