import { createConnection } from "typeorm";
import { User } from "../entities/User";

export const connectDatabase = async () => {
  const connection = await createConnection();

  return {
    users: connection.getRepository(User),
  };
};
