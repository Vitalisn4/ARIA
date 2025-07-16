import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { expect, test } from "vitest";

test("renders button with correct text", () => {
  render(<Button>Click Me</Button>);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});
