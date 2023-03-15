export const CreatePage = () => {
  return (
    <section id="create-page" className="auth">
      <form id="create">
        <div className="container">
          <h1>Create Dog Profile</h1>
          <label htmlFor="leg-title">Puppy Name:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Puppy name..."
          />

          <label htmlFor="category">Breed:</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter Puppy breed..."
          />

          <label htmlFor="levels">Age:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            placeholder="1"
          />

          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Upload a photo..."
          />

          <label htmlFor="summary">Summary:</label>
          <textarea name="summary" id="summary"></textarea>
          <input className="btn submit" type="submit" value="Create Profile" />
        </div>
      </form>
    </section>
  );
};
