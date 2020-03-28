const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connections');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should bo able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONG",
                email: "contact@test.com",
                whatsapp: "11111111111",
                city: "Cidade",
                uf: "SC"
            });

        console.log(response.body);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});