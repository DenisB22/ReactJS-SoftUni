import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("Header", () => {

  it("should render a link to the home page", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: /pupmatch/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render a link to the blog page", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const blogLink = screen.getByRole("link", { name: /blog/i });
    expect(blogLink).toHaveAttribute("href", "/blog");
  });
});
