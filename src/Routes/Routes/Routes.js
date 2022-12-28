import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Upload from "../../Pages/Home/Upload/Upload";
import Medias from "../../Pages/Medias/Medias";
import Messages from "../../Pages/Messages/Messages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/upload',
                element: <Upload></Upload>
            },
            {
                path: '/media',
                element: <Medias></Medias>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/message',
                element: <Messages></Messages>
            },
        ]
    }
])

export default router;