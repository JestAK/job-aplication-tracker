import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function PrivateHeader() {
  return (
    <div className="border-b py-4 px-8 flex items-center justify-between">
      <div className="text-3xl font-bold">
        <Link href={'/'}>JAT</Link>
      </div>
      <TabsLine />
      <DropdownMenuIcons />
    </div>
  );
}

export function TabsLine() {
  return (
    <Tabs defaultValue="application-table">
      <TabsList variant="line">
        <TabsTrigger
          value="application-table"
          render={<Link href={'/application-table'} />}
        >
          Applications
        </TabsTrigger>
        <TabsTrigger value="cv-gallery" render={<Link href={'/cv-gallery'} />}>
          CV Gallery
        </TabsTrigger>
        <TabsTrigger
          value="respond-gallery"
          render={<Link href={'/respond-gallery'} />}
        >
          Respond Gallery
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function DropdownMenuIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">Username</Button>}
      />
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Profiles</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Profile 1</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon />
                Create New Profile
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem render={<Link href={'/billing'} />}>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href={'/settings'} />}>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          render={<Link href={'/logout'} />}
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
