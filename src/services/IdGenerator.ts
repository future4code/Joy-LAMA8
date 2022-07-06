import { IIdGenerator } from "../business/ports";
import { v4 } from "uuid";

export class IdGenerator implements IIdGenerator {
  generate(): string {
    return v4();
  }
}
