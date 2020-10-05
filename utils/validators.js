import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import { genFullTime } from '@beautybox/utils/index';

let timeArray = genFullTime();

export const name = {
    required,
    minLength: minLength(3),
    maxLength: maxLength(75),
};

export const phone = {
    required,
    minLength: minLength(18),
};

export const password = {
    required,
    minLength: minLength(6),
    maxLength: maxLength(28),
};

export const textarea = {
    required,
    minLength: minLength(30),
};

function getIndex(first, last) {
    if (!first || !last) {
        return { firstIndex: -1, lastIndex: -1 };
    }
    return {
        firstIndex: timeArray.indexOf(first),
        lastIndex: timeArray.indexOf(last),
    };
}

export const lowerIndex = (time) => (value) => {
    let { firstIndex: first, lastIndex: last } = getIndex(value, time);
    return first < last;
};

export const largeIndex = (time) => (value) => {
    let { firstIndex: first, lastIndex: last } = getIndex(value, time);
    return first > last;
};
