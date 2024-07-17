import httpStatus from 'http-status';
import { TErrorResources } from '../interface/error.interface';

const handleDuplicateError = (error: any) => {
  const match = error.message.match(/"([^"]*)"/);
  const extracted_msg = match && match[1];

  const errorResources: TErrorResources = [
    {
      path: '',
      message: `${extracted_msg} is already exist`,
    },
  ];

  return { statusCode: httpStatus.BAD_REQUEST, errorResources };
};

export default handleDuplicateError;
