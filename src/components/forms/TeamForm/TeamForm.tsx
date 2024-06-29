import React from 'react';
import { FieldInput } from '@/components';
import { BsInstagram } from 'react-icons/bs';
import { InstagramIcon, LinkedinIcon } from 'lucide-react';

type Props = {};

const TeamForm = (props: Props) => {
  return (
    <>
      <FieldInput
        title="Basic Information"
        subtitle="Add team members of your company."
      >
        <div className="w-[65%] mb-10">
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg font-semibold">4 Members</div>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-6">
            {[0, 1, 2, 3].map((item, i) => (
              <div key={item + i} className="p-3 shadow text-center">
                <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto" />
                <div className="mt-4 font-semibold">Adipati</div>
                <div className="text-sm text-gray-500">CEO</div>

                <div className="inline-flex mt-5 space-x-3">
                  <InstagramIcon className="w-4 h-4 text-gray-500" />
                  <LinkedinIcon className="w-4 h-4 text-gray-500" />
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
