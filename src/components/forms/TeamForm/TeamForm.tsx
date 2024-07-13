import React from 'react';

import { InstagramIcon, LinkedinIcon } from 'lucide-react';
import { BsInstagram } from 'react-icons/bs';

import { FieldInput } from '@/components';
import DialogAddTeam from './DialogAddTeam';
import { Company, CompanyTeam } from '@prisma/client';

type TeamFormProps = {
  teams: CompanyTeam[] | undefined;
};

const TeamForm = ({ teams }: TeamFormProps) => {
  return (
    <>
      <FieldInput
        title="Basic Information"
        subtitle="Add team members of your company."
      >
        <div className="w-[65%] mb-10">
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg font-semibold">
              {teams?.length || 0} {teams?.length === 1 ? 'Member' : 'Members'}
            </div>
            <DialogAddTeam />
          </div>
          <div className="grid grid-cols-3 gap-5 mt-6">
            {/* {[0, 1, 2, 3].map((item, i) => ( */}
            {teams?.map((item: CompanyTeam) => (
              <div key={item.id} className="p-3 shadow text-center">
                <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto" />
                <div className="mt-4 font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">{item.position}</div>

                <div className="inline-flex mt-5 space-x-3">
                  <a href={item.instagram} target="_blank">
                    <InstagramIcon className="w-4 h-4 text-gray-500 hover:text-primary" />
                  </a>
                  <a href={item.linkedin} target="_blank">
                    <LinkedinIcon className="w-4 h-4 text-gray-500 hover:text-primary" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FieldInput>
    </>
  );
};

export default TeamForm;
