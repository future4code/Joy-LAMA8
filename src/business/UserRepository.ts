import { Signup, User } from "../model/User";

export interface UserRepository {
  createUser(signup: Signup): Promise<void>;
  findUserEmail(email: string): Promise<User>;
}
