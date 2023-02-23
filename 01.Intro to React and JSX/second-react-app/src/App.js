
import EventInfo from "./components/EventInfo";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Schedule from "./components/Schedule";
import Speakers from "./components/Speakers";
import Tickets from "./components/Tickets";

function App() {
  return (
    <div>
      <Navigation />
      
      <Header />
      
      <div className="container">

        <EventInfo />
        {/* <!-- Start: Speakers -->  */}
        <Speakers />
        {/* <!-- End: Speakers --> */}
      </div>

      {/* <!-- Start: Tickets --> */}
      <Tickets />
      {/* <!-- End: Tickets -->

      <!-- Start: Schedule --> */}
      <Schedule />
      {/* <!-- End: Schedule --> */}

      {/* <!-- Start: Footer --> */}
      <Footer />
      {/* <!-- End: Footer --> */}
    </div>
  );
}

export default App;
