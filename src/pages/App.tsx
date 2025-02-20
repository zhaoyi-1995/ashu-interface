import { useRoutes } from "react-router-dom";
import routes from "@/routes";
function App() {
  const routing = useRoutes(routes)
  console.log(routing)
  return <>
    { routing }
    </>
}

export default App