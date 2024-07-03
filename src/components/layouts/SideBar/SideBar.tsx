'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import {
  AiOutlineCalendar,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';

import { Button } from '@/components';
import { BsBuilding } from 'react-icons/bs';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

type SideBarProps = {};

const SideBar: FC<SideBarProps> = (props: SideBarProps) => {
  const router = useRouter();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-none hover:text-primary"
            onClick={() => router.push('/')}
          >
            <AiOutlineHome className="mr-3.5 text-lg" />
            Home
          </Button>
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-none hover:text-primary"
          >
            <AiOutlineMessage className="mr-3.5 text-lg" />
            Messages
          </Button>
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-none hover:text-primary"
          >
            <BsBuilding className="mr-3.5 text-lg" />
            Company Profile
          </Button>
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-none hover:text-primary"
          >
            <AiOutlineUsergroupAdd className="mr-3.5 text-lg" />
            All Applicants
          </Button>
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-none hover:text-primary"
            onClick={() => router.push('/job-listings')}
          >
            <HiOutlineClipboardDocumentList className="mr-3.5 text-lg" />
            Job Listings
          </Button>
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-none hover:text-primary"
          >
            <AiOutlineCalendar className="mr-3.5 text-lg" />
            My Schedule
          </Button>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-none hover:text-primary"
            onClick={() => router.push('/settings')}
          >
            <AiOutlineSetting className="mr-3.5 text-lg" />
            Settings
          </Button>
          <Button
            variant={'ghost'}
            className="w-full justify-start rounded-none text-red-500 hover:text-red-500 hover:bg-red-100"
            onClick={() => signOut()}
          >
            <AiOutlineLogout className="mr-3.5 text-lg" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
