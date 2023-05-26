import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Link,
} from "react-router-dom";
import Resgistration from "./pages/Resgistration";


const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Resgistration />}></Route>)
);
function App() {
    return (
      <RouterProvider router={router} />
    );
}

export default App;
