import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    Link,
} from "react-router-dom";
import Resgistration from "./pages/Resgistration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForGotPassword from "./pages/ForGotPassword";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Resgistration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/forgotpassword" element={<ForGotPassword />}></Route>
        </Route>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
