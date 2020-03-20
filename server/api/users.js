import db from '../db/firebase'

export async function getUsers(retrievedUsers) {
  try {
    let userList = [];
    let usersSnapshot = await db.collection('users').orderBy('createdAt').get()
    usersSnapshot.forEach(user => {
      userList.push(user.data())
    })
    retrievedUsers(userList)
  } catch (error) {
    console.error(error)

  }

}
