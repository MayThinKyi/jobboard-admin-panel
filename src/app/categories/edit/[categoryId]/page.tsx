'use client';

import * as z from 'zod';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import PageTitle from '@/components/PageTitle';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCategoryById, updateCategory } from '@/services/categoryService';


const schema = z.object({
    name: z.string().min(1, 'Category name is required'),
});

type FormValues = z.infer<typeof schema>;

export default function EditCategoryPage() {
    const router = useRouter();
    const { categoryId } = useParams() as { categoryId: string };

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { name: '' },
    });

    const { data, isLoading } = useQuery({
        queryKey: ['GET_CATEGORY', categoryId],
        queryFn: () => fetchCategoryById(categoryId),
        enabled: !!categoryId,
    });

    useEffect(() => {
        if (data) {
            form.reset({ name: data?.data.name });
        }
    }, [data, form]);

    const { mutate, isPending } = useMutation({
        mutationFn: (data: FormValues) => updateCategory(categoryId, data),
        onSuccess: () => router.push('/categories'),
    });

    const onSubmit = (values: FormValues) => mutate(values);

    if (isLoading) return <p>Loading category...</p>;

    return (
        <div className="max-w-xl mx-auto flex flex-col gap-6">
            <PageTitle title="Edit Category" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        name="name"
                        render={({ onChange, value, error }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        placeholder="Enter category name"
                                    />
                                </FormControl>
                                <FormMessage error={error} />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Updating...' : 'Update'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
