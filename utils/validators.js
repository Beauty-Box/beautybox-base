import { maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { genFullTime } from './index';

let timeArray = genFullTime();

export const validatorName = {
    required,
    minLength: minLength(3),
    maxLength: maxLength(75),
};

export const validatorPhone = {
    required,
    minLength: minLength(18),
};

export const validatorPassword = {
    required,
    minLength: minLength(6),
    maxLength: maxLength(255),
};

export function validatorPasswordRepeat(some) {
    return {
        sameAs: sameAs(some),
    };
}

export const validatorTextarea = {
    required,
    minLength: minLength(3),
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
