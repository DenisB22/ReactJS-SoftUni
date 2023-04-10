import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DogItem } from "./DogItem";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import { act } from "react-dom/test-utils";

describe("DogItem Component", () => {
  test("displays the card details correctly", async () => {
    const cards = [{ firstName: "Gancho", breed: "French Bulldog", uid: "1" }];

    render(
      <AuthContextProvider currentUser={null}>
        <BrowserRouter>
          <DogItem cards={cards} />
        </BrowserRouter>
      </AuthContextProvider>
    );

    expect(screen.getByText(cards[0].firstName)).toBeInTheDocument();
    expect(screen.getByText(cards[0].breed)).toBeInTheDocument();
  });

  test("clicking 'View' button navigates to the correct route", async () => {
    const cards = [{ firstName: "Gancho", breed: "French Bulldog", uid: "1" }];

    const { history } = render(
      <AuthContextProvider currentUser={null}>
        <BrowserRouter>
          <DogItem cards={cards} />
        </BrowserRouter>
      </AuthContextProvider>
    );

    const viewButton = screen.getByText("View");

    userEvent.click(viewButton);

    expect(global.window.location.pathname).toContain(
      `/details/${cards[0].uid}`
    );
  });
});
