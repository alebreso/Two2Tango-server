import { createConnection, getConnectionOptions } from "typeorm";

export const connectDatabase = async () => {
  const dbSettings = await getConnectionOptions();
  const settings = {
    ...dbSettings
  };
  return createConnection(settings).then(async () => {
    console.log("Connected to Postgres with TypeORM");
  });
};
