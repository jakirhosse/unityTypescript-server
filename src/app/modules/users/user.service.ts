
import { TFilter, TUser, UserDocument } from './user.interfage'
import { User } from './user.model'

// Create a new user
const createUserIntoDB = async (payload: TUser): Promise<TUser> => {
  const createdUser = await User.create(payload)
  return createdUser
}


const getAllUsersFromDB = async (
  filter: TFilter,
  page: number,
  pageSize: number,
): Promise<{ users: UserDocument[]; totalPages: number }> => {
  let query = User.find()

  if (filter.domain) {
    query = query.where('domain').equals(filter.domain)
  }

  if (filter.gender) {
    query = query.where('gender').equals(filter.gender)
  }

  const startIndex = (page - 1) * pageSize
  query = query.skip(startIndex).limit(pageSize)

  const rawUsers = await query.exec()

  // Mongoose's toObject method to convert documents to plain JavaScript objects
  const users = rawUsers.map((user) => user.toObject() as UserDocument)

  const totalUsers = await User.countDocuments()
  const totalPages = Math.ceil(totalUsers / pageSize)

  return { users, totalPages }
}



// Retrieve a specific user
const getSingleUserFromDB = async (id: string): Promise<TUser | null> => {
  const user = await User.findOne({ id: id })
  return user
}

// Update user
const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ id: id }, payload, {
    new: true,
  })
  return result
}

// Delete a user
const deleteUserFromDB = async (id: string) => {
  const result = await User.findOneAndDelete({ id: id })
  return result
}


// search implement
const searchUsersFromDB = async (
  query: string,
  page: number,
  pageSize: number,
) => {
  const startIndex = (page - 1) * pageSize

  const result = await User.find({
    $or: [
      { first_name: { $regex: query, $options: 'i' } },
      { last_name: { $regex: query, $options: 'i' } },
    ],
  })
    .skip(startIndex)
    .limit(pageSize)

  const totalUsers = await User.countDocuments({
    $or: [
      { first_name: { $regex: query, $options: 'i' } },
      { last_name: { $regex: query, $options: 'i' } },
    ],
  })

  const totalPages = Math.ceil(totalUsers / pageSize)

  return { users: result, totalPages }
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  searchUsersFromDB,
}