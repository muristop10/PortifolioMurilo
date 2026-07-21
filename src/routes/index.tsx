import { createBrowserRouter } from "react-router-dom";
import Template from "../Pages/template";
import Home from "../Pages/home";
import PersonalInterests from "../Pages/personalInterests";
import Galery from "../Pages/galery";
import Projects from "../Pages/Projects";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/interesses-pessoais',
            element: <PersonalInterests />
        },
        {
            path: '/galeria',
            element: <Galery />
        },
        {
            path: '/projetos',
            element: <Projects />
        },

    ]
  }
]);