import httpStatus from 'http-status';
import catchAsync from '../../utils.ts/catchAsync';
import sendResponse from '../../utils.ts/sendResponse';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const { body } = req.body;
  console.log('From user controller', body);
  const result = await AuthServices.createUserIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfsully',
    data: result,
  });
});

export const AuthControllers = {
  createUser,
};
