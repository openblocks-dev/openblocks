export class ServiceError extends Error {
  code: number;
  constructor(message: string, code: number = 500) {
    super(message);
    this.code = code;
  }
}

export function badRequest(message: string) {
  return new ServiceError(message, 400);
}
