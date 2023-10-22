(()=>{"use strict";const e=(e,t,i,o)=>`<div class="row device"><hr><div class="deviceTitle" deviceIndex="${e}">${t}</div><div class="deviceId">${i}</div><div class="deviceToggle"><a href="#">`+(o?'<i class="bi bi-lightbulb"></i>':'<i class="bi bi-lightbulb-off"></i>')+'</a></div><div class="deviceEdit"><a href="#"><i class="bi bi-pen"></i></a></div><div class="deviceRemove"><a href="#"><i class="bi bi-x-lg"></i></a></div></div>',t=(e,t,i,o)=>`<div class="row parameter"><hr><div class="parameterTitle" parameterIndex="${e}">${t}</div><div class="parameterRegister">${i}</div><div class="parameterFunctionCode">${o}</div><div class="parameterRemove"><a href="#"><i class="bi bi-x-lg"></i></a></div></div>`,i=(e,t)=>`<div class="row chart"><hr><div class="chartTitle" chartIndex="${e}">${t}</div><div class="chartEdit"><a href="#"><i class="bi bi-pen"></i></a></div><div class="chartRemove"><a href="#"><i class="bi bi-x-lg"></i></a></div></div>`,o=(e,t,i)=>`<div class="row trend"><hr><div class="trendTitle" trendIndex="${e}">${t}</div><div class="trendColor"><hr style="border-color: ${i} !important"></div><div class="trendRemove"><a href="#"><i class="bi bi-x-lg"></i></a></div></div>`;function n(e){let t=!0;return $.each(e.find(".validator"),(function(){null!==$(this).val()&&$(this).val().length||($(this).addClass("invalid"),t=!1)})),t}function a(e){$("body").append(`<div class="alert"><div class="alertBox"><div class="alertBoxContent">${e}</div><a href="#" class="alertClose"><i class="bi bi-x-lg"></i></a></div></div></div>`)}function r(e,t,i,o){$("body").append(`<div class="confirm"><div class="confirmBox"><div class="confirmBoxContent" id=${t}>${e}</div><hr><button class="button confirmYes"><i class="bi bi-check-lg"></i></button><button class="button confirmNo"><i class="bi bi-x-lg"></i></button></div></div>`),$(document).on("click",".confirmYes",(function(){void 0===i()&&($(this).closest(".confirm").remove(),$(document).off("click",".confirmYes"),$(document).off("click",".confirmNo"))})),$(document).on("click",".confirmNo",(function(){o(),$(this).closest(".confirm").remove(),$(document).off("click",".confirmYes"),$(document).off("click",".confirmNo")}))}window.onload=function(){document.body.style.visibility="visible"},$(document).on("click",".alertClose",(function(e){e.preventDefault(),$(this).closest(".alert").remove()})),$(document).ready((function(){$(document).on("click","a",(function(e){e.preventDefault()})),$(document).on("input","input",(function(){$(this).removeClass("invalid")})),$(document).on("change","select",(function(){$(this).removeClass("invalid")}))}));let l={set:(n,a,r)=>(n[a]=r,JSON.stringify(n)===JSON.stringify(c.modbus)&&("baudRate"===a&&$("#BaudRate").val(c.modbus.baudRate),"dataBits"===a&&$("#DataBits").val(c.modbus.dataBits),"parity"===a&&$("#Parity").val(c.modbus.parity),"stopBits"===a&&$("#StopBits").val(c.modbus.stopBits)),"devices"===a&&($(".device").remove(),c.devices.length&&$.each(r,(function(t){$("#PageSettingDevice").find("hr").last().before(e(t,r[t].title,r[t].id,r[t].enable))}))),"parameters"===a&&($(".parameter").remove(),n[a].length&&$.each(r,(function(e){$("#PageSettingParameter").find("hr").last().before(t(e,r[e].title,r[e].register,r[e].function.toUpperCase()))}))),JSON.stringify(n)===JSON.stringify(c.devices)&&($(".device").remove(),$.each(n,(function(t){$("#PageSettingDevice").find("hr").last().before(e(t,n[t].title,n[t].id,n[t].enable))}))),$.each(c.devices,(function(e){if(JSON.stringify(n)===JSON.stringify(c.devices[e])&&"enable"===a){let t=$(".deviceToggle").eq(e).find("a");c.devices[e].enable?t.html('<i class="bi bi-lightbulb"></i>'):t.html('<i class="bi bi-lightbulb-off"></i>')}JSON.stringify(n)===JSON.stringify(c.devices[e].parameters)&&($(".parameter").remove(),$.each(n,(function(e){$("#PageSettingParameter").find("hr").last().before(t(e,n[e].title,n[e].register,n[e].function.toUpperCase()))})))})),"charts"===a&&($(".chart").remove(),c.charts.length&&$.each(r,(function(e){$("#PageSettingChart").find("hr").last().before(i(e,r[e].title))}))),"trends"===a&&($(".trend").remove(),n[a].length&&$.each(r,(function(e){$("#PageSettingTrend").find("hr").last().before(o(e,r[e].title,r[e].color))}))),JSON.stringify(n)===JSON.stringify(c.charts)&&($(".chart").remove(),$.each(n,(function(e){$("#PageSettingChart").find("hr").last().before(i(e,n[e].title))}))),$.each(c.charts,(function(e){JSON.stringify(n)===JSON.stringify(c.charts[e].trends)&&($(".trend").remove(),$.each(n,(function(e){$("#PageSettingTrend").find("hr").last().before(o(e,n[e].title,n[e].color))})))})),console.log(c),!0)};function d(){$(".projectDependent").toggleClass("disable",$.isEmptyObject(c))}$(document).ready((function(){$("#ProjectCreate").on("click",(function(){$.isEmptyObject(c)?(c=new Proxy(c,l),c.title="newProject",c.modbus={},c.modbus=new Proxy(c.modbus,l),c.modbus.baudRate="9600",c.modbus.dataBits="8",c.modbus.parity="N",c.modbus.stopBits="1",c.devices=[],c.devices=new Proxy(c.devices,l),c.charts=[],c.charts=new Proxy(c.charts,l),d()):r("БАЖАЄТЕ СТВОРИТИ НОВИЙ ПРОЄКТ БЕЗ ЗБЕРЕЖЕННЯ ПОТОЧНОГО?","",(function(){c=new Proxy(c,l),c.title="newProject",c.modbus={},c.modbus=new Proxy(c.modbus,l),c.modbus.baudRate="9600",c.modbus.dataBits="8",c.modbus.parity="N",c.modbus.stopBits="1",c.devices=[],c.devices=new Proxy(c.devices,l),c.charts=[],c.charts=new Proxy(c.charts,l),d()}),(function(){}))})),$(".sort").on("click",(function(){const e={device:[...c.devices],parameter:$.isEmptyObject(c.devices[$("#PageSettingParameter").attr("indexDevice")])?"":[...c.devices[$("#PageSettingParameter").attr("indexDevice")].parameters],chart:[...c.charts],trend:$.isEmptyObject(c.charts[$("#PageSettingTrend").attr("indexChart")])?"":[...c.charts[$("#PageSettingTrend").attr("indexChart")].trends]};let t=$(this).attr("data"),i=$(this).attr("array");$(this).closest(".row").find(".sort").not($(this)).removeClass("sortUp sortDown"),$(this).hasClass("sortUp")?$(this).toggleClass("sortUp").toggleClass("sortDown"):$(this).hasClass("sortDown")?($(this).toggleClass("sortDown"),t="index"):$(this).toggleClass("sortUp");let o=$(this).hasClass("sortUp"),n=$(this).hasClass("sortDown"),a=o?1:n?-1:1;switch(e[i].sort((function(e,i){let o=["index","id","register"].includes(t)?+e[t]:e[t],n=["index","id","register"].includes(t)?+i[t]:i[t];return a*(o>n?1:o<n?-1:0)})),i){case"device":c.devices=new Proxy([...e[i]],l);break;case"parameter":c.devices[$("#PageSettingParameter").attr("indexDevice")].parameters=new Proxy([...e[i]],l);break;case"chart":c.charts=new Proxy([...e[i]],l);break;case"trend":c.charts[$("#PageSettingTrend").attr("indexChart")].trends=new Proxy([...e[i]],l)}}))}));let s,c={};$(document).ready((function(){$.ajax({type:"GET",url:"/setting.json",async:!1,dataType:"json",success:function(e){s=e,$("input[name=wifiMode]").filter('[value="'+e.wifiMode+'"]').prop("checked",!0),$.each(e.ssidList,(function(t){let i=$("<option>").val(e.ssidList[t].ssid).text(e.ssidList[t].ssid);$("#Ssid").append(i)})),$("#Ssid").val(e.ssid),$("#WifiPassword").val(e.wifiPassword),$("#ApName").val(e.apName),$("#ApPassword").val(e.apPassword),$("input[name=ipMode]").filter('[value="'+e.ipMode+'"]').prop("checked",!0),$("#DnsName").val(e.dnsName),$("#LocalIp").val(e.localIp),$("#Gateway").val(e.gateway),$("#Subnet").val(e.subnet),$("#ProjectList").val(e.project)},error:function(){}}),d()}));let p=parseFloat(getComputedStyle(document.querySelector("html")).fontSize),u=getComputedStyle(document.querySelector(":root")).getPropertyValue("--body-color"),v=getComputedStyle(document.querySelector(":root")).getPropertyValue("--body-bg-color"),m=getComputedStyle(document.querySelector(":root")).getPropertyValue("--secondary-bg-color"),h=getComputedStyle(document.querySelector(":root")).getPropertyValue("--link-color"),g=getComputedStyle(document.querySelector(":root")).getPropertyValue("--border-color"),f=new Highcharts.stockChart({chart:{renderTo:"PageChart",events:{update:function(){b()},redraw:function(){b()},addSeries:function(){b()},show:function(){b()},hide:function(){b()}},style:{fontSize:"1rem"},borderColor:g,borderWidth:null,type:"line",backgroundColor:v,animation:!0},navigator:{outlineColor:u,outlineWidth:1,margin:.5*p,minHeight:1*p,height:2*p,xAxis:{lineColor:u,gridLineWidth:1,gridLineColor:u}},scrollbar:{minHeight:.5*p,height:.5*p,liveRedraw:!1,trackBackgroundColor:v,trackBorderColor:g,trackBorderRadius:.125*p,barBackgroundColor:u,barBorderColor:g,barBorderRadius:.125*p},rangeSelector:{enabled:!1},title:{text:null},credits:{enabled:!1},tooltip:{backgroundColor:m,borderColor:g,useHTML:!0,style:{color:u},xDateFormat:"%A, %b %d, %H:%M:%S",split:!1,shared:!1,animation:!0},legend:{enabled:!0,maxHeight:3.25*p,itemMarginBottom:.25*p,useHTML:!0,itemStyle:{color:u,fontSize:"0.8rem",fontWeight:"bold"},itemHoverStyle:{color:h},itemHiddenStyle:{color:m},animation:!1},plotOptions:{line:{animation:!1,dataLabels:{enabled:!1}},series:{marker:{enabled:!1}}},xAxis:{type:"datetime",dateTimeLabelFormats:{second:"%H:%M:%S"},lineColor:u,gridLineWidth:.1,gridLineColor:u,labels:{style:{color:u}},tickColor:u},yAxis:{opposite:!1,title:{text:null},lineColor:u,gridLineWidth:.1,gridLineColor:u,labels:{style:{color:u}},tickAmount:9,tickWidth:1,lineWidth:1,tickColor:u},time:{useUTC:!1}});function b(){if(f.legend.nav){let e=0;if($(".highcharts-legend-box").next("g").find("g").attr("transform")){let t=$(".highcharts-legend-box").next("g").find("g").attr("transform").match(/translate\(0,(-?\d+(\.\d+)?)\)/);t&&(e=parseFloat(t[1]))}$(".highcharts-legend-box").next("g").attr("clip-path",`inset(${-e-.25*p}px 0 ${-.25*p}px 0)`),$(".highcharts-legend.highcharts-no-tooltip").find("div").first().css("clip",`rect(8px, 9999px, ${4*p}px, 0px)`),f.legend.nav.attr("display","none")}}Highcharts.setOptions({lang:{months:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],weekdays:["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"],shortMonths:["Січ","Лют","Бер","Квіт","Трав","Черв","Лип","Серп","Вер","Жовт","Лист","Груд"]}}),$(document).on("click","#ChartLegendUp",(function(){if(f.legend.nav){let e;f.legend.scroll(-1,0);let t=$(".highcharts-legend-box").next("g").find("g").attr("transform").match(/translate\(0,(-?\d+(\.\d+)?)\)/);t&&(e=parseFloat(t[1])),$(".highcharts-legend-box").next("g").attr("clip-path",`inset(${-e-.25*p}px 0 ${-.25*p}px 0)`)}})),$(document).on("click","#ChartLegendDown",(function(){if(f.legend.nav){let e;f.legend.scroll(1,0);let t=$(".highcharts-legend-box").next("g").find("g").attr("transform").match(/translate\(0,(-?\d+(\.\d+)?)\)/);t&&(e=parseFloat(t[1])),$(".highcharts-legend-box").next("g").attr("clip-path",`inset(${-e-.25*p}px 0 ${-.25*p}px 0)`)}})),$(document).on("click","#ChartTooltip",(function(){f.tooltip.update({shared:$(this).prop("checked")},!1)})),$(document).ready((function(){$("#ThemeMode").change((function(){let e=$(this).next("label").find("i");$(this).is(":checked")?(e.removeClass("bi-sun"),e.addClass("bi-moon-stars"),$("html").attr("theme","dark")):(e.removeClass("bi-moon-stars"),e.addClass("bi-sun"),$("html").attr("theme","light"));let t=getComputedStyle(document.querySelector(":root")).getPropertyValue("--body-color"),i=getComputedStyle(document.querySelector(":root")).getPropertyValue("--body-bg-color"),o=getComputedStyle(document.querySelector(":root")).getPropertyValue("--secondary-bg-color"),n=getComputedStyle(document.querySelector(":root")).getPropertyValue("--link-color"),a=getComputedStyle(document.querySelector(":root")).getPropertyValue("--border-color");f.update({chart:{animation:!1}},!1),$(".highcharts-legend.highcharts-no-tooltip").remove(),f.update({chart:{borderColor:a,backgroundColor:i},navigator:{outlineColor:t,xAxis:{lineColor:t,gridLineColor:t}},scrollbar:{trackBorderColor:a,trackBackgroundColor:i,barBorderColor:a,barBackgroundColor:t},tooltip:{backgroundColor:o,borderColor:a,style:{color:t}},legend:{itemStyle:{color:t},itemHoverStyle:{color:n},itemHiddenStyle:{color:o}},xAxis:{lineColor:t,gridLineColor:t,labels:{style:{color:t}},tickColor:t},yAxis:{lineColor:t,gridLineColor:t,labels:{style:{color:t}},tickColor:t}}),f.update({chart:{animation:!0}},!1)})),$("#Logout").on("click",(function(){let e=localStorage.getItem("token");$.ajax({type:"GET",url:"/loginPage",data:{action:"logout"},headers:{Authorization:e},success:function(){localStorage.removeItem("token"),window.location.href="/"},error:function(){}})})),$(".dropdown").on("click",(function(){$(this).find(".dropdownMenu").toggleClass("visible")})),$(document).on("click",'[toggle="collapse"]',(function(){$($(this).attr("aria")).toggleClass("show")})),$(document).on("click",'[toggle="page"]',(function(){$(this).hasClass("disable")||($(".page").removeClass("visible"),$("input, select").removeClass("invalid"),$($(this).attr("aria")).addClass("visible"),$("#MainMenu").hasClass("show")&&($("#MainMenu").addClass("invisible"),$("#MainMenu").removeClass("show"),setTimeout((function(){$("#MainMenu").removeClass("invisible")}),200)))})),f.addSeries({id:"TEST",name:"TEST"}),$(document).on("click","#Test",(function(){f.addSeries({id:"TEST",name:"TEST"}),console.log(f.legend.pages.length),console.log(f.legend.currentPage);let e=parseInt((1,50,49*Math.random()+1));f.get("TEST").addPoint([(new Date).getTime(),e],!1,!1,!1,!1)}))})),$(document).ready((function(){$("#Ssid").on("change",(function(){$("#WifiPassword").val("")})),$("input[name=wifiMode]").on("change",(function(){$("#Ssid").removeClass("invalid")})),$("input[name=ipMode]").on("change",(function(){$("#LocalIp, #Gateway, #Subnet").removeClass("invalid")})),$("#SearchWifi").on("click",(function(){$.ajax({type:"GET",url:"/wifi",dataType:"json",contentType:"application/json",dataType:"json",success:function(e){let t=$("#Ssid").val();$("#Ssid").empty(),$("#Ssid").append($("<option>").val("none").text("Оберіть мережу").prop("disabled",!0)),$.each(e,(function(t){let i=$("<option>").val(e[t].ssid).text(e[t].ssid);$("#Ssid").append(i)})),t?$("#Ssid").val(t):$("#Ssid").val("none")},error:function(){a("ПОМИЛКА ПОШУКУ МЕРЕЖІ")}})})),$("#CancelSetting").on("click",(function(){$("input[name=wifiMode]").filter('[value="'+s.wifiMode+'"]').prop("checked",!0),$("#Ssid").empty(),$.each(s.ssidList,(function(e){let t=$("<option>").val(s.ssidList[e].ssid).text(s.ssidList[e].ssid);$("#Ssid").append(t)})),$("#Ssid").val(s.ssid),$("#WifiPassword").val(s.wifiPassword),$("#ApName").val(s.apName),$("#ApPassword").val(s.apPassword),$("input[name=ipMode]").filter('[value="'+s.ipMode+'"]').prop("checked",!0),$("#DnsName").val(s.dnsName),$("#LocalIp").val(s.localIp),$("#Gateway").val(s.gateway),$("#Subnet").val(s.subnet),$("#ProjectList").val(s.project)})),$("#SaveSetting").on("click",(function(){let e={wifiMode:$("input[name=wifiMode]:checked").val(),ssid:$("#Ssid").val(),ssidList:s.ssidList,wifiPassword:$("#WifiPassword").val(),apName:$("#ApName").val(),apPassword:$("#ApPassword").val(),ipMode:$("input[name=ipMode]:checked").val(),dnsName:$("#DnsName").val(),localIp:$("#LocalIp").val(),gateway:$("#Gateway").val(),subnet:$("#Subnet").val(),project:$("#ProjectList").val()},t="sta"===e.wifiMode;$("#Ssid").toggleClass("validator",t);let i="static"===e.ipMode;$("#LocalIp, #Gateway, #Subnet").toggleClass("validator",i),n($("#PageSettingGeneral"))?$.ajax({type:"POST",url:"/saveSetting",timeout:2e3,data:JSON.stringify(e),contentType:"application/json",dataType:"json",success:function(){a("УСПІШНЕ ЗБЕРІГАННЯ НАЛАШТУВАНЬ"),s=e},error:function(){a("ПОМИЛКА ЗБЕРІГАННЯ НАЛАШТУВАНЬ")}}):a("ВВЕДІТЬ ЗНАЧЕННЯ")}))})),$(document).ready((function(){$("#BaudRate").on("change",(function(){c.modbus.baudRate=$("#BaudRate").val()})),$("#DataBits").on("change",(function(){c.modbus.dataBits=$("#DataBits").val()})),$("#Parity").on("change",(function(){c.modbus.parity=$("#Parity").val()})),$("#StopBits").on("change",(function(){c.modbus.stopBits=$("#StopBits").val()}))})),$(document).ready((function(){$(document).on("click","#DeviceAdd, [deviceIndex]",(function(){let e,t,i,o,d,s=$(this).is("[deviceIndex]")?$("[deviceIndex]").index(this):$("[deviceIndex]").length,p=!$(this).is("[deviceIndex]");if(p)e=t=i=o=d="";else{let n=c.devices[s];e=n.title,t=n.id,i=n.period,o=n.reuqest,d=n.responce}r(((e,t,i,o,n)=>`<label>Назва пристрою</label><input type="text" placeholder="Назва пристрою" class="validator" id="DeviceTitle" value="${e}"><div class="row"><div><label>Ідентифікатор</label></div><div><label>Цикл  опитування</label></div><div><input type="number" inputmode="numeric" placeholder="Ідентифікатор" class="validator" id="DeviceId" value="${t}"></div><div><input type="number" inputmode="numeric" placeholder="Цикл опитування" class="validator" id="DevicePeriod" value="${i}"></div><div><label>Затримка запиту</label></div><div><label>Повторний запит</label></div><div><input type="number" inputmode="numeric" placeholder="Затримка запиту" class="validator" id="DeviceReuqest" value="${o}"></div><div><input type="number" inputmode="numeric" placeholder="Повторний запит" class="validator" id="DeviceResponce" value="${n}"></div></div>`)(e,t,i,o,d),"DeviceSettingWindow",(function(){if(!n($("#DeviceSettingWindow")))return a("ВВЕДІТЬ ЗНАЧЕННЯ"),!1;{let e={};if(e=new Proxy(e,l),e.index=p?s:c.devices[s].index,e.title=$("#DeviceTitle").val(),e.id=$("#DeviceId").val(),e.period=$("#DevicePeriod").val(),e.reuqest=$("#DeviceReuqest").val(),e.responce=$("#DeviceResponce").val(),e.enable=!!p||c.devices[s].enable,e.parameters=p?[]:c.devices[s].parameters,e.parameters=new Proxy(e.parameters,l),c.devices.some((function(t,i){return t.id===e.id&&i!==s})))return a("ПРИСТРІЙ З ТАКИМ ІДЕНТИФІКАТОРОМ ВЖЕ ІСНУЄ"),!1;c.devices[s]=e}}),(function(){}))})),$(document).on("click",".deviceToggle",(function(){let e=$(this).siblings("[deviceIndex]").attr("deviceIndex");c.devices[e].enable=!c.devices[e].enable})),$(document).on("click",".deviceEdit",(function(){let e=$(this).siblings("[deviceIndex]").attr("deviceIndex");$(".parameter").remove(),$("#PageSettingDevice, #PageSettingParameter").toggleClass("visible"),$("#PageSettingParameter").attr("indexDevice",$(".deviceEdit").index(this)),$("#PageSettingParameter").find(".sort").removeClass("sortUp sortDown"),c.devices[e].parameters=new Proxy([...c.devices[e].parameters].sort((function(e,t){return e.index>t.index?1:e.index<t.index?-1:0})),l)})),$(document).on("click",".deviceRemove",(function(){let e=$(this).siblings("[deviceIndex]").attr("deviceIndex");r("БАЖАЄТЕ ВИДАЛИТИ ПРИСТРІЙ?","",(function(){let t=[...c.devices];t.splice(e,1),c.devices=new Proxy(t,l)}),(function(){}))}))})),$(document).ready((function(){$(document).on("click","#ParameterAdd, [parameterIndex]",(function(){let e,t,i,o,l,d,s,p=$("#PageSettingParameter").attr("indexDevice"),u=$(this).is("[parameterIndex]")?$("[parameterIndex]").index(this):$("[parameterIndex]").length,v=!$(this).is("[parameterIndex]");if(v)e="",t="",i="rc",o="1",l="0",d="",s="0";else{let n=c.devices[p].parameters[u];e=n.title,t=n.register,i=n.function,o=n.type,l=n.unit,d=n.coefficient,s=n.simbol}r(((e,t,i,o,n,a,r)=>`<label>Назва параметру</label><input type="text" placeholder="Назва параметру" class="validator" id="ParameterTitle" value="${e}"><div class="row"><div><label>Регістр</label></div><div><label>Код функції</label></div><div><input type="number" inputmode="numeric" placeholder="Регістр" class="validator" id="ParameterRegister" value="${t}"></div><div><select id="ParameterFunctionCode"><option value="rc" ${"rc"===i?"selected":""}>01</option><option value="rdi" ${"rdi"===i?"selected":""}>02</option><option value="rhr" ${"rhr"===i?"selected":""}>03</option><option value="rir" ${"rir"===i?"selected":""}>04</option></select></div><div><label>Тип даних</label></div><div><label>Одиниця виміру</label></div><div><select id="ParameterType"><option value="1" ${"1"===o?"selected":""} ${["rhr","rir"].includes(i)?"disabled":""}>BOOL</option><option value="2" ${"2"===o?"selected":""} ${["rc","rdi"].includes(i)?"disabled":""}>INT16</option><option value="3" ${"3"===o?"selected":""} ${["rc","rdi"].includes(i)?"disabled":""}>FLOAT32 | BE</option><option value="4" ${"4"===o?"selected":""} ${["rc","rdi"].includes(i)?"disabled":""}>FLOAT32 | LE</option></select></div><div><select id="ParameterUnit" ${["rc","rdi"].includes(i)?"disabled":""}><option value="0" ${"0"===n?"selected":""}>none</option><option value="1" ${"1"===n?"selected":""}>A</option><option value="2" ${"2"===n?"selected":""}>atm</option><option value="3" ${"3"===n?"selected":""}>bar</option><option value="4" ${"4"===n?"selected":""}>°C</option><option value="5" ${"5"===n?"selected":""}>Gcal</option><option value="6" ${"6"===n?"selected":""}>Gcal/h</option><option value="7" ${"7"===n?"selected":""}>GJ</option><option value="8" ${"8"===n?"selected":""}>GJ/h</option><option value="9" ${"9"===n?"selected":""}>grad</option><option value="10" ${"10"===n?"selected":""}>h</option><option value="11" ${"11"===n?"selected":""}>ht</option><option value="12" ${"12"===n?"selected":""}>Hz</option><option value="13" ${"13"===n?"selected":""}>J/h</option><option value="14" ${"14"===n?"selected":""}>kg</option><option value="15" ${"15"===n?"selected":""}>kg/h</option><option value="16" ${"16"===n?"selected":""}>kgf/cm²</option+<option value="17" ${"17"===n?"selected":""}>km/h</option><option value="18" ${"18"===n?"selected":""}>kPa</option><option value="19" ${"19"===n?"selected":""}>kVA</option><option value="20" ${"20"===n?"selected":""}>kVAr</option><option value="21" ${"21"===n?"selected":""}>kVArh</option><option value="22" ${"22"===n?"selected":""}>kW</option><option value="23" ${"23"===n?"selected":""}>kWh </option><option value="24" ${"24"===n?"selected":""}>l</option><option value="25" ${"25"===n?"selected":""}>m</option><option value="26" ${"26"===n?"selected":""}>m/s</option><option value="27" ${"27"===n?"selected":""}>m³</option><option value="28" ${"28"===n?"selected":""}>m³/day</option><option value="29" ${"29"===n?"selected":""}>m³/h</option><option value="30" ${"30"===n?"selected":""}>m³/min</option><option value="31" ${"31"===n?"selected":""}>m³/sec</option><option value="32" ${"32"===n?"selected":""}>mA </option><option value="33" ${"33"===n?"selected":""}>mbar</option><option value="34" ${"34"===n?"selected":""}>mg/l</option><option value="35" ${"35"===n?"selected":""}>mg/m³ </option><option value="36" ${"36"===n?"selected":""}>min</option><option value="37" ${"37"===n?"selected":""}>mm</option><option value="38" ${"38"===n?"selected":""}>mmhg</option><option value="39" ${"39"===n?"selected":""}>MPa</option><option value="40" ${"40"===n?"selected":""}>ms</option><option value="41" ${"41"===n?"selected":""}>mS/cm</option><option value="42" ${"42"===n?"selected":""}>mV</option><option value="43" ${"43"===n?"selected":""}>MVA</option><option value="44" ${"44"===n?"selected":""}>MVAr</option><option value="45" ${"45"===n?"selected":""}>MW</option><option value="46" ${"46"===n?"selected":""}>MWh</option><option value="47" ${"47"===n?"selected":""}>n.m³</option><option value="48" ${"48"===n?"selected":""}>Pa</option><option value="49" ${"49"===n?"selected":""}>%</option><option value="50" ${"50"===n?"selected":""}>ppm</option><option value="51" ${"51"===n?"selected":""}>rpm</option><option value="52" ${"52"===n?"selected":""}>sec</option><option value="53" ${"53"===n?"selected":""}>sm</option><option value="54" ${"54"===n?"selected":""}>t</option><option value="55" ${"55"===n?"selected":""}>t/h</option><option value="56" ${"56"===n?"selected":""}>t/m³</option><option value="57" ${"57"===n?"selected":""}>V</option><option value="58" ${"58"===n?"selected":""}>VA</option><option value="59" ${"59"===n?"selected":""}>VAr</option><option value="60" ${"60"===n?"selected":""}>W</option><option value="61" ${"61"===n?"selected":""}>µS/cm</option></select></div><div><label>Коефіцієнт</label></div><div><label>Кількість знаків</label></div><div><input type="number" inputmode="decimal" placeholder="Коефіцієнт" id="ParameterCoefficient" value="${a}" ${["rc","rdi"].includes(i)?"disabled":""}></div><div><select id="ParameterSimbol" ${["rc","rdi"].includes(i)?"disabled":""}><option value="0" ${"0"===r?"selected":""}>0</option><option value="1" ${"1"===r?"selected":""}>1</option><option value="2" ${"2"===r?"selected":""}>2</option><option value="3" ${"3"===r?"selected":""}>3</option></select></div></div>`)(e,t,i,o,l,d,s),"ParameterSettingWindow",(function(){if(!n($("#ParameterSettingWindow")))return a("ВВЕДІТЬ ЗНАЧЕННЯ"),!1;{let e={};if(e.index=v?u:c.devices[p].parameters[u].index,e.title=$("#ParameterTitle").val(),e.register=$("#ParameterRegister").val(),e.function=$("#ParameterFunctionCode").val(),e.type=$("#ParameterType").val(),e.unit=$("#ParameterUnit").val(),e.coefficient=$("#ParameterCoefficient").val(),e.simbol=$("#ParameterSimbol").val(),c.devices[p].parameters.some((function(t,i){return t.register===e.register&&t.function===e.function&&i!==u})))return a("ПАРАМЕТР З ТАКИМ РЕГІСТРОМ ВЖЕ ІСНУЄ"),!1;c.devices[p].parameters[u]=e}}),(function(){}))})),$(document).on("click",".parameterRemove",(function(e){let t=$(this).siblings("[parameterIndex]").attr("parameterIndex");r("БАЖАЄТЕ ВИДАЛИТИ ПАРАМЕТР?","",(function(){let e=[...c.devices[$("#PageSettingParameter").attr("indexDevice")].parameters];e.splice(t,1),c.devices[$("#PageSettingParameter").attr("indexDevice")].parameters=new Proxy(e,l)}),(function(){}))})),$(document).on("change","#ParameterFunctionCode",(function(){["rhr","rir"].includes($(this).val())?($("#ParameterUnit, #ParameterCoefficient, #ParameterSimbol").prop("disabled",!1),$('#ParameterType option[value ="1"]').prop("disabled",!0),$('#ParameterType option[value ="2"], #ParameterType option[value ="3"], #ParameterType option[value ="4"]').prop("disabled",!1),$("#ParameterType").val("2"),$("#ParameterUnit").val("0"),$("#ParameterCoefficient").val(""),$("#ParameterSimbol").val("0")):($("#ParameterUnit, #ParameterCoefficient, #ParameterSimbol").prop("disabled",!0),$('#ParameterType option[value ="1"]').prop("disabled",!1),$('#ParameterType option[value ="2"], #ParameterType option[value ="3"], #ParameterType option[value ="4"]').prop("disabled",!0),$("#ParameterType").val("1"),$("#ParameterUnit").val("0"),$("#ParameterCoefficient").val(""),$("#ParameterSimbol").val("0"))}))})),$(document).ready((function(){$(document).on("click","#ChartAdd, [chartIndex]",(function(){let e=$(this).is("[chartIndex]")?$("[chartIndex]").index(this):$("[chartIndex]").length,t=!$(this).is("[chartIndex]");r(`<label>Назва графіку</label><input type="text" placeholder="Назва графіку" class="validator" id="ChartTitle" value="${t?"":c.charts[e].title}">`,"ChartSettingWindow",(function(){if(!n($("#ChartSettingWindow")))return a("ВВЕДІТЬ ЗНАЧЕННЯ"),!1;{let i={};if(i=new Proxy(i,l),i.index=t?e:c.charts[e].index,i.title=$("#ChartTitle").val(),i.trends=t?[]:c.charts[e].trends,i.trends=new Proxy(i.trends,l),c.charts.some((function(t,o){return t.title===i.title&&o!==e})))return a("ГРАФІК З ТАКОЮ НАЗВОЮ ВЖЕ ІСНУЄ"),!1;c.charts[e]=i}}),(function(){}))})),$(document).on("click",".chartEdit",(function(){let e=$(this).siblings("[chartIndex]").attr("chartIndex");$(".trend").remove(),$("#PageSettingChart, #PageSettingTrend").toggleClass("visible"),$("#PageSettingTrend").attr("indexChart",$(".chartEdit").index(this)),$("#PageSettingTrend").find(".sort").removeClass("sortUp sortDown"),c.charts[e].trends=new Proxy([...c.charts[e].trends].sort((function(e,t){return e.index>t.index?1:e.index<t.index?-1:0})),l)})),$(document).on("click",".chartRemove",(function(){let e=$(this).siblings("[chartIndex]").attr("chartIndex");r("БАЖАЄТЕ ВИДАЛИТИ ГРАФІК?","",(function(){let t=[...c.charts];t.splice(e,1),c.charts=new Proxy(t,l)}),(function(){}))}))})),$(document).ready((function(){$(document).on("click","#TrendAdd, [trendIndex]",(function(){let e,t,i,o,l,d,s=$("#PageSettingTrend").attr("indexChart"),p=$(this).is("[trendIndex]")?$("[trendIndex]").index(this):$("[trendIndex]").length,u=!$(this).is("[trendIndex]");if(u)e="",t="#555555",i=[],$.each(c.devices,(function(e){i.push({value:c.devices[e].index,text:c.devices[e].title})})),o="none",l=[],d="none";else{let n=c.charts[s].trends[p],a=c.devices.find((e=>e.index===parseInt(n.device))),r=a?a.parameters:"";e=n.title,t=n.color,i=[],$.each(c.devices,(function(e){i.push({value:c.devices[e].index,text:c.devices[e].title})})),o=a?a.index:"none",l=[],$.each(r,(function(e){l.push({value:r[e].index,text:r[e].title})})),d=r.find((e=>e.index===parseInt(n.parameter)))?r.find((e=>e.index===parseInt(n.parameter))).index:"none"}r(((e,t,i,o,n,a)=>`<div class="row"><div><label>Назва тренду</label></div><div><label>Колір</label></div><div><input type="text" placeholder="Назва тренду" class="validator" id="TrendTitle" value="${e}"></div><div><input type="color" id="TrendColor" value="${t}"></div></div><label>Назва пристрою</label><select class="validator" id="TrendDevice"><option value="none" selected disabled>Оберіть пристрій</option>${i.map((e=>`<option value="${e.value}" ${o===e.value?"selected":""}>${e.text}</option>`)).join("")}</select><label>Назва параметру</label><select class="validator" id="TrendParameter"><option value="none" selected disabled>Оберіть параметр</option>${n.map((e=>`<option value="${e.value}" ${a===e.value?"selected":""}>${e.text}</option>`)).join("")}</select>`)(e,t,i,o,l,d),"TrendSettingWindow",(function(){if(!n($("#TrendSettingWindow")))return a("ВВЕДІТЬ ЗНАЧЕННЯ"),!1;{let e={};if(e.index=u?p:c.charts[s].trends[p].index,e.title=$("#TrendTitle").val(),e.color=$("#TrendColor").val(),e.device=$("#TrendDevice").val(),e.parameter=$("#TrendParameter").val(),c.charts[s].trends.some((function(t,i){return t.device===e.device&&t.parameter===e.parameter&&i!==p})))return a("ТРЕНД З ТАКИМИ ПАРАМЕТРАМИ ВЖЕ ІСНУЄ"),!1;c.charts[s].trends[p]=e}}),(function(){}))})),$(document).on("click",".trendRemove",(function(e){let t=$(this).siblings("[trendIndex]").attr("trendIndex");r("БАЖАЄТЕ ВИДАЛИТИ ТРЕНД?","",(function(){let e=[...c.charts[$("#PageSettingTrend").attr("indexChart")].trends];e.splice(t,1),c.charts[$("#PageSettingTrend").attr("indexChart")].trends=new Proxy(e,l)}),(function(){}))})),$(document).on("change","#TrendDevice",(function(){let e=c.devices.find((e=>e.index===parseInt($("#TrendDevice").val()))).parameters;$("#TrendParameter").empty(),$("#TrendParameter").append($("<option>").val("none").text("Оберіть параметр").prop("disabled",!0).prop("selected",!0)),$.each(e,(function(t){let i=$("<option>").val(e[t].index).text(e[t].title);$("#TrendParameter").append(i)}))}))}))})();