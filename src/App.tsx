import NewEditor from "./components/NewEditor";
import { PostContextProvider } from "./context/store";

function App() {
  return (
    <PostContextProvider>
      <div>
        <NewEditor />
      </div>
    </PostContextProvider>
  );
}

export default App;
