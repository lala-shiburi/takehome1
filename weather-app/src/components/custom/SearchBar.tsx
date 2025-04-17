import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SearchBar = () => {
  return (
    <div className="flex w-full max-w-[500] items-center space-x-2">
      <Input type="search" placeholder="Enter city" />
      <Button type="submit">Search</Button>
    </div>
  );
};
