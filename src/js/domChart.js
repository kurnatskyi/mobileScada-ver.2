// =================================================================================================
// |                                                                                               |
// |                                DOM ГРАФІК => ПОТОЧНИЙ                                         |
// |                                                                                               |
// =================================================================================================
let rem = parseFloat(getComputedStyle(document.querySelector('html')).fontSize);
let bodyColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--body-color');
let bodyBgColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--body-bg-color');
let secondaryBgColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--secondary-bg-color');
let linkColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--link-color');
let borderColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--border-color');
export let chart = new Highcharts.stockChart({
  chart: { 
    renderTo: 'PageChart',
    events: { 
      update: function () {
        chartLegend();
      },
      redraw: function () {
        chartLegend();
      },
      addSeries: function () {
        chartLegend();
      },
      show: function () {
        chartLegend();
      },
      hide: function () {
        chartLegend();
      }
    },
    style: {
      fontSize: '1rem'
    },
    borderColor: borderColor,
    borderWidth: null,
    type: 'line',
    backgroundColor: bodyBgColor,
    animation: true
  },
  navigator: {
    outlineColor: bodyColor,
    outlineWidth: 1,
    margin: rem * 0.5,
    minHeight: rem * 1,
    height: rem * 2,
    xAxis: {
      lineColor: bodyColor,
      gridLineWidth: 1,
      gridLineColor: bodyColor,
    }
  },
  scrollbar: {
    minHeight: rem * 0.5,
    height: rem * 0.5,
    liveRedraw: false,
    trackBackgroundColor: bodyBgColor,
    trackBorderColor: borderColor,
    trackBorderRadius: rem * 0.125,
    barBackgroundColor: bodyColor,
    barBorderColor: borderColor,
    barBorderRadius: rem * 0.125
  },
  rangeSelector: {
    enabled: false
  },   
  title: {
    text: null
  },
  credits: { 
    enabled: false
  },
  tooltip: { 
    backgroundColor: secondaryBgColor,
    borderColor: borderColor,
    useHTML: true,
    style: {  
      color: bodyColor,
    },
    xDateFormat: '%A, %b %d, %H:%M:%S',
    split: false,
    shared: false,
    animation: true
  },
  legend: {
    enabled: true,
    maxHeight: rem * 3.25,
    itemMarginBottom: rem * 0.25,
    useHTML: true,
    itemStyle: {
      color: bodyColor,
      fontSize: '0.8rem',
      fontWeight: 'bold',
    },
    itemHoverStyle: {
      color: linkColor
    },
    itemHiddenStyle: {
      color: secondaryBgColor
    }, 
    animation: false
  },
  plotOptions: {
    line: {
      animation: false, 
      dataLabels: {
        enabled: false,
        //useHTML: true
      }
    },
    series: {
      // gapUnit : 'value',
      // gapSize:5 * 1000,
      marker: {
        enabled: false
      }          
    }
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      second: '%H:%M:%S'
    },
    lineColor: bodyColor,
    gridLineWidth: 0.1,
    gridLineColor: bodyColor,
    labels: {
      //useHTML: true,
      style: {
        color: bodyColor
      }
    },
    tickColor: bodyColor
  },
  yAxis: {
    opposite: false,
    title: {
      text: null
    },
    lineColor: bodyColor,
    gridLineWidth: 0.1,
    gridLineColor: bodyColor,
    labels: {
      //useHTML: true,
      style: {
        color: bodyColor
      }
    },
    tickAmount: 9,
    tickWidth: 1,
    lineWidth: 1,
    tickColor: bodyColor
  },
  time: {
    useUTC: false
  }                
});
Highcharts.setOptions({
  lang: {
    months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    weekdays: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
    shortMonths: ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'],
  }
});
export function chartLegend() {
  if (chart.legend.nav) {
    let x = 0;
    if ($('.highcharts-legend-box').next('g').find('g').attr('transform')) {
      let string = $('.highcharts-legend-box').next('g').find('g').attr('transform');
      let value = string.match(/translate\(0,(-?\d+(\.\d+)?)\)/);
      if (value) {
        x = parseFloat(value[1]);
      }
    }
    $('.highcharts-legend-box').next('g').attr('clip-path', `inset(${-x - 0.25 * rem}px 0 ${-0.25 * rem}px 0)`);
    $('.highcharts-legend.highcharts-no-tooltip').find('div').first().css('clip', `rect(8px, 9999px, ${rem * 4}px, 0px)`);
    chart.legend.nav.attr('display', 'none');
  }
}
// Функція гортання навігаційного меню легенд графіка.
$(document).on('click', '#ChartLegendUp', function() {
  if (chart.legend.nav) {
    let x;
    chart.legend.scroll(-1, 0);
    let string = $('.highcharts-legend-box').next('g').find('g').attr('transform');
    let value = string.match(/translate\(0,(-?\d+(\.\d+)?)\)/);
    if (value) {
      x = parseFloat(value[1]);
    }
    $('.highcharts-legend-box').next('g').attr('clip-path', `inset(${-x - 0.25 * rem}px 0 ${-0.25 * rem}px 0)`);
  }
});
// Функція гортання навігаційного меню легенд графіка.
$(document).on('click', '#ChartLegendDown', function() {
  if (chart.legend.nav) {
    let x;
    chart.legend.scroll(1, 0);
    let string  = $('.highcharts-legend-box').next('g').find('g').attr('transform');
    let value = string.match(/translate\(0,(-?\d+(\.\d+)?)\)/);
    if (value) {
      x = parseFloat(value[1]);
    }
    $('.highcharts-legend-box').next('g').attr('clip-path', `inset(${-x -0.25 * rem}px 0 ${-0.25 * rem}px 0)`);
  }
});
// Функція гортання навігаційного меню легенд графіка.
$(document).on('click', '#ChartTooltip', function() {
  chart.tooltip.update({shared: $(this).prop('checked')}, false);
});