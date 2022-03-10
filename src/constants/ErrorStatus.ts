/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
enum StatusConnection {
  INFORMATIONAL = 'INFORMATIONAL',
  REDIRECTION = 'REDIRECTION',
  CLIENT_ERROR = 'CLIENT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
}

const ErrorStatus = {
  [StatusConnection.INFORMATIONAL]: {
    message: '100번대 에러',
  },
  [StatusConnection.REDIRECTION]: {
    message: '300번대 에러',
  },
  [StatusConnection.CLIENT_ERROR]: {
    message: '400번대 에러',
  },
  [StatusConnection.SERVER_ERROR]: {
    message: '500번대 에러',
  },
};

const CheckErrorStatus = (status: number): string => {
  if (status >= 100 && status < 200) {
    return ErrorStatus[StatusConnection.INFORMATIONAL].message;
  }

  if (status >= 300 && status < 400) {
    return ErrorStatus[StatusConnection.REDIRECTION].message;
  }

  if (status >= 400 && status < 500) {
    return ErrorStatus[StatusConnection.CLIENT_ERROR].message;
  }

  return ErrorStatus[StatusConnection.SERVER_ERROR].message;
};

export default CheckErrorStatus;
