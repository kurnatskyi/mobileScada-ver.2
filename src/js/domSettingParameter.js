// =================================================================================================
// |                                                                                               |
// |                       DOM НАЛАШТУВАННЯ => ПРИСТРОЇ => ПАРАМЕТРИ                               |
// |                                                                                               |
// =================================================================================================
import { ParameterSettingWindow } from "./constant";
import { project } from "./load";
import { proxy } from "./projectJSON";
import { alert, confirm, formValidator } from "./auxilary";
$(document).ready(function() {
  // Додавання / редагування параметра
  $(document).on('click','#ParameterAdd, [parameterIndex]', function() {
    let deviceIndex = $('#PageSettingParameter').attr('indexDevice');
    let key = $(this).is('[parameterIndex]') ? $('[parameterIndex]').index(this) : $('[parameterIndex]').length;
    let newParameter = $(this).is('[parameterIndex]') ? false : true;
    let a, b, c, d, e, f, g;
    if (newParameter) {
      a = '';
      b = '';
      c = 'rc';
      d = '1';
      e = '0'
      f = '';
      g = '0'
    } else {
      let parameter = project.devices[deviceIndex].parameters[key];
      a = parameter.title;
      b = parameter.register;
      c = parameter.function;
      d = parameter.type;
      e = parameter.unit;
      f = parameter.coefficient;
      g = parameter.simbol
    }
    confirm(
    ParameterSettingWindow(a, b, c, d, e, f, g),
    'ParameterSettingWindow',
    function() {
      if (formValidator($('#ParameterSettingWindow'))) {
        let data = {};
            data.index = newParameter ? key : project.devices[deviceIndex].parameters[key].index;
            data.title = $('#ParameterTitle').val();
            data.register = $('#ParameterRegister').val();
            data.function = $('#ParameterFunctionCode').val();
            data.type = $('#ParameterType').val();
            data.unit = $('#ParameterUnit').val();
            data.coefficient = $('#ParameterCoefficient').val();
            data.simbol = $('#ParameterSimbol').val();
        if (project.devices[deviceIndex].parameters.some(function(item, index) {return item.register === data.register && item.function === data.function && index !== key;})) {
          alert('ПАРАМЕТР З ТАКИМ РЕГІСТРОМ ВЖЕ ІСНУЄ');
          return false;
        } else {
            project.devices[deviceIndex].parameters[key] = data; 
        }  
      } else {
        alert('ВВЕДІТЬ ЗНАЧЕННЯ');
        return false;
      }
    },
    function() {
    });
  });
  // Видалення параметру
  $(document).on('click','.parameterRemove', function(event) {
    let key = $(this).siblings('[parameterIndex]').attr('parameterIndex');
    confirm(
    'БАЖАЄТЕ ВИДАЛИТИ ПАРАМЕТР?',
    '',
    function() {
      let array = [...project.devices[$('#PageSettingParameter').attr('indexDevice')].parameters]
      array.splice(key, 1);
      project.devices[$('#PageSettingParameter').attr('indexDevice')].parameters = new Proxy(array, proxy);
    },
    function() {}
    );
  })
  // Функція приховування елементів вікна параметрів
  $(document).on('change', '#ParameterFunctionCode', function() {
    if (['rhr', 'rir'].includes($(this).val())) {
      $('#ParameterUnit, #ParameterCoefficient, #ParameterSimbol').prop('disabled', false);
      $('#ParameterType option[value ="1"]').prop('disabled', true);
      $('#ParameterType option[value ="2"], #ParameterType option[value ="3"], #ParameterType option[value ="4"]').prop('disabled', false);
      $('#ParameterType').val('2');
      $('#ParameterUnit').val('0');
      $('#ParameterCoefficient').val('');
      $('#ParameterSimbol').val('0');
    } else {
      $('#ParameterUnit, #ParameterCoefficient, #ParameterSimbol').prop('disabled', true);
      $('#ParameterType option[value ="1"]').prop('disabled', false);
      $('#ParameterType option[value ="2"], #ParameterType option[value ="3"], #ParameterType option[value ="4"]').prop('disabled', true);
      $('#ParameterType').val('1');
      $('#ParameterUnit').val('0');
      $('#ParameterCoefficient').val('');
      $('#ParameterSimbol').val('0');
    }
  });
});