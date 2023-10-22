// =================================================================================================
// |                                                                                               |
// |                                            DOM ПРОЄКТ                                         |
// |                                                                                               |
// =================================================================================================
import { project } from "./load";
import { proxy } from "./projectJSON";
import { confirm } from "./auxilary";
// Функція приховування елементів проєкту
export function hideSetting() {
  $('.projectDependent').toggleClass('disable', $.isEmptyObject(project));
}
$(document).ready(function() {
  // Створення нового проєкту
  $('#ProjectCreate').on('click', function() {
    if ($.isEmptyObject(project)) {
      project = new Proxy(project, proxy);
      project.title = 'newProject';
      project.modbus = {};
      project.modbus = new Proxy(project.modbus, proxy);
        project.modbus.baudRate = '9600';
        project.modbus.dataBits = '8';
        project.modbus.parity = 'N';
        project.modbus.stopBits = '1'; 
      project.devices = [];
      project.devices = new Proxy(project.devices, proxy);
      project.charts = [];
      project.charts = new Proxy(project.charts, proxy);
      hideSetting();
    } else {
      confirm('БАЖАЄТЕ СТВОРИТИ НОВИЙ ПРОЄКТ БЕЗ ЗБЕРЕЖЕННЯ ПОТОЧНОГО?', 
      '',
      function() {
        project = new Proxy(project, proxy);
        project.title = 'newProject';
        project.modbus = {};
        project.modbus = new Proxy(project.modbus, proxy);
          project.modbus.baudRate = '9600';
          project.modbus.dataBits = '8';
          project.modbus.parity = 'N';
          project.modbus.stopBits = '1'; 
        project.devices = [];
        project.devices = new Proxy(project.devices, proxy);
        project.charts = [];
        project.charts = new Proxy(project.charts, proxy);
        hideSetting();
      },
      function() {

      });
    }
  });
  // Сортування
  $('.sort').on('click', function() {
    const Sort = {
      'device': [...project.devices],
      'parameter': $.isEmptyObject(project.devices[$('#PageSettingParameter').attr('indexDevice')]) ? '' : [...project.devices[$('#PageSettingParameter').attr('indexDevice')].parameters],
      'chart': [...project.charts],
      'trend': $.isEmptyObject(project.charts[$('#PageSettingTrend').attr('indexChart')]) ? '' : [...project.charts[$('#PageSettingTrend').attr('indexChart')].trends]
    }
    let data = $(this).attr('data');
    let array = ($(this).attr('array'));
    $(this).closest('.row').find('.sort').not($(this)).removeClass('sortUp sortDown');
    if ($(this).hasClass('sortUp')) {
      $(this).toggleClass('sortUp').toggleClass('sortDown');
    } else if ($(this).hasClass('sortDown')) {
      $(this).toggleClass('sortDown');
      data = 'index';
    } else {
      $(this).toggleClass('sortUp');
    }
    let up = $(this).hasClass('sortUp');
    let down = $(this).hasClass('sortDown');
    let direction = up ? 1 : down ? -1 : 1;
    Sort[array].sort(function (a, b) {
      let valueA = ['index', 'id', 'register'].includes(data) ? +a[data] : a[data];
      let valueB = ['index', 'id', 'register'].includes(data) ? +b[data] : b[data];
      return direction * (valueA > valueB ? 1 : valueA < valueB ? -1 : 0);
    });
    switch(array) {
      case('device'):
        project.devices = new Proxy([...Sort[array]], proxy);
        break;
      case('parameter'):
        project.devices[$('#PageSettingParameter').attr('indexDevice')].parameters = new Proxy([...Sort[array]], proxy);
        break;
      case('chart'):
        project.charts = new Proxy([...Sort[array]], proxy);
        break;
      case('trend'):
        project.charts[$('#PageSettingTrend').attr('indexChart')].trends = new Proxy([...Sort[array]], proxy);
        break;
    }
  }); 
});