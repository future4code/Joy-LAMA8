import { BaseDatabase } from "./BaseDatabase";
import { Signup, User } from "../model/User";
import { UserRepository } from "../business/UserRepository";
import { BaseError } from "../error/BaseError";

export class UserDatabase extends BaseDatabase implements UserRepository {
  private static TABLE_NAME = "LAMA_USUARIOS";

  public async createUser(signup: Signup): Promise<void> {
    try {
      await this.getConnection().insert(signup).into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new BaseError(error.statusCode, error.sqlMessage || error.message);
    }
  }
  public async findUserEmail(email: string): Promise<User> {
    try {
      const user = await this.getConnection()
        .select(`*`)
        .where({ email })
        .into(UserDatabase.TABLE_NAME);

      return user[0];
    } catch (error: any) {
      throw new BaseError(error.statusCode, error.sqlMessage || error.message);
    }
  }
  
  // public async createUser(
  //   id: string,
  //   email: string,
  //   name: string,
  //   password: string,
  //   role: string
  // ): Promise<void> {
  //   try {
  //     await this.getConnection()
  //       .insert({
  //         id,
  //         email,
  //         name,
  //         password,
  //         role,
  //       })
  //       .into(UserDatabase.TABLE_NAME);
  //   } catch (error: any) {
  //     throw new Error(error.sqlMessage || error.message);
  //   }
  // }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }
}
