import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';

import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Pupmatch Blog',
  description:
    "Welcome to our Pupmatch Blog! Share your amazing stories, hilarious experiences, and heartwarming moments with your furry best friend. Join our community of dog lovers and discover the joys of being a dog parent. Let's bark together and spread the love for our four-legged companions!",
  image: 'https://source.unsplash.com/random/?Dog',
  imageText: 'main image description',
  linkText: 'Create Post',
};

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageLabel: 'Image Text',
//   },
// ];

// const posts = [post1, post2, post3];
const posts = [post1];
console.log(post1);

const sidebar = {
  title: 'About',
  description:
    'Welcome to Pupmatch, the ultimate social platform for dog lovers! Whether you want to find new furry friends for your pup, chat with fellow dog enthusiasts, or share funny and heartwarming stories about your four-legged companion, Pupmatch is the perfect place for you. Join our vibrant community and unleash the joy of dog ownership today!',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
  ],
};

const theme = createTheme();

export default function Blog({
  featuredPosts,
  setFeaturedPosts,
  postsCollectionRef
}) {
  // const [featuredPosts, setFeaturedPosts] = useState([]);

  // const postsCollectionRef = collection(db, 'blogPosts');
  // console.log(postsCollectionRef);

  useEffect(() => {
    const getPosts = async() => {
      const data = await getDocs(postsCollectionRef);
      setFeaturedPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getPosts();

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} setFeaturedPosts={setFeaturedPosts} />
            ))}
            
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts} />
            {/* <Main title="From the firehose" /> */}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Pupmatch - Connecting dogs and their humans."
      />
    </ThemeProvider>
  );
}