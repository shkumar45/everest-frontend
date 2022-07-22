import { Route, Navigate, Routes, BrowserRouter } from "react-router-dom";
import ListEmployees from "./components/list-employees/ListEmployees";
import Employee from "./components/employee/Employee";
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import axios from "axios";
import ErrorModal from "./components/UI/ErrorModal";
import { useState } from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";

function App() {
  /***** BEGIN - Global Error Handling for http errors */
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const errorHandler = () => {
    setError(null);
  };

  axios.interceptors.request.use((config) => {
    setIsLoading(true);
    return config;
  }, undefined);

  axios.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response;
    },
    (error) => {
      console.log(error);
      setError({
        title: error.code,
        message: error.message,
      });
      setIsLoading(false);
      return Promise.reject({ ...error });
    }
  );
  /***** END - Global Error Handling for http errors */

  return (
    <Layout>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {isLoading && <LoadingSpinner />}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/employees/list" />} />
          {/* <Route path="/employees/list" element={<ListEmployees />} />
          <Route path="/employees/add" element={<Employee />} />
          <Route path="/employees/edit/:id" element={<Employee />} /> */}
          <Route path="employees">
            <Route path="list" element={<ListEmployees />} />
            <Route path="add" element={<Employee />} />
            <Route path="edit">
              <Route path=":employeeId" element={<Employee />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </Layout>
  );
}

export default App;
