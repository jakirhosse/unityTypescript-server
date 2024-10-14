import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpstatus from 'http-status'
import { TeamServices } from './team.services'
import { TTeam } from './team.interface'

const createTeam = catchAsync(async (req, res) => {
  const createdTeam: TTeam = req.body
  const result = await TeamServices.createTeamIntoDB(createdTeam)

  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Team created successfully',
    data: result,
  })
})

const getALLTeam = catchAsync(async (req, res) => {
  const result = await TeamServices.getAllTeamFormDB()

  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'All Team retrieved successfully',
    data: result,
  })
})

const getSingleTeam = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await TeamServices.getTeamFormDB(id)

  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Single Team retrieved successfully',
    data: result,
  })
})

export const TeamControllers = {
  createTeam,
  getALLTeam,
  getSingleTeam,
}