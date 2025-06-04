import { IJob } from "./job";

export interface AuthDTO {
  email: string;
  password: string;
}

export interface IUserResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: "admin" | "user";

  personalInfo?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: Date;
    occupation?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    country?: string;
    city?: string;
    address?: string;
    postalCode?: number;
    linkedinUrl?: string;
  };

  experience?: Array<{
    position?: string;
    companyName?: string;
    jobType?: "FULL_TIME" | "PART_TIME" | "REMOTE" | "FREELANCE";
    country?: string;
    currentlyWorking?: boolean;
    from?: Date;
    to?: Date | "Present";
    description?: string;
  }>;

  education?: Array<{
    qualification?: string;
    institution?: string;
    fieldOfStudy?: string;
    educationLevel?:
      | "DOCTORATE"
      | "MASTER"
      | "BACHELOR"
      | "POST_GRADUATE"
      | "DIPLOMA"
      | "OTHER";
    country?: string;
    from?: Date;
    to?: Date;
    description?: string;
  }>;

  skills?: Array<{
    skill?: string;
    proficiency?: "HIGH" | "MODERATE" | "LOW";
  }>;

  languages?: Array<{
    language?: string;
    proficiency?: "HIGH" | "MODERATE" | "LOW";
  }>;

  cv?: string;
  resume?: string;

  overview?: {
    aboutYourself?: string;
    whyShouldWeHireYou?: string;
  };

  applications?: string[];
  favourites?: string[] | IJob[];

  createdAt?: Date;
}

export interface UpdateUserInfoDTO {
  personalInfo?: {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: Date;
    occupation: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    country: string;
    city: string;
    address: string;
    postalCode: number;
    linkedinUrl: string;
  };

  experience?: {
    position: string;
    companyName: string;
    jobType: "FULL_TIME" | "PART_TIME" | "REMOTE" | "FREELANCE";
    country: string;
    currentlyWorking: boolean;
    from: Date;
    to: Date | "Present";
    description: string;
  }[];

  education?: {
    qualification: string;
    institution: string;
    fieldOfStudy: string;
    educationLevel:
      | "DOCTORATE"
      | "MASTER"
      | "BACHELOR"
      | "POST_GRADUATE"
      | "DIPLOMA"
      | "OTHER";
    country: string;
    from: Date;
    to: Date;
    description: string;
  }[];

  skills?: {
    skill: string;
    proficiency: "HIGH" | "MODERATE" | "LOW";
  }[];

  languages?: {
    language: string;
    proficiency: "HIGH" | "MODERATE" | "LOW";
  }[];

  cv?: string;
  resume?: string;

  overview?: {
    aboutYourself: string;
    whyShouldWeHireYou: string;
  };
}
