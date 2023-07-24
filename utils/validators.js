import { maxLength, minLength, required, sameAs, helpers } from '@vuelidate/validators';
import { genFullTime } from './index';

let timeArray = genFullTime(0, 5);

export const validatorName = {
    required: helpers.withMessage('Введите имя', required),
    minLength: helpers.withMessage('Имя должно быть минимум из 3-х букв', minLength(3)),
    maxLength: helpers.withMessage('Имя может содержать не более 75 символов', maxLength(75)),
};

export const validatorPhone = {
    required: helpers.withMessage('Введите номер', required),
    minLength: helpers.withMessage('Введите корректный номер', minLength(18)),
};

export const validatorPassword = {
    required: helpers.withMessage('Введите пароль', required),
    minLength: helpers.withMessage('Пароль должен быть не менее 6 символов', minLength(6)),
    maxLength: helpers.withMessage('', maxLength(255)),
};

export function validatorPasswordRepeat(some) {
    return {
        sameAs: helpers.withMessage('', sameAs(some)),
    };
}

export const validatorTextarea = {
    required: helpers.withMessage('Введите текст отзыва', required),
    minLength: helpers.withMessage('Слишком короткий текст отзыва', minLength(3)),
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

export const lowerIndex = (time) =>
    helpers.withParams({ value: time }, (value) => {
        let { firstIndex: first, lastIndex: last } = getIndex(value, time);
        return first < last;
    });

export const largeIndex = (time) =>
    helpers.withParams({ value: time }, (value) => {
        let { firstIndex: first, lastIndex: last } = getIndex(value, time);
        return first > last;
    });
