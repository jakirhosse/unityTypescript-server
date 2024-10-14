import { TTeam } from './team.interface'
import { Team } from './team.model'

const createTeamIntoDB = async (payload: TTeam): Promise<TTeam> => {
  const result = await Team.create(payload)
  return result
}

const getAllTeamFormDB = async () => {
  const result = await Team.find().populate('members.user')
  return result
}

const getTeamFormDB = async (id: string): Promise<TTeam | null> => {
  const result = await Team.findById(id).populate('members.user')
  return result
}

export const TeamServices = {
  createTeamIntoDB,
  getAllTeamFormDB,
  getTeamFormDB,
}