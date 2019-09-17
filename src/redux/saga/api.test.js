import api from './api';

describe('api success', () => {
    describe('api', () => {
        beforeEach(() => {
            const mockSuccessResponse = {foo: 'bar'};
            const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
            const mockFetchPromise = Promise.resolve({ // 3
              json: () => mockJsonPromise,
            });
            jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
        })
        afterEach(() => {
            global.fetch.mockClear();
            delete global.fetch;
        });
        it('should call fetch and return a promise success', async () => {
            const response = await api(1, 'people');
            expect(response).toEqual({foo: 'bar'});
        });
    });
})
