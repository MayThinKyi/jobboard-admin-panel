"use client";

import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { deleteJob, fetchJobs } from "@/services/jobService";
import { IJob } from "@/types/job";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const JobsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["GET_JOBS"],
    queryFn: fetchJobs,
  });

  const { mutate } = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_JOBS"] });
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

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between">
        <PageTitle title="Jobs" />
        <Button onClick={() => router.push("/jobs/create")} className="gap-2">
          <PlusCircle className="w-5 h-5" />
          Add Job
        </Button>
      </div>

      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  );
};

export default JobsPage;
