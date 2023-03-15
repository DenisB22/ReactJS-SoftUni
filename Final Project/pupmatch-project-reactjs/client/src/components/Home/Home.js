export const Home = () => {
  return (
    <section id="welcome-world">
      <div className="welcome-message">
        <h2>Find your dog's perfect match - Pupmatch</h2>
      </div>
      {/* <img src="./images/four_slider_img01.png" alt="hero" /> */}

      <div id="home-page">
        <h1>Latest Puppies</h1>
        
        <div className="game">
          <div className="image-wrap">
            <img src="./images/sweet-puppy.jpg" />
          </div>
          <h3>Ziggy</h3>
          <div className="rating">
            {/* <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span> */}
            <h4>French Bulldog</h4>
          </div>
          <div className="data-buttons">
            <a href="#" className="btn details-btn">
              Details
            </a>
          </div>
        </div>

        <p className="no-articles">No Puppies yet</p>
      </div>
    </section>
  );
};
