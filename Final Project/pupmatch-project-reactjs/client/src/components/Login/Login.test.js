// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Login } from "./Login";
// import { AuthContextProvider } from "../../context/AuthContext";
// import { ChatContextProvider } from "../../context/ChatContext";
// import { BrowserRouter } from "react-router-dom";

// describe("Login component", () => {
//   test("renders Login title", () => {
//     render(
//       <AuthContextProvider>
//         <ChatContextProvider>
//           {/* <React.StrictMode> */}
//           <BrowserRouter>
//             <Login />
//           </BrowserRouter>
//           {/* </React.StrictMode> */}
//         </ChatContextProvider>
//       </AuthContextProvider>
//     );
//     expect(screen.getByText("Login")).toBeInTheDocument();
//   });

//   test("submitting form calls handleSubmit function", async () => {
//     const mockHandleSubmit = jest.fn();
//     const { getByLabelText, getByRole } = render(
//       <Login handleSubmit={mockHandleSubmit} />
//     );
//     const emailInput = getByLabelText("Email Address");
//     const passwordInput = getByLabelText("Password");
//     const submitButton = getByRole("button", { name: "Login" });

//     userEvent.type(emailInput, "test@test.com");
//     userEvent.type(passwordInput, "password");
//     fireEvent.click(submitButton);

//     expect(mockHandleSubmit).toHaveBeenCalled();
//   });
// });
