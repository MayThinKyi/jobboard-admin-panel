"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryById } from "@/services/categoryService";

export default function CategoryIndexPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["GET_CATEGORY_DETAILS", categoryId],
    queryFn: () => fetchCategoryById(categoryId as string),
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Category Details</h1>
          <p className="text-sm text-muted-foreground">
            View details for category #{data?.data._id}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button variant="secondary">
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
          <p className="text-sm text-muted-foreground">ID</p>
          <p className="font-medium">{data?.data._id}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-semibold text-lg">{data?.data.name}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Created At</p>
          <p>{data?.data.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
