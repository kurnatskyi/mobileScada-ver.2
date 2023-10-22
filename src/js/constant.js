export const Alert = (a) => 
`<div class="alert">`+
  `<div class="alertBox">`+
    `<div class="alertBoxContent">${a}</div>`+
      `<a href="#" class="alertClose"><i class="bi bi-x-lg"></i></a>`+
    `</div>`+
  `</div>`+
`</div>`
export const Confirm = (a, b) => 
`<div class="confirm">`+
  `<div class="confirmBox">`+
    `<div class="confirmBoxContent" id=${b}>${a}</div>`+
    `<hr>`+
    `<button class="button confirmYes"><i class="bi bi-check-lg"></i></button>`+
    `<button class="button confirmNo"><i class="bi bi-x-lg"></i></button>`+
  `</div>`+
`</div>`
export const DeviceSettingWindow = (a, b, c, d, e) => 
`<label>Назва пристрою</label>`+
`<input type="text" placeholder="Назва пристрою" class="validator" id="DeviceTitle" value="${a}">`+
`<div class="row">`+
  `<div>`+
    `<label>Ідентифікатор</label>`+
  `</div>`+
  `<div>`+
    `<label>Цикл  опитування</label>`+
  `</div>`+
  `<div>`+
    `<input type="number" inputmode="numeric" placeholder="Ідентифікатор" class="validator" id="DeviceId" value="${b}">`+
  `</div>`+
  `<div>`+
    `<input type="number" inputmode="numeric" placeholder="Цикл опитування" class="validator" id="DevicePeriod" value="${c}">`+
  `</div>`+
  `<div>`+
    `<label>Затримка запиту</label>`+
  `</div>`+
  `<div>`+
    `<label>Повторний запит</label>`+
  `</div>`+
  `<div>`+
    `<input type="number" inputmode="numeric" placeholder="Затримка запиту" class="validator" id="DeviceReuqest" value="${d}">`+
  `</div>`+
  `<div>`+
    `<input type="number" inputmode="numeric" placeholder="Повторний запит" class="validator" id="DeviceResponce" value="${e}">`+
  `</div>`+
`</div>`
export const Device = (a, b, c, d) => 
`<div class="row device">`+
  `<hr>`+
  `<div class="deviceTitle" deviceIndex="${a}">`+
    `${b}`+
  `</div>`+
  `<div class="deviceId">`+
    `${c}`+
  `</div>`+
  `<div class="deviceToggle">`+
    `<a href="#">`+
      `${d ? `<i class="bi bi-lightbulb"></i>` : `<i class="bi bi-lightbulb-off"></i>`}`+
    `</a>`+
  `</div>`+
  `<div class="deviceEdit">`+
    `<a href="#">`+
      `<i class="bi bi-pen"></i>`+
    `</a>`+
  `</div>`+
  `<div class="deviceRemove">`+
    `<a href="#">`+
      `<i class="bi bi-x-lg"></i>`+
    `</a>`+
  `</div>`+
