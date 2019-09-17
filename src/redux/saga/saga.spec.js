import mySaga, { fetchData } from './sagas';
import { put, takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import api from './api';
jest.mock('./api');

const mockData = {
    count: 1,
    next: "https://swapi.co/api/people/?page=2",
    previous: null,
    results : [{
        birth_year: "19BBY",
        created: "2014-12-10T15:20:09.791000Z",
        edited: "2014-12-20T21:17:50.315000Z",
        eye_color: "brown",
        films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/", "https://swapi.co/api/films/1/", "https://swapi.co/api/films/7/"],
        gender: "female",
        hair_color: "brown",
        height: "150",
        homeworld: "https://swapi.co/api/planets/2/",
        mass: "49",
        name: "Leia Organa",
        skin_color: "light",
        species: ["https://swapi.co/api/species/1/"],
        starships: [],
        url: "https://swapi.co/api/people/5/",
        vehicles: ["https://swapi.co/api/vehicles/30/"]
    },
    {
        birth_year: "19BBY",
        created: "2014-12-10T15:20:09.791000Z",
        edited: "2014-12-20T21:17:50.315000Z",
        eye_color: "brown",
        films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/", "https://swapi.co/api/films/1/", "https://swapi.co/api/films/7/"],
        gender: "female",
        hair_color: "brown",
        height: "150",
        homeworld: "https://swapi.co/api/planets/2/",
        mass: "46",
        name: "C-3PO",
        skin_color: "light",
        species: ["https://swapi.co/api/species/1/"],
        starships: [],
        url: "https://swapi.co/api/people/5/",
        vehicles: ["https://swapi.co/api/vehicles/30/"]
    },
    {
        birth_year: "19BBY",
        created: "2014-12-10T15:20:09.791000Z",
        edited: "2014-12-20T21:17:50.315000Z",
        eye_color: "brown",
        films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/", "https://swapi.co/api/films/1/", "https://swapi.co/api/films/7/"],
        gender: "female",
        hair_color: "brown",
        height: "150",
        homeworld: "https://swapi.co/api/planets/2/",
        mass: "77",
        name: "Wedge Antilles",
        skin_color: "light",
        species: ["https://swapi.co/api/species/1/"],
        starships: [],
        url: "https://swapi.co/api/people/5/",
        vehicles: ["https://swapi.co/api/vehicles/30/"]
    }
]
}

describe('fetchData', () => {
    describe('fetchData success', () => {
        beforeEach(() => {
            api.mockImplementation(() => Promise.resolve(mockData))
        });
        const action = {
            type: 'FETCH_SUCCESS',
            payload: {
                pageNumber: 1,
                pageType: 'people'
            }
        }
        it('should fetch data ', async () => {
            const generator = await fetchData(action);
            await generator.next();
            expect(await generator.next(mockData).value).toEqual(put({type: 'FETCH_SUCCESS', payload: mockData}));
    
        })
    });
    describe('fetchData failed', () => {
        beforeEach(() => {
            api.mockImplementation(() => Promise.reject({ message:'something went wrong'}))
        });
        it('should fail fetch data ', async () => {
            let generator;
            const action = {
                type: 'FETCH_ERROR',
                payload: 'something went wrong'
            }
            try {
                generator = await fetchData(action);
                await generator.next().value;     
            } catch (e) {
                expect(generator.throw(e).value).toEqual(put({ type: 'FETCH_ERROR', payload: e.message }))   
            }
        })
    });
    describe('mySaga', () => {
        beforeEach(() => {
            api.mockImplementation(() => Promise.resolve(mockData))
        });
        it('should test the saga', async () => {
            await runSaga({
                dispatch: (action) => dispatched.push(action)
              },mySaga).done;
            expect(api).toHaveBeenCalled()
        })
    });
});
