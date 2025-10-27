export class ValidationError extends Error {
  status: number;
  code: string;

  constructor(message: string, code: string = "VALIDATION_ERROR") {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
    this.code = code;
  }
}

export class IncompleteCredentialsError extends ValidationError {
  constructor() {
    super("Credenciales incompletas", "CREDENTIALS_REQUIRED");
  }
}

export class IncorrectCredentialsError extends ValidationError {
  constructor() {
    super("Credenciales incorrectas", "CREDENTIALS_ERROR");
  }
}