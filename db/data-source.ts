import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config()
export const dataSourceOptions : DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port:  parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
    logging: false,
    synchronize: true,
    
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;


