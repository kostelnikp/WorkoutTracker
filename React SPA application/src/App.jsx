import Footer from "./components/ui/Footer";
import NavigationBar from "./components/ui/NavigationBar";
import { Outlet } from "react-router-dom";

function App() {
  const accentColor = "#26585D";

  return (
    <div className="App">
      <NavigationBar accentColor={accentColor} />
      <main>
        <Outlet context={{ accentColor }} />
      </main>
      <Footer accentColor={accentColor} />
    </div>
  );
}

export default App;
