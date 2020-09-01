const request = require('supertest'); 
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async() => { 
        await server.close();
        await Genre.remove({});
    });

    describe('GET /', () => {
        it('should retrun all the genres', async() => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);

            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.some(g => g.name === 'genre1' )).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a specific genre', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return a 404 if invalid ID is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            const res = await request(server).get('/api/genres/1');

            expect(res.status).toBe(404);
            //expect(res.body).toHaveProperty('name', genre.name);
        });
    });

    describe('POST /', () => {
        it('should return 401 if client is not logged in', async() => {
            const res = await request(server)
                .post('/api/genres')
                .send({ name: 'genre1' });

            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is less than 5 chars', async() => {
            const token = new User().generateAuthToken();
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: '1234' });

            expect(res.status).toBe(400);
        });

    });
});