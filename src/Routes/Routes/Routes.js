import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Upload from "../../Pages/Home/Upload/Upload";
import Login from "../../Pages/Login/Login";
import Medias from "../../Pages/Medias/Medias";
import Details from "../../Pages/Medias/Post/Details/Details";
import Messages from "../../Pages/Messages/Messages";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><Main></Main></PrivateRoute>,
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
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/details/:id',
                loader: async ({params}) => {
                    return fetch(`http://localhost:5000/posts?id=${params.id}`)
                },
                element: <Details></Details>
            },
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
])

export default router;