`</div>`
export const ParameterSettingWindow = (a, b, c, d, e, f, g) =>
`<label>Назва параметру</label>`+
`<input type="text" placeholder="Назва параметру" class="validator" id="ParameterTitle" value="${a}">`+
`<div class="row">`+
  `<div>`+
    `<label>Регістр</label>`+
  `</div>`+
  `<div>`+
    `<label>Код функції</label>`+
  `</div>`+
  `<div>`+
    `<input type="number" inputmode="numeric" placeholder="Регістр" class="validator" id="ParameterRegister" value="${b}">`+
  `</div>`+
  `<div>`+
    `<select id="ParameterFunctionCode">`+
      `<option value="rc" ${c === 'rc' ? 'selected' : ''}>01</option>`+
      `<option value="rdi" ${c === 'rdi' ? 'selected' : ''}>02</option>`+
      `<option value="rhr" ${c === 'rhr' ? 'selected' : ''}>03</option>`+
      `<option value="rir" ${c === 'rir' ? 'selected' : ''}>04</option>`+
    `</select>`+
  `</div>`+
  `<div>`+
    `<label>Тип даних</label>`+
  `</div>`+
  `<div>`+
    `<label>Одиниця виміру</label>`+
  `</div>`+
  `<div>`+
    `<select id="ParameterType">`+
      `<option value="1" ${d === '1' ? 'selected' : ''} ${(['rhr', 'rir']).includes(c) ? 'disabled' : ''}>BOOL</option>`+
      `<option value="2" ${d === '2' ? 'selected' : ''} ${(['rc', 'rdi']).includes(c) ? 'disabled' : ''}>INT16</option>`+
      `<option value="3" ${d === '3' ? 'selected' : ''} ${(['rc', 'rdi']).includes(c) ? 'disabled' : ''}>FLOAT32 | BE</option>`+
      `<option value="4" ${d === '4' ? 'selected' : ''} ${(['rc', 'rdi']).includes(c) ? 'disabled' : ''}>FLOAT32 | LE</option>`+
    `</select>`+
  `</div>`+
  `<div>`+
    `<select id="ParameterUnit" ${(['rc', 'rdi']).includes(c) ? 'disabled' : ''}>`+
      `<option value="0" ${e === '0' ? 'selected' : ''}>none</option>`+
      `<option value="1" ${e === '1' ? 'selected' : ''}>A</option>`+
      `<option value="2" ${e === '2' ? 'selected' : ''}>atm</option>`+
      `<option value="3" ${e === '3' ? 'selected' : ''}>bar</option>`+
      `<option value="4" ${e === '4' ? 'selected' : ''}>°C</option>`+
      `<option value="5" ${e === '5' ? 'selected' : ''}>Gcal</option>`+
      `<option value="6" ${e === '6' ? 'selected' : ''}>Gcal/h</option>`+
      `<option value="7" ${e === '7' ? 'selected' : ''}>GJ</option>`+
      `<option value="8" ${e === '8' ? 'selected' : ''}>GJ/h</option>`+
      `<option value="9" ${e === '9' ? 'selected' : ''}>grad</option>`+
      `<option value="10" ${e === '10' ? 'selected' : ''}>h</option>`+
      `<option value="11" ${e === '11' ? 'selected' : ''}>ht</option>`+
      `<option value="12" ${e === '12' ? 'selected' : ''}>Hz</option>`+
      `<option value="13" ${e === '13' ? 'selected' : ''}>J/h</option>`+
      `<option value="14" ${e === '14' ? 'selected' : ''}>kg</option>`+
      `<option value="15" ${e === '15' ? 'selected' : ''}>kg/h</option>`+
      `<option value="16" ${e === '16' ? 'selected' : ''}>kgf/cm²</option+`+
      `<option value="17" ${e === '17' ? 'selected' : ''}>km/h</option>`+
      `<option value="18" ${e === '18' ? 'selected' : ''}>kPa</option>`+
      `<option value="19" ${e === '19' ? 'selected' : ''}>kVA</option>`+
      `<option value="20" ${e === '20' ? 'selected' : ''}>kVAr</option>`+
      `<option value="21" ${e === '21' ? 'selected' : ''}>kVArh</option>`+
      `<option value="22" ${e === '22' ? 'selected' : ''}>kW</option>`+
      `<option value="23" ${e === '23' ? 'selected' : ''}>kWh </option>`+
      `<option value="24" ${e === '24' ? 'selected' : ''}>l</option>`+
      `<option value="25" ${e === '25' ? 'selected' : ''}>m</option>`+
      `<option value="26" ${e === '26' ? 'selected' : ''}>m/s</option>`+
      `<option value="27" ${e === '27' ? 'selected' : ''}>m³</option>`+
      `<option value="28" ${e === '28' ? 'selected' : ''}>m³/day</option>`+
      `<option value="29" ${e === '29' ? 'selected' : ''}>m³/h</option>`+
      `<option value="30" ${e === '30' ? 'selected' : ''}>m³/min</option>`+
      `<option value="31" ${e === '31' ? 'selected' : ''}>m³/sec</option>`+
      `<option value="32" ${e === '32' ? 'selected' : ''}>mA </option>`+
      `<option value="33" ${e === '33' ? 'selected' : ''}>mbar</option>`+
      `<option value="34" ${e === '34' ? 'selected' : ''}>mg/l</option>`+
      `<option value="35" ${e === '35' ? 'selected' : ''}>mg/m³ </option>`+
      `<option value="36" ${e === '36' ? 'selected' : ''}>min</option>`+
      `<option value="37" ${e === '37' ? 'selected' : ''}>mm</option>`+
      `<option value="38" ${e === '38' ? 'selected' : ''}>mmhg</option>`+
      `<option value="39" ${e === '39' ? 'selected' : ''}>MPa</option>`+
      `<option value="40" ${e === '40' ? 'selected' : ''}>ms</option>`+
      `<option value="41" ${e === '41' ? 'selected' : ''}>mS/cm</option>`+
      `<option value="42" ${e === '42' ? 'selected' : ''}>mV</option>`+
      `<option value="43" ${e === '43' ? 'selected' : ''}>MVA</option>`+
      `<option value="44" ${e === '44' ? 'selected' : ''}>MVAr</option>`+
      `<option value="45" ${e === '45' ? 'selected' : ''}>MW</option>`+
      `<option value="46" ${e === '46' ? 'selected' : ''}>MWh</option>`+
      `<option value="47" ${e === '47' ? 'selected' : ''}>n.m³</option>`+
      `<option value="48" ${e === '48' ? 'selected' : ''}>Pa</option>`+
      `<option value="49" ${e === '49' ? 'selected' : ''}>%</option>`+
      `<option value="50" ${e === '50' ? 'selected' : ''}>ppm</option>`+
      `<option value="51" ${e === '51' ? 'selected' : ''}>rpm</option>`+
      `<option value="52" ${e === '52' ? 'selected' : ''}>sec</option>`+
      `<option value="53" ${e === '53' ? 'selected' : ''}>sm</option>`+
      `<option value="54" ${e === '54' ? 'selected' : ''}>t</option>`+
      `<option value="55" ${e === '55' ? 'selected' : ''}>t/h</option>`+
      `<option value="56" ${e === '56' ? 'selected' : ''}>t/m³</option>`+
      `<option value="57" ${e === '57' ? 'selected' : ''}>V</option>`+
      `<option value="58" ${e === '58' ? 'selected' : ''}>VA</option>`+
      `<option value="59" ${e === '59' ? 'selected' : ''}>VAr</option>`+
      `<option value="60" ${e === '60' ? 'selected' : ''}>W</option>`+
      `<option value="61" ${e === '61' ? 'selected' : ''}>µS/cm</option>`+
    `</select>`+
  `</div>`+
  `<div>`+
    `<label>Коефіцієнт</label>`+
  `</div>`+
  `<div>`+
    `<label>Кількість знаків</label>`+
  `</div>`+
  `<div>`+
    `<input type="number" inputmode="decimal" placeholder="Коефіцієнт" id="ParameterCoefficient" value="${f}" ${(['rc', 'rdi']).includes(c) ? 'disabled' : ''}>`+
  `</div>`+
  `<div>`+
    `<select id="ParameterSimbol" ${(['rc', 'rdi']).includes(c) ? 'disabled' : ''}>`+
      `<option value="0" ${g === '0' ? 'selected' : ''}>0</option>`+
      `<option value="1" ${g === '1' ? 'selected' : ''}>1</option>`+
      `<option value="2" ${g === '2' ? 'selected' : ''}>2</option>`+
      `<option value="3" ${g === '3' ? 'selected' : ''}>3</option>`+
    `</select>`+
  `</div>`+
