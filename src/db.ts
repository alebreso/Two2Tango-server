import { DefaultNamingStrategy } from "typeorm/naming-strategy/DefaultNamingStrategy";
import { NamingStrategyInterface } from "typeorm/naming-strategy/NamingStrategyInterface";
import { snakeCase } from "typeorm/util/StringUtils";
import { createConnection, getConnectionOptions } from "typeorm";

class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + "s";
  }

  joinTableName(firstTableName: string, secondTableName: string): string {
    return firstTableName + "_" + secondTableName;
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join("_")
    );
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}

// export default () =>
//   createConnection()
//     .then(_ => console.log("Connected to Postgres with TypeORM"))
//     .catch(err => console.log(err));

export const connectDatabase = async () => {
  const dbSettings = await getConnectionOptions();
  const settings = {
    ...dbSettings,
    namingStrategy: new CustomNamingStrategy()
  };

  return createConnection(settings).then(async () => {
    console.log("Connected to Postgres with TypeORM");
  });
};
