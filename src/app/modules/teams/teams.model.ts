import { Schema, model } from 'mongoose'
import { TMember, TTeam } from './teams.interface'

const teamMemberSchema = new Schema<TMember>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  },
  { _id: false },
)

const teamSchema = new Schema<TTeam>({
  team_name: {
    type: String,
    required: true,
    unique: true,
  },
  members: {
    type: [teamMemberSchema],
    default: [],
  },
})

teamSchema.pre('save', async function (next) {
  const teamName = this.team_name
  const teamCount = await Team.countDocuments({ team_name: teamName })

  if (teamCount !== 0) {
    throw new Error('Team name is already taken')
  } else {
    next()
  }
})

export const Team = model<TTeam>('Team', teamSchema)