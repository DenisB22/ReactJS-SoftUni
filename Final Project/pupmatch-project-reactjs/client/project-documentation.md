# Overview of the project and it's purpose
Pupmatch is a social web application designed for dog owners to connect and interact with each other. The purpose of the project is to create a platform where dog owners can share their experiences, meet new friends, and build a community of like-minded people who share their love for dogs.

The application allows users to create a profile for themselves and their dogs, search for other users and dogs based on various criteria such as location, breed, and interests, and interact with them through direct messaging and chat rooms.

In addition to the social aspect, Pupmatch also features a blogging section where users can share their funny and interesting experiences with their dogs. They can post photos, videos, and stories about their adventures with their furry friends, and engage with other users through comments and reactions.

Overall, Pupmatch aims to be a fun and engaging platform for dog owners to connect and share their passion for their furry companions.

# Technologies used
Pupmatch is built using the following technologies:

1. React
2. Material UI
3. CSS Sass
4. Firebase
React is a popular JavaScript library for building user interfaces, and is used in Pupmatch to create a responsive and interactive web application. Material UI is a set of React components that provide a library of pre-designed user interface elements, making it easier and faster to create professional-looking interfaces.

CSS Sass is used for styling and customizing the look and feel of the application. Sass is a preprocessor that extends CSS with additional features, such as variables, nesting, and mixins, which make it easier to write and manage complex stylesheets.

Firebase is a mobile and web application development platform that provides a suite of tools and services for building and deploying cloud-hosted applications. Firebase is used in Pupmatch to handle user authentication, database storage and hosting.

By using these technologies, I was able to build a modern and dynamic web application that offers users an intuitive and seamless experience

# Architecture of the project
* Header
* Footer
* Home
* Login
* Register
* DogItem
* EditProfile
* Details
* Chat
  * ChatBox
  * Chats
  * Chat
  * InputMessage
  * Message
  * Messages
  * Navbar
  * Searchbar
  * Sidebar
* Blog
  * Blog.js
  * CreatePost.js
  * DetailsPost.js
  * EditPost.js
  * FeaturedPost.js
  * Footer.js
  * Header.js
  * LikeButton.js
  * Main.js
  * MainFeaturedPost.js
  * Markdown.js
  * Sidebar.js


1. Header Component 
    - This component is responsible for rendering the header of the application.
2. Footer Component 
    - This component is responsible for rendering the footer of the application.
3. Home Component 
    - This component is responsible for rendering a list of all users in the application. It receives a list of users as props and passes each user to the DogItem component for rendering. Each user is displayed as a card with their name, profile picture, breed and a "View" button. The "View" button redirects the user to the Details component where they can view more information about the selected user. If the profile is the logged in user's profile, there is also an "Edit" button, which redirects the user to the edit page.
4. DogItem Component 
    - This component receives the users as props, loops through them  and renders their name, profile picture, and a "View" button. The "View" button redirects the user to the Details component.If the profile is the logged in user's profile, there is also an "Edit" button, which redirects the user to the edit page.
5. Login Component 
    - This component is responsible for rendering the login form. It includes input fields for the user's email and password and a "Login" button that submits the form to Firebase for authentication.
6. Register Component 
    - This component is responsible for rendering the registration form. It includes input fields for the user's first name, last name, city, country, gender, age, breed, image,  email,  password, additional info and a "Register" button that submits the form to Firebase for registration.
7. EditProfile Component 
    - This component is responsible for rendering a form that allows the user to edit their profile information. It includes input fields for the user's first name, last name, city, country, gender, age, breed, image,  email,  password, additional info and a "Edit" button that submits the form to Firebase for editing the user's profile.
8. Details Component 
    - This component gets the id of the users with useParams() and renders their name, profile picture, bio, and a "Message" button. If the user is the logged-in user, a "Delete" button is also displayed that allows the user to delete their profile. The "Message" button redirects the user to the Chat component where they can message the selected user.
9. Blog Component 
    - This component is responsible for rendering a list of all blog posts in the application. It receives a list of blog posts as props and passes each post to the FeaturedPost component for rendering. Each post is displayed as a card with the post title, author, date, and a "Continue reading..." button. The "Continue reading..." button redirects the user to the DetailsPost component where they can view the full post.
10. DetailsPost Component
    - This component is responsible for rendering the detailed information for a blog post. It displays the post title, content, and author information. If the logged-in user is the author of the post, they have the option to edit or delete it. If the logged-in user is not the author of the post, the user can like the post.
11. EditPost 
    - This component is responsible for rendering the form where users can edit an existing blog post if he is the creator. It pre-fills the form with the existing post data and handles the logic for submitting the edited post to Firebase.
12. LikeButton Component
    - This component is responsible for the logic of liking a button. When the user likes a button, a "likes" collection is created in Firebase, containing an ID for the like, likes count and likedBy array, where we will keep the ID's of the people who liked the post. Then a Dislike button is displayed and if the user clicks it, his ID is removed from the likedBy array, and the count of likes for the specific post is decremented.
13. ChatBox Component 
    - This is the main component that renders the Sidebar and Chat components. It manages the state for the current user and the user with whom they are chatting. 
14. Sidebar Component 
    - This component renders the Navbar, Searchbar, and Chats Components. The Navbar displays information about the current user, such as their photo and first name, and includes a Home button that redirects to the Home Component.
15. Navbar Component 
    - This component displays the photo and first name of the current user, and includes a Home button that redirects to the Home Component.
16. Searchbar.js 
    - This component handles searching for other users and adding them to the chats collection. When the user enters the name of another user, the component searches the Firebase database for that user and displays their photo and name.
17. Chats.js 
    - This component shows the last message between the current user and each user they are chatting with. It retrieves this information from the Firebase database.
18. Chat.js 
    - This component displays the name of the user the current user is chatting with. It includes the Messages and InputMessage components.
19. Messages.js 
    - This component displays all the messages between the current user and the user they are chatting with. It retrieves this information from the Firebase database and displays each message in the form of a Message Component.
20. Message.js 
    - This component displays an individual message and allows the user to edit or delete the message if they are the one who sent it.
21. InputMessage.js 
    - This component handles the logic for entering a new message. When the user enters a new message, it updates the "chats" collection in the Firebase database by adding a new message. It also updates the last message in the "userChats" collection.

