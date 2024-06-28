import React, { FC } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  OverviewForm,
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
        <TabsContent value="socialLinks">Social Links Tab Content</TabsContent>
        <TabsContent value="teams">Teams Tab Content</TabsContent>
      </Tabs>
    </div>
  );
};

export default settings;
