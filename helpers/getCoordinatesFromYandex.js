/**
 * @description getCoordinatesFromYandex получает кординаты адреса через Яндекс API
 * @param {String} address
 * @return {Array} Массив с координатами
 * */
async function getCoordinatesFromYandex(address = '') {
    try {
        let coordinates = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${
                import.meta.env.VITE_YANDEX_API_KEY
            }&geocode=${address}`,
            {
                method: 'GET',
                cors: true,
            }
        );
        if (coordinates.ok) {
            let { response } = await coordinates.json();
            return response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
                .split(' ')
                .reverse();
        } else {
            console.log('--- getCoordinatesFromYandex', coordinates.status);
        }
    } catch (error) {
        console.log('--- getCoordinatesFromYandex', error);
        throw error;
    }
}

export { getCoordinatesFromYandex };
export default getCoordinatesFromYandex;
