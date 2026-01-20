import { AxiosError } from 'axios';

class Response<T, D = any> {
  statusCode: number;

  data?: T;

  error?: AxiosError<D>;

  message?: string;

  dataError?: any;

  constructor(
    statusCode: number,
    data?: T,
    error?: AxiosError<D>,
    message?: string,
    dataError?: any
  ) {
    this.data = data;
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
    this.dataError = dataError;
  }

  static fromException<U>(error: any): Response<U> {
    if (error.response) {
      return new Response<U>(
        error.response.status.valueOf(),
        undefined,
        error,
        error.response.data.message,
        error.response.data.data
      );
    }

    return new Response<U>(500, undefined, error);
  }
}

export default Response;
