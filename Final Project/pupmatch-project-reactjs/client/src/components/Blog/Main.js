import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";

function Main(props) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {/* {posts.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))} */}
      <h1>5 Tips for Successfully Training Your New Puppy</h1>
      <ul>
        <li>Choose a Training Method</li>
        <li>Decide on a Training Schedule</li>
        <li>Set a Training Frequency</li>
        <li>Basic Commands</li>
        <li>Set Boundaries and Rules</li>
      </ul>
      <p>
        Congratulations on the arrival of your new furry friend! Bringing a
        puppy into your home is a big responsibility, but it's also an
        incredibly rewarding experience. One of the first things you'll want to
        do is start training your new pup, and it's important to do so early on
        to set the stage for a well-behaved dog in the future. But where do you
        start?
      </p>
      <h2>Choose a Training Method</h2>
      <p>
        First things first, choose a training method that aligns with your
        values and goals. There are many different approaches to training, from
        positive reinforcement to more punishment-based methods. Consider what
        you want to achieve with your training and choose a method that feels
        comfortable and effective for you.
      </p>
      <h2>Decide on a Training Schedule</h2>
      <p>
        Next, decide on a training schedule. Puppies have short attention spans,
        so it's best to keep training sessions short and sweet.
      </p>
      <h2>Set a Training Frequency</h2>
      <p>
        Start with five to ten minute sessions several times a day, and
        gradually increase the length as your puppy gets older. Keep in mind
        that puppies have a lot of energy, so it's important to provide plenty
        of physical and mental stimulation through play, walks, and training.
      </p>
      <h2>Basic Commands</h2>
      <p>
        Now it's time to choose some basic commands to work on. "Sit," "stay,"
        and "come" are great starters, as they can be useful in a variety of
        situations. Start with one command at a time, and use treats and praise
        to reinforce good behavior. As your puppy starts to understand the
        commands, gradually fade out the treats and rely more on praise.
      </p>
      <h2>Set Boundaries and Rules</h2>
      <p>
        It's also important to set boundaries and rules for your puppy from the
        start. Decide on a designated spot for your puppy to relieve themselves,
        and establish rules for where they are and aren't allowed to go in the
        house. Consistency is key, so make sure everyone in the household is on
        the same page when it comes to enforcing the rules.
      </p>
      <p>
        Training your new puppy can be a lot of work, but it's also a lot of
        fun! Just be patient, stay consistent, and above all, have a good sense
        of humor. After all, puppies are bound to get into a bit of mischief now
        and then. Happy training!
      </p>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
