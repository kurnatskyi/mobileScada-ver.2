// =================================================================================================
// |                                                                                               |
// |                                          ОБРОБКА DOM                                          |
// |                                                                                               |
// =================================================================================================
import { chart } from "./domChart";
$(document).ready(function() {
  // Колірна тема
  $("#ThemeMode").change(function() {
    let icon = $(this).next("label").find("i");
    if ($(this).is(":checked")) {
      icon.removeClass('bi-sun');
      icon.addClass('bi-moon-stars');
      $('html').attr('theme', 'dark');
    } else {
      icon.removeClass('bi-moon-stars');
      icon.addClass('bi-sun');
      $('html').attr('theme', 'light');
    }
    let bodyColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--body-color');
    let bodyBgColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--body-bg-color');
    let secondaryBgColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--secondary-bg-color');
    let linkColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--link-color');
    let borderColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--border-color');
    chart.update({chart: {animation: false}}, false);
    $('.highcharts-legend.highcharts-no-tooltip').remove();
    chart.update({
      chart: { 
        borderColor: borderColor,
        backgroundColor: bodyBgColor,
      },
      navigator: {
        outlineColor: bodyColor,
        xAxis: {
          lineColor: bodyColor,
          gridLineColor: bodyColor,
        }
      },
      scrollbar: {
        trackBorderColor: borderColor,
        trackBackgroundColor: bodyBgColor,
        barBorderColor: borderColor,
        barBackgroundColor: bodyColor,
      },     
      tooltip: { 
        backgroundColor: secondaryBgColor,
        borderColor: borderColor,
        style: {  
          color: bodyColor,
        }
      },
      legend: { 
        itemStyle: {
          color: bodyColor
        },
        itemHoverStyle: {
          color: linkColor
        },
        itemHiddenStyle: {
          color: secondaryBgColor
        }, 
      },
      xAxis: {
        lineColor: bodyColor,
        gridLineColor: bodyColor,
        labels: {
          style: {
            color: bodyColor
          }
        },
        tickColor: bodyColor
      },
      yAxis: {
        lineColor: bodyColor,
        gridLineColor: bodyColor,
        labels: {
          style: {
            color: bodyColor
          }
        },
        tickColor: bodyColor
      },
    });
    chart.update({chart: {animation: true}}, false);
  });
  // Вихід користувача
  $('#Logout').on('click', function() {
    let token = localStorage.getItem("token");
      $.ajax({
          type: 'GET',
          url: '/loginPage',
          data: {
            action: 'logout'
          },
          headers: {
            "Authorization": token
          },
          success: function() {
            localStorage.removeItem("token");
            window.location.href = "/";  
          },
          error: function() {
            
          }
      });
  });
  // Меню, що випадає
  $('.dropdown').on('click', function() {
    let dropdownMenu = $(this).find('.dropdownMenu');
    dropdownMenu.toggleClass('visible');
  });
  // Меню, що випадає
  $(document).on('click', '[toggle="collapse"]', function() {
    $($(this).attr('aria')).toggleClass('show');
  });
  // Перемикач головних сторінок
  $(document).on('click', '[toggle="page"]', function() {
    if (!$(this).hasClass('disable')) {
      $('.page').removeClass('visible');
      $('input, select').removeClass('invalid');
      $($(this).attr('aria')).addClass('visible');
      if ($('#MainMenu').hasClass('show')) {
        $('#MainMenu').addClass('invisible');
        $('#MainMenu').removeClass('show');
        setTimeout(function() {
          $('#MainMenu').removeClass('invisible');
        }, 200);
      }
    } 
  });
  chart.addSeries({
    id: 'TEST',
    name: 'TEST',
  })
  $(document).on('click', '#Test', function() {
    chart.addSeries({
      id: 'TEST',
      name: 'TEST',
    })
    console.log(chart.legend.pages.length)
    console.log(chart.legend.currentPage)
    function getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }
    let x = parseInt(getRandomNumber(1, 50));
    ;
    chart.get('TEST').addPoint([(new Date()).getTime(), x], false, false, false, false)
  });
});