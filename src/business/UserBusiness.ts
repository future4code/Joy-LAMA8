import { UserInputDTO, LoginInputDTO, Signup } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserRepository } from "./UserRepository";
import { MissingFieldsToComplete } from "../error/MissingFieldsToComplete";
import {
  invalidEmail,
  invalidPassword,
  invalidUserEmail,
} from "../error/InvalidInfos";
import { BaseError } from "../error/BaseError";

export class UserBusiness {
  constructor(private userDatabase: UserRepository) {}

  async createUser(signup: UserInputDTO) {
    try {
      const { name, email, password, role } = signup;
      
      if (!name || !email || !password || !role) {
        throw new MissingFieldsToComplete();
      }
      if (!email.includes("@")) {
        throw new invalidEmail();
      }
      if (password.length < 6) {
        throw new invalidPassword();
      }

      const findEmail = await this.userDatabase.findUserEmail(email);
      if (findEmail) {
        throw new invalidUserEmail();
      }

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();

      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(password);

      // const userDatabase = new UserDatabase();
      // await userDatabase.createUser(id, email, name, hashPassword, role);
      //PARTE DO CÓDIGO DO BOILERPLATE QUE EU SUBSTITUÍ PELO MODELO DO COOKENU
      
      const newSignup: Signup = {
        id,
        email,
        name,
        password: hashPassword,
        role,
      };

      await this.userDatabase.createUser(newSignup);
      
      const authenticator = new Authenticator();
      const accessToken = authenticator.generate({ id, role: role });

      return accessToken;
  }
    catch (error:any) {
      
     throw new BaseError(error.statusCode, error.sqlMessage || error.message);
    }
  }
}

  // async getUserByEmail(user: LoginInputDTO) {
  //   const userDatabase = new UserDatabase();
  //   const userFromDB = await userDatabase.getUserByEmail(user.email);

  //   const hashManager = new HashManager();
  //   const hashCompare = await hashManager.compare(
  //     user.password,
  //     userFromDB.getPassword()
  //   );

  //   const authenticator = new Authenticator();
  //   const accessToken = authenticator.generate({
  //     id: userFromDB.getId(),
  //     role: userFromDB.getRole(),
  //   });

  //   if (!hashCompare) {
  //     throw new Error("Invalid Password!");
  //   }

  //   return accessToken;
  // }

