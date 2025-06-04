"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import { IJob } from "@/types/job";
import { getFavouriteJobs, getMe } from "@/services/userService";

export default function FavouritesPage() {
  const router = useRouter();

  const { data: me, isLoading } = useQuery({
    queryKey: ["ME"],
    queryFn: getFavouriteJobs,
  });

  if (isLoading) return <p className="text-center">Loading favourites...</p>;

  const favs = me?.data.favourites as IJob[];
  console.warn("favs", favs);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="My Favourites" />
        <span className="text-muted-foreground text-sm">
          Total: {favs?.length} job{favs?.length !== 1 ? "s" : ""}
        </span>
      </div>

      {favs?.length === 0 ? (
        <div className="text-center text-gray-500">
          You haven’t liked any jobs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favs?.map((job) => (
            <Card key={job._id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <CardDescription className="flex flex-wrap gap-2 text-sm mt-2">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {job.jobType}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {job.experience}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {job.location}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <div className="text-sm text-muted-foreground">
                  Salary:{" "}
                  {job.isNegotiable
                    ? "Negotiable"
                    : `${job.salaryFrom?.toLocaleString()} - ${job.salaryTo?.toLocaleString()}`}
                </div>
                <div className="text-xs text-muted-foreground">
                  Posted: {new Date(job.createdAt).toDateString()}
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/jobs/${job._id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
