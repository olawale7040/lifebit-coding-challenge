import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Header from "src/components/Header";

const App = () => {
  const routing = useRoutes(routes);
  return (
    <div className="page-wrapper">
      <Header />
      <>{routing}</>
    </div>
  );
};

export default App;
