import Image from 'next/image';
import HomeHeader from '@/components/layout/HomeHeader';

export default function Home() {
  return (
    <>
      <div className="min-h-dvh flex flex-col">
        <HomeHeader />
        <pre className="100wh bg-blue-500 text-5xl text-white font-extrabold flex-1 flex items-center justify-center leading-loose">
          {'Job Application Tracker — \n\t\tJust... another tracker'}
        </pre>
      </div>
    </>
  );
}
