import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomeHeader() {
  return (
    <div className="border-b py-4 px-8 flex items-center justify-between">
      <div className="text-3xl font-bold">JAT</div>
      <div className="flex gap-2">
        <Button variant="outline" size="lg">
          <Link href="/register">Sign Up</Link>
        </Button>
        <Button variant="default" size="lg">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
