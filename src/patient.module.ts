// src/patient.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entity/patient.entity';
import { PatientService } from './services/patient.service';
import { PatientController } from './controllers/patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
