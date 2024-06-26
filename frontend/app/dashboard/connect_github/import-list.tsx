"use client"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Repository } from "@/types/github";
import { debounce } from "lodash";
import { FileCodeIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { LinkButton } from "@/components/ui/link-button";
import { timeSince } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function ImportList({ search, fetchRepositories }: { search?: Function, fetchRepositories: () => Promise<{ success: boolean; message: any; }> }) {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [searching, setSearching] = useState<boolean>(false);

    const handleSearch = async (query: string) => {
        setSearching(true);
        if (query.length > 1) {
            // const items = await search(query);
            // setRepositories(items);
        }
        setSearching(false);
    };
    const handleChange = (value: string) => {
        handleTextDebounce(value);
    };
    const handleTextDebounce = useCallback(debounce(handleSearch, 860), []);

    useEffect(() => {
        async function getRepositories() {
            const { success, message }: { success: boolean; message: any; } = await fetchRepositories()
            if(success){
                setRepositories(message)
            }
        }
        getRepositories()
    }, [fetchRepositories])
    return (
        <section className="w-full max-w-3xl mx-auto">
            <div className="border rounded-lg shadow-sm dark:border-gray-800">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <Input
                                className="bg-white md:flex-1 dark:bg-gray-950"
                                onChange={(e) => handleChange(e.target.value)}
                                placeholder="Search..."
                                type="search"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 max-h-80 overflow-y-auto">
                            {/* @ts-ignore */}
                            {repositories && !searching && repositories?.sort((a, b) => new Date(b.updated_at?.split("T")[0]) - new Date(a.updated_at?.split("T")[0])).map((repo, index) => (
                                <div className="flex items-center gap-4" key={repo.id}>
                                    <Image src="https://api-frameworks.vercel.sh/framework-logos/other.svg" width={100} height={100} alt="" className="h-9 w-9" />
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none shrink">
                                            {repo.name}
                                            <span className="text-xs text-gray-400 ml-2">
                                                {timeSince(repo.updated_at)}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        <LinkButton linkTo={`/dashboard/projects/new?repository=${repo.html_url}&project=${repo.name}&deployment=github&method=advanced`}>Import</LinkButton>
                                    </div>
                                </div>
                            ))}
                            {searching &&
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div className="flex items-center space-x-4" key={index}>
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </div>
                                ))}
                            {!searching && repositories.length === 0 && (
                                <div className="p-6 text-center">
                                    <h5 className="text-xl tracking-wider font-semibold shadow-sm">No Results Found.</h5>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}