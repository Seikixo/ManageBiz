import { useState } from "react";
import { router } from "@inertiajs/react";
import { Search } from "lucide-react";
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { useContext } from "react";
import { SearchFormContext } from "@/Pages/Products/ProductsIndex";

const SearchForm = () => {
    const {search, indexRoute} = useContext(SearchFormContext);
    const [searchQuery, setSearchQuery] = useState(search || '');

    const handleSubmit = (e) => {
        e.preventDefault();

        router.get(route(indexRoute),
            { search: searchQuery},
            { preserveState: true, replace: true}
        );
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="relative w-full">
                <Input
                    id="search"
                    name="search"
                    placeholder="Search Product..."
                    className="bg-white pr-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    type="submit"
                    className="absolute inset-y-0 right-2 flex items-center justify-center p-2"
                    size="icon"
                    variant="ghost"
                >
                    <Search className="w-5 h-5 text-gray-500" />
                </Button>
            </div>
        </form>
    );

}

export default SearchForm;