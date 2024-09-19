import { Controller, Post, Get, Put, Delete, Param, Body, HttpCode, ValidationPipe } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { CreatePatientDto, UpdatePatientDto } from '../dto/patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @HttpCode(201)
  @Post('create-patient')
  async createPatient(@Body(new ValidationPipe()) createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Get(':id')
  async getPatient(@Param('id') id: string) {
    return this.patientService.getPatient(id);
  }

  @Put(':id')
  async updatePatient(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updatePatient(id, updatePatientDto);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: number) {
    return this.patientService.deletePatient(id);
  }

  @Get()
  async getAllPatients() {
    return this.patientService.getAllPatients();
  }
}
