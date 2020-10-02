import Vue from 'vue';

//Date Filters
import dateFormatFilter from '@beautybox/core/filters/dateFormat.filter.js';
import dateDayFormat from '@beautybox/core/filters/dateDayFormat.filter.js';
import dateFullFormatFilter from '@beautybox/core/filters/dateFullFormat.filter';
import dateMonthShortFormat from '@beautybox/core/filters/dateMonthShortFormat.filter';
//Price Filters
import priceFilter from '@beautybox/core/filters/price.filter.js';
//Time Filters
import timeFilter from '@beautybox/core/filters/time.filter.js';

//Date Filters
Vue.filter('dateFormat', dateFormatFilter);
Vue.filter('dateDayFormat', dateDayFormat);
Vue.filter('dateFullFormat', dateFullFormatFilter);
Vue.filter('dateMonthShortFormat', dateMonthShortFormat);
//Price Filters
Vue.filter('price', priceFilter);
//Time Filters
Vue.filter('time', timeFilter);
