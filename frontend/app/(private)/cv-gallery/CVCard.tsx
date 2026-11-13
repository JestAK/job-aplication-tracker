'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function CVCard() {
  return (
    <Card
      className="w-80 h-96 p-6 cursor-pointer"
      onClick={() => {
        console.log('NJKN');
      }}
    >
      <div>
        <Image
          src="/image.jpg"
          alt="CV"
          width={600}
          height={800}
          className="h-auto w-full rounded-md"
        />
      </div>

      <p className="text-lg font-bold">CV Name</p>
      <p className="text-muted-foreground">CV Description</p>
    </Card>
  );
}
