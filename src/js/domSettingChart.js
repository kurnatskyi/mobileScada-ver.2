// =================================================================================================
// |                                                                                               |
// |                                     DOM НАЛАШТУВАННЯ => ГРАФІКИ                               |
// |                                                                                               |
// =================================================================================================
import { ChartSettingWindow } from "./constant";
import { project } from "./load";
import { proxy } from "./projectJSON";
import { alert, confirm, formValidator } from "./auxilary";
$(document).ready(function() {
  // Додавання / редагування графіків
  $(document).on('click','#ChartAdd, [chartIndex]', function() {
    let key = $(this).is('[chartIndex]') ? $('[chartIndex]').index(this) : $('[chartIndex]').length;
    let newChart = $(this).is('[chartIndex]') ? false : true;
    let a = newChart ? '' : project.charts[key].title;
    confirm(
      ChartSettingWindow(a),
      'ChartSettingWindow',
      function() {
        if (formValidator($('#ChartSettingWindow'))) {
          let data = {};
          data = new Proxy(data, proxy);
            data.index = newChart ? key : project.charts[key].index,
            data.title = $('#ChartTitle').val(),
            data.trends = newChart ? [] : project.charts[key].trends
            data.trends = new Proxy(data.trends, proxy);
          if (project.charts.some(function(item, index) {return item.title === data.title  && index !== key;})) {
            alert('ГРАФІК З ТАКОЮ НАЗВОЮ ВЖЕ ІСНУЄ');
            return false;
          } else {
            project.charts[key] = data; 
          }  
        } else {
          alert('ВВЕДІТЬ ЗНАЧЕННЯ');
          return false;
        }
      },
    function() {
    });
  });
  // Редагування трендів
  $(document).on('click','.chartEdit', function() {
    let target = $(this).siblings('[chartIndex]').attr('chartIndex');
    $('.trend').remove();
    $('#PageSettingChart, #PageSettingTrend').toggleClass('visible');
    $('#PageSettingTrend').attr('indexChart', $('.chartEdit').index(this));
    $('#PageSettingTrend').find('.sort').removeClass('sortUp sortDown');
    project.charts[target].trends = new Proxy([...project.charts[target].trends].sort(function(a, b) {
      return a.index > b.index ? 1 : a.index < b.index ? -1 : 0;
    }), proxy);
  });
  // Видалення графіку
  $(document).on('click','.chartRemove', function() {
    let key = $(this).siblings('[chartIndex]').attr('chartIndex');
    confirm(
    'БАЖАЄТЕ ВИДАЛИТИ ГРАФІК?',
    '',
    function() {
      let array = [...project.charts]
      array.splice(key, 1);
      project.charts = new Proxy(array, proxy);
    }, 
    function() {}
    );
  });
});
