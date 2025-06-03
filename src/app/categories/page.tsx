"use client";

import { DataTable } from "@/components/DataTable";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { deleteCategory, fetchCategories } from "@/services/categoryService";
import { ICategory } from "@/types/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CategoriesPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: fetchCategories,
  });
  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name")}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/categories/${category._id}`)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/categories/edit/${category._id}`)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => mutate(category._id)}
            >
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];
  if (isLoading) return <p>Loading....</p>;

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between">
        <PageTitle title="Categories" />
        <Button
          onClick={() => router.push("/categories/create")}
          className="gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Add Category
        </Button>
      </div>

      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  );
};

export default CategoriesPage;
