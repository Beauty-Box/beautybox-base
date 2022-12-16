import Vue from 'vue';

import {
    dateFormat,
    dateFullFormat,
    dateDayFormatFilter,
    dateDayMonthFormat,
    dateMonthYearFormatFilter,
    dateWeekdayFormatFilter,
    priceFilter,
    timeFilter,
} from './filters';

//Date Filters
Vue.filter('dateFormat', dateFormat);
Vue.filter('dateDayFormatFilter', dateDayFormatFilter);
Vue.filter('dateDayMonthFormat', dateDayMonthFormat);
Vue.filter('dateFullFormat', dateFullFormat);
Vue.filter('dateMonthYearFormatFilter', dateMonthYearFormatFilter);
Vue.filter('weekday', dateWeekdayFormatFilter);
//Price Filters
Vue.filter('price', priceFilter);
//Time Filters
Vue.filter('time', timeFilter);
