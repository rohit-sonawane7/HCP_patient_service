import { ConflictException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entity/patient.entity';
import { CreatePatientDto, UpdatePatientDto } from '../dto/patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) { }

  async createPatient(patientData: CreatePatientDto): Promise<Patient> {
    const existingPatient = await this.patientRepository.findOne({
      where: [
        { email: patientData.email },
        { phone: patientData.phone },
      ]
    });

    if (existingPatient) {
      throw new ConflictException('Patient with this email or phone already exists.');
    }

    const patient = this.patientRepository.create({
      ...patientData,
    });

    return await this.patientRepository.save(patient);
  }

  async getPatient(id: string): Promise<Patient> {
    const patientData = await this.patientRepository.findOneBy({ id });
    if (!patientData) {
      throw new HttpException('Patient not found', 400);
    }
    return patientData;
  }

  async updatePatient(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    await this.patientRepository.update(id, updatePatientDto);
    return this.getPatient(id);
  }

  async deletePatient(id: number): Promise<void> {
    await this.patientRepository.delete(id);
  }

  async getAllPatients(): Promise<Patient[]> {
    return this.patientRepository.find();
  }
}