`</div>`
export const Parameter = (a, b, c, d) =>
`<div class="row parameter">`+
  `<hr>`+
  `<div class="parameterTitle" parameterIndex="${a}">`+
    `${b}`+
  `</div>`+
  `<div class="parameterRegister">`+
    `${c}`+
  `</div>`+
  `<div class="parameterFunctionCode">`+
    `${d}`+
  `</div>`+
  `<div class="parameterRemove">`+
    `<a href="#">`+
      `<i class="bi bi-x-lg"></i>`+
    `</a>`+
  `</div>`+
`</div>`
export const ChartSettingWindow = (a) => 
`<label>Назва графіку</label>`+
`<input type="text" placeholder="Назва графіку" class="validator" id="ChartTitle" value="${a}">`
export const Chart = (a, b) =>
`<div class="row chart">`+
  `<hr>`+
  `<div class="chartTitle" chartIndex="${a}">`+
    `${b}`+
  `</div>`+
  `<div class="chartEdit">`+
  `<a href="#">`+
    `<i class="bi bi-pen"></i>`+
  `</a>`+
`</div>`+
  `<div class="chartRemove">`+
  `<a href="#">`+
    `<i class="bi bi-x-lg"></i>`+
  `</a>`+
`</div>`+
`</div>`
export const TrendSettingWindow = (a, b, c, d, e, f) => 
`<div class="row">`+
  `<div>`+
    `<label>Назва тренду</label>`+
  `</div>`+
  `<div>`+
    `<label>Колір</label>`+
  `</div>`+
  `<div>`+
    `<input type="text" placeholder="Назва тренду" class="validator" id="TrendTitle" value="${a}">`+
  `</div>`+
  `<div>`+
    `<input type="color" id="TrendColor" value="${b}">`+
  `</div>`+
`</div>`+
`<label>Назва пристрою</label>`+
`<select class="validator" id="TrendDevice">`+
  `<option value="none" selected disabled>Оберіть пристрій</option>`+
  `${c.map(option => `<option value="${option.value}" ${d === option.value ? "selected" : ''}>${option.text}</option>`).join('')}`+
`</select>`+
`<label>Назва параметру</label>`+
`<select class="validator" id="TrendParameter">`+
  `<option value="none" selected disabled>Оберіть параметр</option>`+
  `${e.map(option => `<option value="${option.value}" ${f === option.value ? "selected" : ''}>${option.text}</option>`).join('')}`+
`</select>`
export const Trend = (a, b, c) =>
`<div class="row trend">`+
  `<hr>`+
  `<div class="trendTitle" trendIndex="${a}">`+
    `${b}`+
  `</div>`+
  `<div class="trendColor">`+
    `<hr style="border-color: ${c} !important">`+
  `</div>`+
  `<div class="trendRemove">`+
    `<a href="#">`+
      `<i class="bi bi-x-lg"></i>`+
    `</a>`+
  `</div>`+
`</div>`


