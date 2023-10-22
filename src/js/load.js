// =================================================================================================
// |                                                                                               |
// |                                            ЗАВАНТАЖЕННЯ                                       |
// |                                                                                               |
// =================================================================================================
import { hideSetting } from './domProject'
export let project = {}
export let settingBefore;
$(document).ready(function() { 
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
});