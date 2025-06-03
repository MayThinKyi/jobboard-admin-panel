"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobById } from "@/services/jobService";
import { Badge } from "@/components/ui/badge";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["GET_JOB_DETAILS", jobId],
    queryFn: () => fetchJobById(jobId as string),
  });

  if (isLoading) return <p>Loading...</p>;

  const job = data?.data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Job Details</h1>
          <p className="text-sm text-muted-foreground">
            View job posting #{job?._id}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/jobs/edit/${job?._id}`)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-white shadow-sm space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Job Title</p>
          <p className="font-semibold text-lg">{job?.title}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-medium">{job?.location}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant={job?.status === "OPEN" ? "default" : "secondary"}>
              {job?.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            <Badge>{job?.jobType}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Experience</p>
            <Badge>{job?.experience}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Salary Range</p>
            <p className="font-medium">
              {job?.isNegotiable ? (
                <span className="text-sm text-muted-foreground">
                  (Negotiable)
                </span>
              ) : (
                <>
                  {job?.salaryFrom?.toLocaleString()} -{" "}
                  {job?.salaryTo?.toLocaleString()} MMK
                </>
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Created At</p>
            <p>{new Date(job?.createdAt!).toDateString()}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Info</p>
          <p className="font-normal">{job?.info}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Description</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            {job?.description.map((desc: string, idx: number) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Qualifications</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            {job?.qualifications.map((q: string, idx: number) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Benefits</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            {job?.benefits.map((b: string, idx: number) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
