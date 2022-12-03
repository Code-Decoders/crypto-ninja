import logo from './logo.svg';
import './App.css';
import Homepage from './pages/homepage/homepage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Playground from './pages/playground/playground';
import { MetaMaskProvider } from "metamask-react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "playground",
    element: <Playground />,
  },
]);


function App() {
  return (
    <MetaMaskProvider>
    <RouterProvider router={router} />
    </MetaMaskProvider>
  );
}

export default App;
