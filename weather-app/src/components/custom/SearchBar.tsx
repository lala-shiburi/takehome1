import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SearchBar = ({
  onSearch,
  onReset,
}: {
  onSearch: (city: string) => void;
  onReset?: () => void;
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleReset = () => {
    onReset?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full  items-center space-x-2"
    >
      <Input
        type="search"
        value={city}
        onChange={(e) => {
          const value = e.target.value;
          setCity(value);
          if (value === "") {
            handleReset();
          }
        }}
        placeholder="Enter city"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
