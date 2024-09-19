import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patient.module';
import { Patient } from './entity/patient.entity';
import * as dotenv from 'dotenv';

dotenv.config();

console.log("DATABASE_URL");
console.log(process.env.DATABASE_URL);

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            synchronize: true,
            entities: [Patient],
            migrations: ['src/migration'],
        }),
        TypeOrmModule.forFeature([Patient]),
        PatientModule,
    ],
})
export class AppModule { }