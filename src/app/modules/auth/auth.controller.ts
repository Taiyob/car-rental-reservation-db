import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const { body } = req.body;
  const result = await AuthServices.createUserIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfsully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDB(req.body);
  const { user, accessToken } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfsully',
    data: { user, token: accessToken },
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
