"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoTab } from "@/components/widgets/PersonalInfoTab";
import { ExperienceTab } from "@/components/widgets/ExperienceTab";
import { EducationTab } from "@/components/widgets/EducationTab";
import { SkillAndLanguageTab } from "@/components/widgets/SkillAndLanguageTab";
import { CvAndResumeTab } from "@/components/widgets/CvAndResumeTab";
import { OverviewTab } from "@/components/widgets/OverviewTab";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/userService";

export default function ProfilePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["ME"],
    queryFn: getMe,
  });
  if (isLoading) return <p>Loading....</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="flex flex-wrap justify-start gap-2">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills & Languages</TabsTrigger>
          <TabsTrigger value="resume">Cover & Resume</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoTab defaultValues={data?.data.personalInfo} />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceTab defaultValues={data?.data.experience} />
        </TabsContent>

        <TabsContent value="education">
          <EducationTab defaultValues={data?.data.education} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillAndLanguageTab
            defaultValues={{
              languages: data?.data.languages,
              skills: data?.data.skills,
            }}
          />
        </TabsContent>

        <TabsContent value="resume">
          <CvAndResumeTab />
        </TabsContent>

        <TabsContent value="overview">
          <OverviewTab defaultValues={data?.data.overview} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
