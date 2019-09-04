const db = require('../database/dbConfig.js')
const jokeModel = require('./jokes-model.js')

it('should insert a user', async () => {
    await jokeModel.add({username: 'jstevens', password: '1234pass'})

    const Users = await db('users');
    expect(Users).toHaveLength(6)
})