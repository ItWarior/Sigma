class HttpError extends Error {
  constructor(public status: number, public message: any) {
    super(message);
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;
