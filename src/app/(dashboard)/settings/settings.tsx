import React, { FC } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  OverviewForm,
  SocialMediaForm,
  TeamForm,
} from '@/components';

type SettingsProps = {};

const settings: FC<SettingsProps> = (props: SettingsProps) => {
  return (
    <div>
      <div className="font-semibold text-3xl mb-5">Settings</div>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewForm />
        </TabsContent>
        <TabsContent value="socialLinks">
          <SocialMediaForm />
        </TabsContent>
        <TabsContent value="teams">
          <TeamForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default settings;
