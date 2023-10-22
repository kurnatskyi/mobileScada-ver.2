// Затримка відображення сторінки
window.onload = function() {
  document.body.style.visibility = 'visible';
}
  
$(document).ready(function() {
  let project = {};
  let settingBefore;
  // =================================================================================================
  // |                                                                                               |
  // |                                            ЗАВАНТАЖЕННЯ                                       |
  // |                                                                                               |
  // =================================================================================================
  // Завантаження setting.json
  $.ajax({
    type: 'GET',
    url: '/setting.json',
    async: false,
    dataType: 'json',
    success: function(data) {
      settingBefore = data;
      $('input[name=wifiMode]').filter('[value="' + data.wifiMode + '"]').prop('checked', true);
      $.each(data.ssidList, function(index) {
        let option = $('<option>').val(data.ssidList[index].ssid).text(data.ssidList[index].ssid);
        $('#Ssid').append(option);
      });
      $('#Ssid').val(data.ssid);
      $('#WifiPassword').val(data.wifiPassword);
      $('#ApName').val(data.apName);
      $('#ApPassword').val(data.apPassword);
      $('input[name=ipMode]').filter('[value="' + data.ipMode + '"]').prop('checked', true);
      $('#DnsName').val(data.dnsName);
      $('#LocalIp').val(data.localIp);
      $('#Gateway').val(data.gateway);
      $('#Subnet').val(data.subnet);
      $('#ProjectList').val(data.project);
    },
    error: function() {
     
    }
  });
  hideSetting();
  // =================================================================================================
  // |                                                                                               |
  // |                                          ОБРОБКА DOM                                          |
  // |                                                                                               |
  // =================================================================================================
  // Колірна тема
  $("#ThemeMode").change(function() {
    let icon = $(this).next("label").find("i");
    if ($(this).is(":checked")) {
      icon.removeClass('bi-sun')
      icon.addClass('bi-moon-stars')
      $('html').attr('theme', 'dark')
    } else {
      icon.removeClass('bi-moon-stars')
      icon.addClass('bi-sun')
      $('html').attr('theme', 'light')
    }
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
  // =================================================================================================
  // |                                                                                               |
  // |                                   DOM НАЛАШТУВАННЯ => ЗАГАЛЬНІ                                |
  // |                                                                                               |
  // =================================================================================================
  // Видалення паролю WiFi мережі при зміні SSID
  $('#Ssid').on('change', function() {
    $('#WifiPassword').val('');
  });
  // Видалення полів валідації
  $('input[name=wifiMode]').on('change', function() {
    $('#Ssid').removeClass('invalid');
  });
  $('input[name=ipMode]').on('change', function() {
    $('#LocalIp, #Gateway, #Subnet').removeClass('invalid');
  });
  // Запит на доступні WiFi мережі
  $('#SearchWifi').on('click', function() {
    $.ajax({
      type: 'GET',
      url: '/wifi',
      dataType: 'json',
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        let select = $('#Ssid').val();
        $('#Ssid').empty();
        $('#Ssid').append($('<option>').val('none').text('Оберіть мережу').prop('disabled', true));
        $.each(data, function(index) {
          let option = $('<option>').val(data[index].ssid).text(data[index].ssid);
          $('#Ssid').append(option);
        });
        select ? $('#Ssid').val(select) : $('#Ssid').val('none');
      },
      error: function() {
        alert('ПОМИЛКА ПОШУКУ МЕРЕЖІ');
      }
    });
  });
  // Відміна змін налаштувань
  $('#CancelSetting').on('click', function() {
    $('input[name=wifiMode]').filter('[value="' + settingBefore.wifiMode + '"]').prop('checked', true);
    $('#Ssid').empty();
    $.each(settingBefore.ssidList, function(index) {
      let option = $('<option>').val(settingBefore.ssidList[index].ssid).text(settingBefore.ssidList[index].ssid);
      $('#Ssid').append(option);
    });
    $('#Ssid').val(settingBefore.ssid);
    $('#WifiPassword').val(settingBefore.wifiPassword);
    $('#ApName').val(settingBefore.apName);
    $('#ApPassword').val(settingBefore.apPassword);
    $('input[name=ipMode]').filter('[value="' + settingBefore.ipMode + '"]').prop('checked', true);
    $('#DnsName').val(settingBefore.dnsName);
    $('#LocalIp').val(settingBefore.localIp);
    $('#Gateway').val(settingBefore.gateway);
    $('#Subnet').val(settingBefore.subnet);
    $('#ProjectList').val(settingBefore.project);
  });
  // Збереження налаштувань
  $('#SaveSetting').on('click', function() {
    let data = {
      wifiMode: $('input[name=wifiMode]:checked').val(),
      ssid: $('#Ssid').val(),
      ssidList: settingBefore.ssidList,
      wifiPassword: $('#WifiPassword').val(),
      apName: $('#ApName').val(),
      apPassword: $('#ApPassword').val(),
      ipMode: $('input[name=ipMode]:checked').val(),
      dnsName: $('#DnsName').val(),
      localIp: $('#LocalIp').val(),
      gateway: $('#Gateway').val(),
      subnet: $('#Subnet').val(),
      project: $('#ProjectList').val()
    };
    let wifiMode = data.wifiMode === 'sta';
    $('#Ssid').toggleClass('validator', wifiMode );
    let ipMode = data.ipMode === 'static'; 
    $('#LocalIp, #Gateway, #Subnet').toggleClass('validator', ipMode);
    if (formValidator($('#PageSettingGeneral'))) {
      $.ajax({
        type: 'POST',
        url: '/saveSetting',
        timeout: 2000,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: function() {
          alert('УСПІШНЕ ЗБЕРІГАННЯ НАЛАШТУВАНЬ');
          settingBefore = data;
        },
        error: function() {
          alert('ПОМИЛКА ЗБЕРІГАННЯ НАЛАШТУВАНЬ');
        }
      });
    } else {
      alert('ВВЕДІТЬ ЗНАЧЕННЯ');
    }
  });
  // =================================================================================================
  // |                                                                                               |
  // |                                    DOM НАЛАШТУВАННЯ => MODBUS                                 |
  // |                                                                                               |
  // =================================================================================================
  // Завантаження у JSON
  $('#BaudRate').on('change', function() {
    project.modbus.baudRate = $('#BaudRate').val();
  });
  $('#DataBits').on('change', function() {
    project.modbus.dataBits = $('#DataBits').val();
  });
  $('#Parity').on('change', function() {
    project.modbus.parity = $('#Parity').val();
  });
  $('#StopBits').on('change', function() {
    project.modbus.stopBits = $('#StopBits').val();
  });
  // =================================================================================================
  // |                                                                                               |
  // |                                   DOM НАЛАШТУВАННЯ => ПРИСТРОЇ                                |
  // |                                                                                               |
  // =================================================================================================
  // Додавання / редагування пристрою
  $(document).on('click','#DeviceAdd, [deviceIndex]', function(event) {
    let key = $(this).is('[deviceIndex]') ? $('[deviceIndex]').index(this) : $('[deviceIndex]').length;
    let newDevice = $(this).is('[deviceIndex]') ? false : true;
    confirm(
    `<label>Назва пристрою</label>
    <input type="text" placeholder="Назва пристрою" class="validator" id="DeviceTitle" value="${newDevice ? '' : project.devices[key].title}">
    <div class="row">
      <div>
        <label>Ідентифікатор</label>
      </div>
      <div>
        <label>Цикл  опитування</label>
      </div>
      <div>
        <input type="number" inputmode="numeric" placeholder="Ідентифікатор" class="validator" id="DeviceId" value="${newDevice ? '' : project.devices[key].id}">
      </div>
      <div>
        <input type="number" inputmode="numeric" placeholder="Цикл опитування" class="validator" id="DevicePeriod" value="${newDevice ? '' : project.devices[key].period}">
      </div>
      <div>
        <label>Затримка запиту</label>
      </div>
      <div>
        <label>Повторний запит</label>
      </div>
      <div>
        <input type="number" inputmode="numeric" placeholder="Затримка запиту" class="validator" id="DeviceReuqest" value="${newDevice ? '' : project.devices[key].reuqest}">
      </div>
      <div>
        <input type="number" inputmode="numeric" placeholder="Повторний запит" class="validator" id="DeviceResponce" value="${newDevice ? '' : project.devices[key].responce}">
      </div>
    </div>`,
    'DeviceSettingWindow',
    function() {
      if (formValidator($('#DeviceSettingWindow'))) {
        let data = {};
        data = new Proxy(data, proxy);
          data.title = $('#DeviceTitle').val(),
          data.id = $('#DeviceId').val(),
          data.period = $('#DevicePeriod').val(),
          data.reuqest = $('#DeviceReuqest').val(),
          data.responce = $('#DeviceResponce').val(),
          data.enable = newDevice ? true : project.devices[key].enable,
          data.parameters = [];
          data.parameters = newDevice ? new Proxy(data.parameters, proxy) : project.devices[key].parameters
        if (project.devices.some(function(item) {return item.id === data.id;}) && newDevice) {
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
  })
  // Редагування паарметрів
  $(document).on('click','.deviceEdit', function() {
    let target = $(this).siblings('[deviceIndex]').attr('deviceIndex');
    $('.parameter').remove();
    $('#PageSettingDevice, #PageSettingParameter').toggleClass('visible');
    $('#PageSettingParameter').attr('indexDevice', $('.deviceEdit').index(this));
        $.each(project.devices[target].parameters, function(key, value) {
          let div = 
            `<div class="row parameter">
              <hr>
              <div class="parameterTitle" parameterIndex="${key}">
                ${value.title}
              </div>
              <div class="parameterRegister">
                ${value.register}
              </div>
              <div class="parameterFunctionCode">
                ${value.function}
              </div>
              <div class="parameterRemove">
                <a href="#">
                  <i class="bi bi-x-lg"></i>
                </a>
              </div>
            </div>
            `;
          $('#PageSettingParameter').find('hr').last().before(div);
        });
  })
  // Видалення пристрою
  $(document).on('click','.deviceRemove', function(event) {
    let key = $(this).siblings('[deviceIndex]').attr('deviceIndex');
    confirm('БАЖАЄТЕ ВИДАЛИТИ ПРИСТРІЙ?', '',function() {project.devices.splice(key, 1);}, function() {});
  })
  // =================================================================================================
  // |                                                                                               |
  // |                       DOM НАЛАШТУВАННЯ => ПРИСТРОЇ => ПАРАМЕТРИ                               |
  // |                                                                                               |
  // =================================================================================================
  // Додавання / редагування параметра
   $(document).on('click','#ParameterAdd, [parameterIndex]', function(event) {
    
    let deviceIndex = $('#PageSettingParameter').attr('indexDevice')
    let key = $(this).is('[parameterIndex]') ? $('[parameterIndex]').index(this) : $('[parameterIndex]').length;
    console.log(key)
    let newParameter = $(this).is('[parametrIndex]') ? false : true;
    confirm(
    `<label>Назва параметру</label>
    <input type="text" placeholder="Назва параметру" class="validator" id="ParameterTitle">
    <div class="row">
      <div>
        <label>Регістр</label>
      </div>
      <div>
        <label>Код функції</label>
      </div>
      <div>
        <input type="number" inputmode="numeric" placeholder="Регістр" class="validator" id="ParameterRegister">
      </div>
      <div>
        <select id="ParameterFunctionCode">
          <option value="1">01</option>
          <option value="2">02</option>
          <option value="3">03</option>
          <option value="4">04</option>
        </select>
      </div>
      <div>
        <label>Тип даних</label>
      </div>
      <div>
        <label>Одиниця виміру</label>
      </div>
      <div>
        <select id="ParameterType">
          <option value="1">BOOL</option>
          <option value="2">INT16</option>
          <option value="3">FLOAT32 | BE</option>
          <option value="4">FLOAT32 | LE</option>
        </select>
      </div>
      <div>
        <select id="ParameterUnit">
          <option value="0">none</option>
          <option value="1">A</option>
          <option value="2">atm</option>
          <option value="3">bar</option>
          <option value="4">°C</option>
          <option value="5">Gcal</option>
          <option value="6">Gcal/h</option>
          <option value="7">GJ</option>
          <option value="8">GJ/h</option>
          <option value="9">grad</option>
          <option value="10">h</option>
          <option value="11">ht</option>
          <option value="12">Hz</option>
          <option value="13">J/h</option>
          <option value="14">kg</option>
          <option value="15">kg/h</option>
          <option value="16">kgf/cm²</option+
          <option value="17">km/h</option>
          <option value="18">kPa</option>
          <option value="19">kVA</option>
          <option value="20">kVAr</option>
          <option value="21">kVArh</option>
          <option value="22">kW</option>
          <option value="23">kWh </option>
          <option value="24">l</option>
          <option value="25">m</option>
          <option value="26">m/s</option>
          <option value="27">m³</option>
          <option value="28">m³/day</option>
          <option value="29">m³/h</option>
          <option value="30">m³/min</option>
          <option value="31">m³/sec</option>
          <option value="32">mA </option>
          <option value="33">mbar</option>
          <option value="34">mg/l</option>
          <option value="35">mg/m³ </option>
          <option value="36">min</option>
          <option value="37">mm</option>
          <option value="38">mmhg</option>
          <option value="39">MPa</option>
          <option value="40">ms</option>
          <option value="41">mS/cm</option>
          <option value="42">mV</option>
          <option value="43">MVA</option>
          <option value="44">MVAr</option>
          <option value="45">MW</option>
          <option value="46">MWh</option>
          <option value="47">n.m³</option>
          <option value="48">Pa</option>
          <option value="49">%</option>
          <option value="50">ppm</option>
          <option value="51">rpm</option>
          <option value="52">sec</option>
          <option value="53">sm</option>
          <option value="54">t</option>
          <option value="55">t/h</option>
          <option value="56">t/m³</option>
          <option value="57">V</option>
          <option value="58">VA</option>
          <option value="59">VAr</option>
          <option value="60">W</option>
          <option value="61">µS/cm</option>
        </select>
      </div>
      <div>
        <label>Коефіцієнт</label>
      </div>
      <div>
        <label>Кількість знаків</label>
      </div>
      <div>
        <input type="number" inputmode="decimal" placeholder="Коефіцієнт" id="ParameterCoefficient">
      </div>
      <div>
        <select id="ParameterSimbol">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>`,
    'ParameterSettingWindow',
    function() {
      if (formValidator($('#ParameterSettingWindow'))) {
        let data = {};
            data.title = $('#ParameterTitle').val(),
            data.register = $('#ParameterRegister').val(),
            data.function = $('#ParameterFunctionCode').val(),
            data.type = $('#ParameterType').val(),
            data.unit = $('#ParameterUnits').val(),
            data.coefficient = $('#ParameterCoefficient').val(),
            data.simbols = $('#ParameterSimbols').val()
        if (project.devices.some(function(item) {return item.register === data.register && item.function === data.function;}) && newParameter) {
          alert('ПАРАМЕТЕР З ТАКИМ РЕГІСТРОМ ВЖЕ ІСНУЄ');
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
  // Видалення пристрою
  $(document).on('click','.parameterRemove', function(event) {
    let key = $(this).siblings('[parameterIndex]').attr('parameterIndex');
    confirm('БАЖАЄТЕ ВИДАЛИТИ ПРИСТРІЙ?', '',function() {project.devices[deviceIndex].parameters.splice(key, 1);}, function() {});
  })
  // Функція приховування елементів вікна параметрів
  $(document).on('change', '#ParameterFunctionCode', function() {
    if (['3', '4'].includes($(this).val())) {
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
  // =================================================================================================
  // |                                                                                               |
  // |                                            ПРОЄКТ                                             |
  // |                                                                                               |
  // =================================================================================================
  // Створення нового проєкту
  $('#ProjectCreate').on('click', function() {
    if ($.isEmptyObject(project)) {
      project = new Proxy(project, proxy);
      project.title = 'newProject';
      project.devices = [];
      project.devices = new Proxy(project.devices, proxy);
      project.modbus = {};
      project.modbus = new Proxy(project.modbus, proxy);
        project.modbus.baudRate = '9600';
        project.modbus.dataBits = '8';
        project.modbus.parity = 'N';
        project.modbus.stopBits = '1'; 
      hideSetting();
    } else {
      confirm('БАЖАЄТЕ СТВОРИТИ НОВИЙ ПРОЄКТ БЕЗ ЗБЕРЕЖЕННЯ ПОТОЧНОГО?', 
      '',
      function() {
        project = new Proxy(project, proxy);
        project.title = 'newProject';
        project.devices = [];
        project.devices = new Proxy(project.devices, proxy);
        project.modbus = {};
        project.modbus = new Proxy(project.modbus, proxy);
          project.modbus.baudRate = '9600';
          project.modbus.dataBits = '8';
          project.modbus.parity = 'N';
          project.modbus.stopBits = '1';  
        hideSetting();
      },
      function() {

      });
    }
  });
  // Функція приховування елементів проєкту
  function hideSetting() {
    $('.projectDependent').toggleClass('disable', $.isEmptyObject(project));
  }
  // Функція обробки JSON project
  let proxy = {
    set (target, key, value) {
      target[key] = value;
      key === 'devices' ? $('.device').remove() : '';
      // project.modbus
      if (JSON.stringify(target) === JSON.stringify(project.modbus)) {
        key === 'baudRate' ? $('#BaudRate').val(project.modbus.baudRate) : '';
        key === 'dataBits' ? $('#DataBits').val(project.modbus.dataBits) : '';
        key === 'parity' ? $('#Parity').val(project.modbus.parity) : '';
        key === 'stopBits' ? $('#StopBits').val(project.modbus.stopBits) : '';
      }
      // project.devices
      if (JSON.stringify(target) === JSON.stringify(project.devices)) {
        $('.device').remove()
        $.each(target, function(key, value) {
          let div = 
            `<div class="row device">
              <hr>
              <div class="deviceTitle" deviceIndex="${key}">
                ${target[key].title}
              </div>
              <div class="deviceId">
                ${target[key].id}
              </div>
              <div class="deviceToggle">
                <a href="#">
                  ${target[key].enable ? `<i class="bi bi-lightbulb"></i>` : `<i class="bi bi-lightbulb-off"></i>`}
                </a>
              </div>
              <div class="deviceEdit">
                <a href="#">
                  <i class="bi bi-pen"></i>
                </a>
              </div>
              <div class="deviceRemove">
                <a href="#">
                  <i class="bi bi-x-lg"></i>
                </a>
              </div>
            </div>
            `;
          $('#PageSettingDevice').find('hr').last().before(div);
        });
      }
      // project.devices[index]
      $.each(project.devices, function(index) {
        if (JSON.stringify(target) === JSON.stringify(project.devices[index])) {
          var div = $('.deviceToggle').eq(index).find('a');
          project.devices[index].enable ? div.html('<i class="bi bi-lightbulb"></i>') : div.html('<i class="bi bi-lightbulb-off"></i>');
        }
        // project.devices[index].parameters
        $.each(project.devices[index].parameters, function(number) {
          if (JSON.stringify(target) === JSON.stringify(project.devices[index].parameters)) {
            $('.parameter').remove(),
            $.each(target, function(key, value) {
              let div = 
                `<div class="row parameter">
                  <hr>
                  <div class="parameterTitle" parameterIndex="${key}">
                    ${target[key].title}
                  </div>
                  <div class="parameterRegister">
                    ${target[key].register}
                  </div>
                  <div class="parameterFunctionCode">
                    ${target[key].function}
                  </div>
                  <div class="parameterRemove">
                    <a href="#">
                      <i class="bi bi-x-lg"></i>
                    </a>
                  </div>
                </div>
                `;
              $('#PageSettingParameter').find('hr').last().before(div);
            });
          }
        });
      });
      console.log(target);
      return true
    }
    

  }
  // =================================================================================================
  // |                                                                                               |
  // |                                        ДОДАТКОВІ ФУНКЦІЇ                                      |
  // |                                                                                               |
  // =================================================================================================
  // Функція натискання на посилання
  $(document).on('click', 'a', function(event) {
    event.preventDefault();
  });
  // Функція валідації
  function formValidator(parent) {
    let validator = true;
        $.each(parent.find('.validator'), function() {
            if ($(this).val() === null ? true : !$(this).val().length ? true : false) {
                $(this).addClass('invalid');
                validator = false;
            }
        });
    return validator;
  }
  // Скидання валідації
  $(document).on('input', 'input', function() {
    $(this).removeClass('invalid');
  });
  $(document).on('change', 'select', function() {
    $(this).removeClass('invalid');
  });
  // Фенкція вікна попередження
  function alert(message) {
    let div = 
      `<div class="alert">
        <div class="alertBox">
          <div class="alertBoxContent">${message}</div>
            <a href="#" class="alertClose"><i class="bi bi-x-lg"></i></a>
          </div>
        </div>
      </div>`
    $('body').append(div);
  }
  $(document).on('click', '.alertClose', function(event) {
    event.preventDefault();
    $(this).closest('.alert').remove();
  });
  // Фкнкція вікна підтвердження
  function confirm(message, id, onConfirm, onCancel) {
    let div = 
      `<div class="confirm">
        <div class="confirmBox">
          <div class="confirmBoxContent" id=${id}>${message}</div>
          <hr>
          <button class="button confirmYes"><i class="bi bi-check-lg"></i></button>
          <button class="button confirmNo"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>`
    $('body').append(div);
    $(document).on('click', '.confirmYes', function() {
      if (onConfirm() === undefined) {
        $(this).closest('.confirm').remove();
        $(document).off('click', '.confirmYes');
        $(document).off('click', '.confirmNo');
      }
    });
    $(document).on('click', '.confirmNo', function() {
      onCancel();
      $(this).closest('.confirm').remove();
      $(document).off('click', '.confirmYes');
      $(document).off('click', '.confirmNo');
    });
  }
});