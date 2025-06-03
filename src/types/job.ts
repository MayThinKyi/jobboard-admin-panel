import { CreateJobFormValues } from "@/app/jobs/create/page";

export interface IJob {
  _id: string;
  title: string;
  jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "FREELANCE";
  experience: "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "EXECUTIVE";
  category: string;
  status: "OPEN" | "CLOSED";
  location: string;
  info: string;
  description: string[];
  qualifications: string[];
  benefits: string[];
  isNegotiable: boolean;
  salaryFrom?: number;
  salaryTo?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IJobResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface CreateJobDTO {
  title: string;
  jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "FREELANCE";
  experience: "INTERN" | "JUNIOR" | "MID" | "SENIOR" | "EXECUTIVE";
  category: string;
  status?: "OPEN" | "CLOSED";
  location: string;
  info: string;
  description: string[];
  qualifications: string[];
  benefits: string[];
  isNegotiable: boolean;
  salaryFrom?: number;
  salaryTo?: number;
}
