'use client'
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { ChangeEventHandler, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"

import qs from "query-string"

export const SearchInput = ( ) => {
    const searchParams = useSearchParams();
    const router = useRouter()
    const categoryId = searchParams.get('categoryId')
    const name = searchParams.get('name')
    const [value, setValue] = useState(name || '')
    const debouncedValue = useDebounce<string>( value, 500);

    const onChange: ChangeEventHandler<HTMLInputElement> =(e) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        const query = {
            name: debouncedValue,
            categoryId: categoryId
        }
        // const url = qs.stringify({
        //     url: window.location.href,
        //     query: query
        // },{ skipEmptyString: true, skipNull: true })
        // router.push(url)
        const queryString = qs.stringify(query, { skipEmptyString: true, skipNull: true });
        const newUrl = `${window.location.pathname}?${queryString}`;
        router.push(newUrl);
    },[debouncedValue, router, categoryId])
    return (
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input 
                onChange={onChange}
                value={value}
                placeholder="Search..."
                className="pl-10 bg-primary/10"
            />
        </div>
    )
}