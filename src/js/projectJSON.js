import { Device, Parameter, Chart, Trend } from "./constant";
import { project } from "./load";
// Функція обробки JSON project
export let proxy = {
  set (target, key, value) {
    target[key] = value;
    // project.modbus
    if (JSON.stringify(target) === JSON.stringify(project.modbus)) {
      key === 'baudRate' ? $('#BaudRate').val(project.modbus.baudRate) : '';
      key === 'dataBits' ? $('#DataBits').val(project.modbus.dataBits) : '';
      key === 'parity' ? $('#Parity').val(project.modbus.parity) : '';
      key === 'stopBits' ? $('#StopBits').val(project.modbus.stopBits) : '';
    }
    // project.devices
    if (key === 'devices') {
      $('.device').remove();
      if (project.devices.length) {
        $.each(value, function(key) {
          $('#PageSettingDevice').find('hr').last().before(Device(key, value[key].title, value[key].id, value[key].enable));
        });
      }
    }
    // project.devices[index].parameters
    if (key === 'parameters') {
      $('.parameter').remove();
      if (target[key].length) {
        $.each(value, function(key) {
          $('#PageSettingParameter').find('hr').last().before(Parameter(key, value[key].title, value[key].register, value[key].function.toUpperCase()));
        });
      }
    }
    // project.devices[index]
    if (JSON.stringify(target) === JSON.stringify(project.devices)) {
      $('.device').remove();
      $.each(target, function(key) {
        $('#PageSettingDevice').find('hr').last().before(Device(key, target[key].title, target[key].id, target[key].enable));
      });
    }
    $.each(project.devices, function(index) {
      // project.devices[index].enable
      if (JSON.stringify(target) === JSON.stringify(project.devices[index]) && key === 'enable') {
        let div = $('.deviceToggle').eq(index).find('a');
        project.devices[index].enable ? div.html('<i class="bi bi-lightbulb"></i>') : div.html('<i class="bi bi-lightbulb-off"></i>');
      }
      // project.devices[index].parameters
      if (JSON.stringify(target) === JSON.stringify(project.devices[index].parameters)) {
        $('.parameter').remove();
        $.each(target, function(key) {
          $('#PageSettingParameter').find('hr').last().before(Parameter(key, target[key].title, target[key].register, target[key].function.toUpperCase()));
        });
      }
    });
    // project.charts
    if (key === 'charts') {
      $('.chart').remove();
      if (project.charts.length) {
        $.each(value, function(key) {
          $('#PageSettingChart').find('hr').last().before(Chart(key, value[key].title));
        });
      }
    }
     // project.charts[index].trends
     if (key === 'trends') {
      $('.trend').remove();
      if (target[key].length) {
        $.each(value, function(key) {
          $('#PageSettingTrend').find('hr').last().before(Trend(key, value[key].title, value[key].color));
        });
      }
    }
    // project.charts[index]
    if (JSON.stringify(target) === JSON.stringify(project.charts)) {
      $('.chart').remove();
      $.each(target, function(key) {
        $('#PageSettingChart').find('hr').last().before(Chart(key, target[key].title));
      });
    }
    $.each(project.charts, function(index) {
      // project.charts[index].trends
      if (JSON.stringify(target) === JSON.stringify(project.charts[index].trends)) {
        $('.trend').remove();
        $.each(target, function(key) {
          $('#PageSettingTrend').find('hr').last().before(Trend(key, target[key].title, target[key].color));
        });
      }
    });
    console.log(project)

    return true
  }
}