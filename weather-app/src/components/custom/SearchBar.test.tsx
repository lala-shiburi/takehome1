import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("calls onSearch with the input value when submitted", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Enter city");
    const button = screen.getByRole("button", { name: /search/i });

    await user.type(input, "Cape Town");
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith("Cape Town");
  });

  it("calls onReset when input is cleared", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const onReset = vi.fn();
    render(<SearchBar onSearch={onSearch} onReset={onReset} />);

    const input = screen.getByPlaceholderText("Enter city");
    const button = screen.getByRole("button", { name: /search/i });

    await user.type(input, "Johannesburg");
    await user.click(button);
    expect(onSearch).toHaveBeenCalledWith("Johannesburg");

    await user.clear(input);
    expect(onReset).toHaveBeenCalled();
  });
});
