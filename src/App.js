import { Route, Navigate, Routes, BrowserRouter } from "react-router-dom";
import ListEmployees from "./components/list-employees/ListEmployees";
import AddEmployee from "./components/add-employee/AddEmployee";
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/list-employees" />} />
          <Route path="/list-employees" element={<ListEmployees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
