export class DomainError extends Error {
  status: number;
  code: string;

  constructor(message: string, status:number = 400 , code: string = "DOMAIN_ERROR") {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string, code: string = "NOT_FOUND") {
    super(message, 404, code);
  }
}