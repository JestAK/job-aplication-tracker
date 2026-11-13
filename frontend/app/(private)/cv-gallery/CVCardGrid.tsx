import CVCard from '@/app/(private)/cv-gallery/CVCard';

export default function CVCardGrid() {
  return (
    <div className={'grid grid-cols-3 gap-4 p-6'}>
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
      <CVCard />
    </div>
  );
}
