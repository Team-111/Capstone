import db from '../db/firebase'

export async function getUsers() {
  try {
    const users = await db.collection('users').get()
    console.log(users)
  } catch (error) {
    console.error(error)
  }

}
