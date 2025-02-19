import "./App.css";
import { Search } from "./components";

function App() {
  return (
    <>
      <header>
        <h1>
          <span aria-hidden="true">🍿</span>
          &nbsp;Popcorn Pal&nbsp;
          <span aria-hidden="true">🎬</span>
        </h1>
        <p>Find your new favorite</p>
      </header>
      <main>
        <Search />
      </main>
    </>
  );
}

export default App;
