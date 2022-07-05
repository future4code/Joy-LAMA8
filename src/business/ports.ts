export interface IIdGenerator {
  generate: () => string;
}

export interface IHashGenerator {
  hash: (password: string) => Promise<string>;
}

export interface ITokenGenerator {
  generate: (input: any) => string;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  hashPassword: string;
  role: string;
}

export interface IUserRepository {
  createUser: (user: UserDTO) => Promise<boolean>;
}

export interface IHashManager {
  compare: (text: string, hash: string) => Promise<boolean>;
}
