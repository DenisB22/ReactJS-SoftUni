// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Details } from "./Details";
// import { useContext } from "react";
// import { AuthContext, AuthContextProvider } from "../../context/AuthContext";
// import { ChatContextProvider } from "../../context/ChatContext";
// import { BrowserRouter } from "react-router-dom";

// const { currentUser } = useContext(AuthContext);

// const mockCard = {
//   uid: "test-uid",
//   firstName: "Test Name",
//   gender: "Male",
//   city: "Test City",
//   country: "Test Country",
//   additionalInfo: "Test additional info",
//   photoURL: "https://example.com/test-photo.jpg",
// };

// jest.mock("../../context/AuthContext", () => ({
//   AuthContext: {
//     currentUser: {
//       uid: "test-uid",
//       firstName: "Test Name",
//       gender: "Male",
//       city: "Test City",
//       country: "Test Country",
//       additionalInfo: "Test additional info",
//       photoURL: "https://example.com/test-photo.jpg",
//     },
//   },
// }));

// describe("Details", () => {
//   test("renders the details of a dog card", async () => {
//     const setCards = jest.fn();
//     const sendData = jest.fn();
//     const { container } = render(
//       <AuthContextProvider>
//         <ChatContextProvider>
//           {/* <React.StrictMode> */}
//           <BrowserRouter>
//             <Details setCards={setCards} sendData={sendData} />
//           </BrowserRouter>
//           {/* </React.StrictMode> */}
//         </ChatContextProvider>
//       </AuthContextProvider>
//     );

//     await screen.findByText(mockCard.firstName);
//     expect(screen.getByText(mockCard.gender.toUpperCase())).toBeInTheDocument();
//     expect(
//       screen.getByText(`${mockCard.city}, ${mockCard.country}`)
//     ).toBeInTheDocument();
//     expect(screen.getByText(mockCard.additionalInfo)).toBeInTheDocument();
//     expect(container.querySelector(`img[alt="Dog Photo"]`).src).toEqual(
//       mockCard.photoURL
//     );
//   });

//   test("displays a 'Message' button if the current user is not the owner of the profile", async () => {
//     const setCards = jest.fn();
//     const sendData = jest.fn();

//     render(<Details setCards={setCards} sendData={sendData} />);

//     await screen.findByText("Message");
//     userEvent.click(screen.getByText("Message"));
//     expect(sendData).toHaveBeenCalledTimes(1);
//   });

//   test("displays a 'Delete Profile' button if the current user is the owner of the profile", async () => {
//     const setCards = jest.fn();
//     const sendData = jest.fn();
//     render(<Details setCards={setCards} sendData={sendData} />);

//     await screen.findByText("Delete Profile");
//     userEvent.click(screen.getByText("Delete Profile"));
//     expect(setCards).toHaveBeenCalledTimes(1);
//     expect(setCards).toHaveBeenCalledWith([]);
//     expect(sendData).not.toHaveBeenCalled();
//   });
// });
