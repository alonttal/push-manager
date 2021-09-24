const request = require('supertest')
const app = require('../src/app')
const Notification = require('../src/models/notification')
const { setupDatabase, notificationOne } = require('./fixtures/db.js')

beforeEach(setupDatabase)

test('Should create notification', async () => {
  const notification = {
    title: 'title is a must',
    body: 'some body is optional',
    icon: 'https://mustbehttpsiconurl.com',
    badge: 'https://mustbehttpsbadgeurl.com'
  }

  const response = await request(app)
  .post('/notification')
  .send({ notification })
  .expect(201)
  expect(response.body).toMatchObject({ notification });

  const savedNotification = await Notification.findById(response.body.notification._id)
  expect(savedNotification).not.toBeNull()
})

test('Should fail to create notification with missing title', async () => {
  await request(app)
    .post('/notification')
    .send({
      notification: {
        body: 'some body is optional',
        icon: 'https://mustbehttpsiconurl.com',
        badge: 'https://mustbehttpsbadgeurl.com'
      }
    })
    .expect(400)
})

test('Should delete notification', async () => {
  await request(app)
    .delete('/notification')
    .send({
      id: notificationOne._id
    })
    .expect(200)

  const savedNotification = await Notification.findById(notificationOne._id)
  expect(savedNotification).toBeNull()
})

test('Should fail to delete notification if no id specified in request', async () => {
  await request(app)
    .delete('/notification')
    .send({
    })
    .expect(400)
})

test('Should return status OK when trying to delete unexisting notification', async () => {
  await request(app)
    .delete('/notification')
    .send({
      id: '613b8c89742ac28155398a06'
    })
    .expect(200)
})

test('should update notification', async () => {
  const data = {
    title: 'new title',
    body: 'new Body'
  }
  await request(app)
    .patch('/notification/' + notificationOne._id)
    .send(data)
    .expect(200)

    const updatedNotification = await Notification.findById(notificationOne._id)
    expect(updatedNotification.title).toBe(data.title)
    expect(updatedNotification.body).toBe(data.body)
})

test('should fail to update unexisting notification', async () => {
  const data = {
    title: 'new title',
    body: 'new Body'
  }
  const fakeId = '613b8c89742ac28155398a06'
  await request(app)
    .patch('/notification/' + fakeId)
    .send(data)
    .expect(400)
})

test('should return status OK when update without data', async () => {
  const response = await request(app)
    .patch('/notification/' + notificationOne._id)
    .send()
    .expect(200)

  expect(response.body).toMatchObject(notificationOne)
})