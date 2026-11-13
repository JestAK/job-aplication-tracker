'use client';

import { z } from 'zod';
import PrivateHeader from '@/components/layout/PrivateHeader';
import { DataTable } from '@/app/(private)/application-table/data-table';
import { columns } from '@/app/(private)/application-table/columns';

export default function ApplicationTablePage() {
  const applicationSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    note: z.string().optional(),
    status: z
      .enum(['pending', 'processing', 'success', 'failed'])
      .default('pending'),
    date: z.date().optional(),
    cv: z.url().optional(),
    url: z.url().optional(),
  });

  type Application = z.infer<typeof applicationSchema>;

  const data: Application[] = [
    {
      id: '1',
      name: 'Google',
      note: 'Frontend Developer position',
      status: 'pending',
      date: new Date('2026-10-01'),
      cv: 'https://example.com/cv/google.pdf',
      url: 'https://careers.google.com',
    },
    {
      id: '2',
      name: 'Microsoft',
      note: 'Backend Developer position',
      status: 'processing',
      date: new Date('2026-10-03'),
      url: 'https://careers.microsoft.com',
    },
    {
      id: '3',
      name: 'Amazon',
      note: 'Software Engineer internship',
      status: 'failed',
      date: new Date('2026-10-05'),
    },
    {
      id: '4',
      name: 'Meta',
      status: 'pending',
      date: new Date('2026-10-07'),
      url: 'https://www.metacareers.com',
    },
    {
      id: '5',
      name: 'Apple',
      note: 'Junior iOS Developer',
      status: 'success',
      date: new Date('2026-10-09'),
      cv: 'https://example.com/cv/apple.pdf',
    },
    {
      id: '6',
      name: 'Netflix',
      note: 'Fullstack Developer',
      status: 'processing',
      date: new Date('2026-10-11'),
    },
    {
      id: '7',
      name: 'Spotify',
      status: 'pending',
      date: new Date('2026-10-13'),
      url: 'https://www.lifeatspotify.com',
    },
    {
      id: '8',
      name: 'Adobe',
      note: 'React Developer',
      status: 'failed',
      date: new Date('2026-10-15'),
    },
    {
      id: '9',
      name: 'Intel',
      note: 'Software Engineering internship',
      status: 'processing',
      date: new Date('2026-10-17'),
    },
    {
      id: '10',
      name: 'NVIDIA',
      note: 'C++ Developer',
      status: 'pending',
      date: new Date('2026-10-19'),
      url: 'https://www.nvidia.com/en-us/about-nvidia/careers/',
    },
    {
      id: '11',
      name: 'IBM',
      status: 'success',
      date: new Date('2026-10-21'),
    },
    {
      id: '12',
      name: 'Oracle',
      note: 'Java Backend Developer',
      status: 'failed',
      date: new Date('2026-10-23'),
    },
    {
      id: '13',
      name: 'Salesforce',
      note: 'Fullstack Engineer',
      status: 'pending',
      date: new Date('2026-10-25'),
    },
    {
      id: '14',
      name: 'GitHub',
      note: 'Developer Tools Engineer',
      status: 'processing',
      date: new Date('2026-10-27'),
      url: 'https://www.github.careers',
    },
    {
      id: '15',
      name: 'Cloudflare',
      note: 'Backend Engineer',
      status: 'success',
      date: new Date('2026-10-29'),
    },
    {
      id: '16',
      name: 'Atlassian',
      status: 'pending',
      date: new Date('2026-11-01'),
    },
    {
      id: '17',
      name: 'JetBrains',
      note: 'TypeScript Developer',
      status: 'processing',
      date: new Date('2026-11-03'),
    },
    {
      id: '18',
      name: 'Red Hat',
      note: 'Linux Software Engineer',
      status: 'failed',
      date: new Date('2026-11-05'),
    },
    {
      id: '19',
      name: 'Shopify',
      status: 'pending',
      date: new Date('2026-11-07'),
      cv: 'https://example.com/cv/shopify.pdf',
    },
    {
      id: '20',
      name: 'OpenAI',
      note: 'Frontend Engineer',
      status: 'processing',
      date: new Date('2026-11-09'),
      url: 'https://openai.com/careers/',
    },
  ];

  return (
    <>
      <div className={'p-6'}>
        <div>
          <p className={'font-bold text-4xl'}>Application Table</p>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
