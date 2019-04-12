$(document).ready(function() {

   //инициализировали jScrollPane
  $('.blockToScroll').jScrollPane({
    contentWidth: '0px'
  });

  //получили ссылку на апи
  var pane = $('.blockToScroll');
  var api = pane.data('jsp');

  //по клику по кнопкам прокручиваем окно
  $('.btn-menu--up').click(function () {
    api.scrollByY(-300);
    return false;
  });

  $('.btn-menu--down').click(function () {
    api.scrollByY(300);
    return false;
  });

});