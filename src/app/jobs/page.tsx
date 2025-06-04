"use client";

import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { deleteJob, fetchJobs } from "@/services/jobService";
import { getMe, updateFavouriteJob } from "@/services/userService";
import { IJob } from "@/types/job";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  HeartIcon,
  HeartOffIcon,
  Pencil,
  PlusCircle,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const JobsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["GET_JOBS"],
    queryFn: fetchJobs,
  });

  const { data: me, isLoading: isMeLoading } = useQuery({
    queryKey: ["ME"],
    queryFn: getMe,
  });
  const { mutate } = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_JOBS"] });
    },
  });
  const { mutate: favJob } = useMutation({
    mutationFn: updateFavouriteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ME"] });
    },
  });

  const columns: ColumnDef<IJob>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("title")}</span>
      ),
    },
    {
      accessorKey: "jobType",
      header: "Job Type",
    },
    {
      accessorKey: "experience",
      header: "Experience",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => {
        const job: IJob = row.original;
        return job.isNegotiable
          ? "Negotiable"
          : `${job.salaryFrom?.toLocaleString()} - ${job.salaryTo?.toLocaleString()}`;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Posted",
      cell: ({ row }) => {
        const job: IJob = row.original;
        return <>{new Date(job.createdAt).toDateString()}</>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const job = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/jobs/${job._id}`)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/jobs/edit/${job._id}`)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => mutate(job._id)}>
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  const favs = me?.data.favourites as string[];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between">
        <PageTitle title="Jobs" />
        <Button onClick={() => router.push("/jobs/create")} className="gap-2">
          <PlusCircle className="w-5 h-5" />
          Add Job
        </Button>
      </div>

      {/* <DataTable columns={columns} data={data?.data ?? []} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.data?.map((job) => (
          <div
            key={job._id}
            className="border rounded-xl p-4 shadow-sm bg-white flex flex-col justify-between"
          >
            <div className="mb-3">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <div
                  onClick={() => favJob(job._id)}
                  className="cursor-pointer flex items-center gap-1"
                >
                  {favs?.includes(job._id) ? (
                    <GoHeartFill size={28} />
                  ) : (
                    <GoHeart size={28} />
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{job.jobType}</p>
              <p className="text-sm">{job.experience}</p>
              <p className="text-sm">{job.location}</p>
              <p className="text-sm">
                {job.isNegotiable
                  ? "Negotiable"
                  : `${job.salaryFrom?.toLocaleString()} - ${job.salaryTo?.toLocaleString()}`}
              </p>
              <p className="text-xs text-gray-500">
                Posted: {new Date(job.createdAt).toDateString()}
              </p>
            </div>

            <div className="flex gap-2 mt-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/jobs/${job._id}`)}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/jobs/edit/${job._id}`)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => mutate(job._id)}
              >
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
