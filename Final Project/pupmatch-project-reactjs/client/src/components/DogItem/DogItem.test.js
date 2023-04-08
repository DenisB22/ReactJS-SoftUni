import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactDOM } from "react-dom/client";
import { DogItem } from "./DogItem";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";

describe("DogItem Component", () => {
  // test('Show firstName', () => {

  //     const cards = [
   //   {
  //         firstName: 'Gancho',
  //         breed: 'French Bulldog',
  //         age: '5',
  //         city: 'Plovdiv',
  //         country: 'Bulgaria',
  //         email: 'gancho.ganchevski@gmail.com',
  //         additionalInfo: 'Very cute dog',
  //         uid: 'VogEPjQ0AyMdqsKOowkvSoiF0Tr2',
  //         photoURL: 'https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-09/french%20bulldog.jpg?h=6da9d27b&itok=uUP7yqGq'
  //     }]

  //         render(
  //             <AuthContextProvider currentUser={null}>
  //                 <BrowserRouter>
  //                     <DogItem cards={cards}/>
  //                 </BrowserRouter>
  //             </AuthContextProvider>
  //         );

  //     expect(screen.queryByText(cards[0].firstName)).toBeInTheDocument();
  // });

  test("Click on details", async () => {
    global.window = { location: { pathname: null } };

    const cards = [
      {
        firstName: "Gancho",
        breed: "French Bulldog",
        age: "5",
        city: "Plovdiv",
        country: "Bulgaria",
        email: "gancho.ganchevski@gmail.com",
        additionalInfo: "Very cute dog",
        uid: "VogEPjQ0AyMdqsKOowkvSoiF0Tr2",
        photoURL:
          "https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-09/french%20bulldog.jpg?h=6da9d27b&itok=uUP7yqGq",
      },
    ];

    render(
      <AuthContextProvider>
        <BrowserRouter>
          <DogItem />
        </BrowserRouter>
      </AuthContextProvider>
    );

    await userEvent.click(screen.queryByText("View"));

    expect(global.window.location.pathname).toContaint(`/details/${cards[0].uid}`);
  });
});



