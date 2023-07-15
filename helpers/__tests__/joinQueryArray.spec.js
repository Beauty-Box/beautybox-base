import { joinQueryArray } from '../joinQueryArray';

describe('regular expression for query params', () => {
    let containObject;
    let containArray;
    beforeEach(() => {
        containObject = {};
        containArray = {
            nameFilter: '',
            customerActivity: 'permanent',
            visitPeriodFrom: '2022-08-01',
            visitPeriodTo: '2022-08-17',
            visitExists: 'false',
            visitCountFrom: '',
            visitCountTo: '',
            visitOnline: 'true',
            visitStatus: 'cancel',
            clientGender: 2,
            clientBirthdayFrom: '2022-08-03',
            clientBirthdayTo: '2022-08-03',
            clientAgeFrom: '7',
            clientAgeTo: '20',
            employees: [48683, 36718, 11877, 48557, 31598],
            services: [],
            profitFrom: '10',
            profitTo: '',
            averageCheckFrom: '',
            averageCheckTo: '10000000',
        };
    });

    it('should return encoded object', () => {});
    it('should return encoded array', () => {
        console.log(joinQueryArray(containArray));
        expect(joinQueryArray(containArray)).toEqual(
            'customerActivity=permanent&visitPeriodFrom=2022-08-01&visitPeriodTo=2022-08-17&visitExists=false&visitOnline=true&visitStatus=cancel&clientGender=2&clientBirthdayFrom=2022-08-03&clientBirthdayTo=2022-08-03&clientAgeFrom=7&clientAgeTo=20&employees[]=48683&employees[]=36718&employees[]=11877&employees[]=48557&employees[]=31598&profitFrom=10&averageCheckTo=10000000'
        );
    });
    // it('should return match', () => {
    //     expect(joinQueryArray(uri, key, value)).toEqual('post?key=2');
    // });
    //
    // it('should match regexp', () => {
    //     expect(joinQueryArray(uri2, key, value)).toEqual('&key=2&');
    // });
    // it('should work without params', () => {
    //     expect(joinQueryArray()).toEqual('?=');
    // });
    // it('should uri contain ?', () => {
    //     expect(joinQueryArray(uri3, key, value)).toEqual('post?&key=2');
    // });
});
