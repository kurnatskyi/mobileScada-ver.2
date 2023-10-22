// =================================================================================================
// |                                                                                               |
// |                                   DOM НАЛАШТУВАННЯ => ЗАГАЛЬНІ                                |
// |                                                                                               |
// =================================================================================================
import { settingBefore } from "./load";
import { alert, formValidator } from "./auxilary";
$(document).ready(function() {
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
});