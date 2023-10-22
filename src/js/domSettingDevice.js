// =================================================================================================
// |                                                                                               |
// |                                   DOM НАЛАШТУВАННЯ => ПРИСТРОЇ                                |
// |                                                                                               |
// =================================================================================================
import { DeviceSettingWindow } from "./constant";
import { project } from "./load";
import { proxy } from "./projectJSON";
import { alert, confirm, formValidator } from "./auxilary";
$(document).ready(function() {
  // Додавання / редагування пристрою
  $(document).on('click','#DeviceAdd, [deviceIndex]', function() {
    let key = $(this).is('[deviceIndex]') ? $('[deviceIndex]').index(this) : $('[deviceIndex]').length;
    let newDevice = $(this).is('[deviceIndex]') ? false : true;
    let a, b, c, d, e;
    if (newDevice) {
      a = b = c = d = e = '';
    } else {
      let device = project.devices[key];
      a = device.title;
      b = device.id;
      c = device.period;
      d = device.reuqest;
      e = device.responce;
    }
    confirm(
    DeviceSettingWindow(a, b, c, d, e),
    'DeviceSettingWindow',
    function() {
      if (formValidator($('#DeviceSettingWindow'))) {
        let data = {};
        data = new Proxy(data, proxy);
          data.index = newDevice ? key : project.devices[key].index;
          data.title = $('#DeviceTitle').val();
          data.id = $('#DeviceId').val();
          data.period = $('#DevicePeriod').val();
          data.reuqest = $('#DeviceReuqest').val();
          data.responce = $('#DeviceResponce').val();
          data.enable = newDevice ? true : project.devices[key].enable;
          data.parameters = newDevice ? [] : project.devices[key].parameters;
          data.parameters = new Proxy(data.parameters, proxy);
        if (project.devices.some(function(item, index) {return item.id === data.id  && index !== key;})) {
          alert('ПРИСТРІЙ З ТАКИМ ІДЕНТИФІКАТОРОМ ВЖЕ ІСНУЄ');
          return false;
        } else {
          project.devices[key] = data; 
        }  
      } else {
        alert('ВВЕДІТЬ ЗНАЧЕННЯ');
        return false;
      }
    },
    function() {
    });
  });
  // Перемикач пристрою
  $(document).on('click','.deviceToggle', function() {
    let key = $(this).siblings('[deviceIndex]').attr('deviceIndex');
    project.devices[key].enable = !project.devices[key].enable;
  });
  // Редагування паарметрів
  $(document).on('click','.deviceEdit', function() {
    let target = $(this).siblings('[deviceIndex]').attr('deviceIndex');
    $('.parameter').remove();
    $('#PageSettingDevice, #PageSettingParameter').toggleClass('visible');
    $('#PageSettingParameter').attr('indexDevice', $('.deviceEdit').index(this));
    $('#PageSettingParameter').find('.sort').removeClass('sortUp sortDown');
    project.devices[target].parameters = new Proxy([...project.devices[target].parameters].sort(function(a, b) {
      return a.index > b.index ? 1 : a.index < b.index ? -1 : 0;
    }), proxy);
  });
  // Видалення пристрою
  $(document).on('click','.deviceRemove', function() {
    let key = $(this).siblings('[deviceIndex]').attr('deviceIndex');
    confirm(
    'БАЖАЄТЕ ВИДАЛИТИ ПРИСТРІЙ?',
    '',
    function() {
      let array = [...project.devices]
      array.splice(key, 1);
      project.devices = new Proxy(array, proxy);
    }, 
    function() {}
    );
  });
});