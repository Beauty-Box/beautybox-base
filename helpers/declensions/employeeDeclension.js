import plural from 'plural-ru';

function employeeDeclension(total, genitive = false) {
    if (genitive) {
        return plural(total, 'сотрудника', 'сотрудников', 'сотрудников');
    } else {
        return plural(total, 'сотрудник', 'сотрудники', 'сотрудники');
    }
}

export { employeeDeclension };
export default employeeDeclension;
