import { TestStatus } from '../TestStatus';

const testStatus = new TestStatus();
const requestData = { rates: { CAD: 1.42 } };
const errorsData = { errors: {} };
function genRequest(status, data, contentType = 'application/json', ok = true) {
    return {
        status: status,
        ok,
        headers: {
            get() {
                return contentType;
            },
        },
        json: () => Promise.resolve(data),
    };
}

const statuses = [200, 201, 203, 204, 400, 401, 403, 404, 422, 500, 501, 502, 503, 504];

describe('TestStatus', () => {
    statuses.forEach((item) => {
        it(`Должен вызвать метод ${item}`, async () => {
            const ok = item < 400;
            expect.assertions(ok ? 1 : 2);
            const spy = jest.spyOn(testStatus, `s${item}`);
            try {
                await testStatus.statusHandler(
                    genRequest(item, item < 500 ? requestData : errorsData, 'application/json', ok)
                );
                expect(spy).toHaveBeenCalled();
            } catch (e) {
                expect(spy).toHaveBeenCalled();
                expect(e.status).toEqual(item);
            }
        });
    });
    it('Должен вызвать нулевой метод', async () => {
        expect.assertions(1);
        try {
            await testStatus.statusHandler(genRequest(202, requestData));
        } catch (e) {
            expect(e.status).toEqual(0);
        }
    });
    it('Должен вызвать s200', async () => {
        expect.assertions(1);
        const spy = jest.spyOn(testStatus, 's200');
        try {
            await testStatus.statusHandler(genRequest(200, requestData, 'no-data'));
            expect(spy).toHaveBeenCalled();
        } catch (e) {}
    });
});
