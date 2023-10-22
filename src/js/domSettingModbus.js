// =================================================================================================
// |                                                                                               |
// |                                    DOM НАЛАШТУВАННЯ => MODBUS                                 |
// |                                                                                               |
// =================================================================================================
import { project } from "./load";
$(document).ready(function() {
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
});