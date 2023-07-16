import LayoutSideNav from "./layout/LayoutSideNav";
import Routers from "./routers/Routers";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <LayoutSideNav>
        <Routers />
      </LayoutSideNav>
    </BrowserRouter>
  );
};

export default App;
