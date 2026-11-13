import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationTableService {
  async getAllApplications() {
    return [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        userId: 'test-user-id',
        profileId: 'test-profile-id',
        company: 'Google',
        companyUrl: 'https://google.com',
        position: 'Frontend Developer',
        vacancyUrl: 'https://careers.google.com',
        note: 'Applied through company website',
        status: 'Applied',
        createdAt: new Date('2026-11-01T10:00:00Z'),
        updatedAt: new Date('2026-11-01T10:00:00Z'),
        cvId: null,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        userId: 'test-user-id',
        profileId: 'test-profile-id',
        company: 'Microsoft',
        companyUrl: 'https://microsoft.com',
        position: 'Backend Developer',
        vacancyUrl: 'https://careers.microsoft.com',
        note: 'Waiting for interview feedback',
        status: 'Interview',
        createdAt: new Date('2026-11-05T14:30:00Z'),
        updatedAt: new Date('2026-11-10T09:00:00Z'),
        cvId: null,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        userId: 'test-user-id',
        profileId: 'test-profile-id',
        company: 'Amazon',
        companyUrl: 'https://amazon.jobs',
        position: 'Software Engineer',
        vacancyUrl: null,
        note: null,
        status: 'Rejected',
        createdAt: new Date('2026-10-20T08:00:00Z'),
        updatedAt: new Date('2026-11-08T16:45:00Z'),
        cvId: null,
      },
    ];
  }
}
