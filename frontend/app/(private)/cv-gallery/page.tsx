import CVCardGrid from '@/app/(private)/cv-gallery/CVCardGrid';

export default function CVGallery() {
  return (
    <>
      <div className={'p-6'}>
        <div>
          <p className={'font-bold text-4xl'}>CV Gallery</p>
          <CVCardGrid />
        </div>
      </div>
    </>
  );
}
