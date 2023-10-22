// =================================================================================================
// |                                                                                               |
// |                           DOM НАЛАШТУВАННЯ => ГРАФІКИ => ТРЕНДИ                               |
// |                                                                                               |
// =================================================================================================
import { TrendSettingWindow } from "./constant";
import { project } from "./load";
import { proxy } from "./projectJSON";
import { alert, confirm, formValidator } from "./auxilary";
$(document).ready(function() {
  // Додавання / редагування тренду
  $(document).on('click','#TrendAdd, [trendIndex]', function() {
    let chartIndex = $('#PageSettingTrend').attr('indexChart');
    let key = $(this).is('[trendIndex]') ? $('[trendIndex]').index(this) : $('[trendIndex]').length;
    let newTrend = $(this).is('[trendIndex]') ? false : true;
    let a, b, c, d, e, f;
    if (newTrend) {
      a = '';
      b = '#555555';
      c = [];
      $.each(project.devices, function(index) {
        c.push({
          value: project.devices[index].index,
          text: project.devices[index].title
        });
      });
      d = 'none';
      e = [];
      f = 'none';
    } else {
      let trend = project.charts[chartIndex].trends[key];
      let selectDevice = project.devices.find(device => device.index === parseInt(trend.device));
      let selectParameter = selectDevice ? selectDevice.parameters : '';
      a = trend.title;
      b = trend.color;
      c = [];
      $.each(project.devices, function(index) {
        c.push({
          value: project.devices[index].index,
          text: project.devices[index].title
        });
      });
      d = selectDevice ? selectDevice.index : 'none';
      e = [];
      $.each(selectParameter, function(index) {
        e.push({
          value: selectParameter[index].index,
          text: selectParameter[index].title
        });
      });
      f = selectParameter.find(parameter => parameter.index === parseInt(trend.parameter)) ? selectParameter.find(parameter => parameter.index === parseInt(trend.parameter)).index : 'none';
    }
    confirm(
    TrendSettingWindow(a, b, c, d, e, f),
    'TrendSettingWindow',
    function() {
      if (formValidator($('#TrendSettingWindow'))) {
        let data = {};
            data.index = newTrend ? key : project.charts[chartIndex].trends[key].index
            data.title = $('#TrendTitle').val();
            data.color = $('#TrendColor').val();
            data.device = $('#TrendDevice').val();
            data.parameter = $('#TrendParameter').val();
        if (project.charts[chartIndex].trends.some(function(item, index) {return item.device === data.device && item.parameter === data.parameter && index !== key;})) {
          alert('ТРЕНД З ТАКИМИ ПАРАМЕТРАМИ ВЖЕ ІСНУЄ');
          return false;
        } else {
            project.charts[chartIndex].trends[key] = data; 
        }  
      } else {
        alert('ВВЕДІТЬ ЗНАЧЕННЯ');
        return false;
      }
    },
    function() {
    });
  });
  // Видалення тренду
  $(document).on('click','.trendRemove', function(event) {
    let key = $(this).siblings('[trendIndex]').attr('trendIndex');
    confirm(
    'БАЖАЄТЕ ВИДАЛИТИ ТРЕНД?',
    '',
    function() {
      let array = [...project.charts[$('#PageSettingTrend').attr('indexChart')].trends]
      array.splice(key, 1);
      project.charts[$('#PageSettingTrend').attr('indexChart')].trends = new Proxy(array, proxy);
    },
    function() {}
    );
  })
  // Функція зміни пристрою
  $(document).on('change', '#TrendDevice', function() {
    let select = project.devices.find(device => device.index === parseInt($('#TrendDevice').val())).parameters
    $('#TrendParameter').empty();
    $('#TrendParameter').append($('<option>').val('none').text('Оберіть параметр').prop('disabled', true).prop('selected', true));
    $.each(select, function(index) {
      let option = $('<option>').val(select[index].index).text(select[index].title);
      $('#TrendParameter').append(option);
    });
  });
});