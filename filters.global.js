import Vue from 'vue';

//Date Filters
import dateFormatFilter from './filters/dateFormat.filter.js';
import dateDayFormat from './filters/dateDayFormat.filter.js';
import dateFullFormatFilter from './filters/dateFullFormat.filter';
import { dateMonthYearFormat } from './filters/date.filter';
//Price Filters
import priceFilter from './filters/price.filter.js';
//Time Filters
import timeFilter from './filters/time.filter.js';

//Date Filters
Vue.filter('dateFormat', dateFormatFilter);
Vue.filter('dateDayFormat', dateDayFormat);
Vue.filter('dateFullFormat', dateFullFormatFilter);
Vue.filter('dateMonthYearFormat', dateMonthYearFormat);
//Price Filters
Vue.filter('price', priceFilter);
//Time Filters
Vue.filter('time', timeFilter);
