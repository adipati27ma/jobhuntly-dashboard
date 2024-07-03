'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';

import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from '@/components';
import { useSession } from 'next-auth/react';

type HeaderProps = {};

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const navCreateJobPage: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => router.push('/post-a-job');

  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
      <div>
        <div>Company</div>
        <div className="font-semibold">{session?.user.name}</div>
      </div>
      <div>
        <Button onClick={navCreateJobPage} className="rounded-none py-3 px-6">
          <AiOutlinePlus className="mr-3 text-lg" />
          Post a job
        </Button>
      </div>
    </div>
  );
};

export default Header;
