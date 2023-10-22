// =================================================================================================
// |                                                                                               |
// |                                        ДОДАТКОВІ ФУНКЦІЇ                                      |
// |                                                                                               |
// =================================================================================================
import { Alert, Confirm } from "./constant";
// Затримка відображення сторінки
window.onload = function() {
  document.body.style.visibility = 'visible';
}
// Функція валідації
export function formValidator(parent) {
  let validator = true;
    $.each(parent.find('.validator'), function() {
      if ($(this).val() === null ? true : !$(this).val().length ? true : false) {
        $(this).addClass('invalid');
        validator = false;
      }
    });
  return validator;
}
// Фенкція вікна попередження
export function alert(message) {
  $('body').append(Alert(message));
}
$(document).on('click', '.alertClose', function(event) {
  event.preventDefault();
  $(this).closest('.alert').remove();
});
// Фкнкція вікна підтвердження
export function confirm(message, id, onConfirm, onCancel) {
  $('body').append(Confirm(message, id));
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
$(document).ready(function() {
  // Функція натискання на посилання
  $(document).on('click', 'a', function(event) {
    event.preventDefault();
  });
  // Скидання валідації
  $(document).on('input', 'input', function() {
    $(this).removeClass('invalid');
  });
  $(document).on('change', 'select', function() {
    $(this).removeClass('invalid');
  });
});

