import Vue from 'vue';

import {
    dateFormat,
    dateFullFormat,
    dateDayFormatFilter,
    dateMonthYearFormatFilter,
    priceFilter,
    timeFilter,
} from './filters';

//Date Filters
Vue.filter('dateFormat', dateFormat);
Vue.filter('dateDayFormatFilter', dateDayFormatFilter);
Vue.filter('dateFullFormat', dateFullFormat);
Vue.filter('dateMonthYearFormatFilter', dateMonthYearFormatFilter);
//Price Filters
Vue.filter('price', priceFilter);
//Time Filters
Vue.filter('time', timeFilter);
