import { BrowserRouter, Route, Routes } from "react-router-dom";
import DownoladPage from "../components/pages/DownloadPage";
import ErrorPage from "../components/pages/ErrorPage";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import NewAcountPage from "../components/pages/NewAcountPage";
import SendPage from "../components/pages/SendPage";
import UserPage from "../components/pages/UserPage";

const PageRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<HomePage />}
        />
        <Route
          path={"/SendPage"}
          element={<SendPage />}
        />
        <Route
          path={"/LoginPage"}
          element={<LoginPage />}
        />
        <Route
          path={"/NewAcountPage"}
          element={<NewAcountPage />}
        />
        <Route
          path={"/UserPage"}
          element={<UserPage />}
        />
        <Route
          path={"/DownloadPage/*"}
          element={<DownoladPage />}
        />
        <Route
          path={"/*"}
          element={<ErrorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRouter;
