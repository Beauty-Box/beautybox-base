import plural from 'plural-ru';

function dayDeclension(total, genitive = false) {
    if (genitive) {
        return plural(total, 'дня', 'дней', 'дней');
    } else {
        return plural(total, 'день', 'дня', 'дней');
    }
}

export { dayDeclension };
export default dayDeclension;
