import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import {
  IHashGenerator,
  IHashManager,
  IIdGenerator,
  ITokenGenerator,
  IUserRepository,
  UserDTO,
} from "./ports";
import { User } from "../domain/user";

export class UserBusiness {
  constructor(
    private idGenerator: IIdGenerator,
    private hashGenerator: IHashGenerator,
    private userRepository: IUserRepository,
    private tokenGenerator: ITokenGenerator,
    private hashManager: IHashManager
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    new User(name, email, password, role);

    const hashPassword = await this.hashGenerator.hash(password);

    const user: UserDTO = {
      id: this.idGenerator.generate(),
      email,
      name,
      hashPassword,
      role,
    };

    await this.userRepository.createUser(user);
    const accessToken = this.tokenGenerator.generate({
      id: user.id,
      role: user.role,
    });

    return accessToken;
  }

  // o de login eu comecei, mas não finalizei. Tem que jogar o DTO pro "ports.ts" e fazer as devidas alterações aqui.

  async getUserByEmail(user: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const userFromDB = await userDatabase.getUserByEmail(user.email);

    const hashCompare = await this.hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    const accessToken = this.tokenGenerator.generate({
      id: userFromDB.getId(),
      role: userFromDB.getRole(),
    });

    if (!hashCompare) {
      throw new Error("Invalid Password!");
    }

    return accessToken;
  }
}
