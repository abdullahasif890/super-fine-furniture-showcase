
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Filter } from "lucide-react";

interface ProductFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const ProductFilter = ({
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption
}: ProductFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <Tabs 
        defaultValue="all" 
        className="w-full md:w-auto"
        value={selectedCategory}
        onValueChange={setSelectedCategory}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="chairs">Chairs</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Sort
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
            <DropdownMenuRadioItem value="newest">
              Newest
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name-asc">
              Name (A-Z)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name-desc">
              Name (Z-A)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProductFilter;
