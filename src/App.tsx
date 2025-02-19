import { Search } from "./components";
import "./App.css";
import "./variables.css";

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
      <footer>
        <p>Created by Sam R. Sexton</p>
        <ul>
          <li>
            <a href="https://srsexton94.github.io/">Portfolio</a>
          </li>
          <li>
            <a href="https://github.com/srsexton94">Github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/sam-sexton/">LinkedIn</a>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default App;
