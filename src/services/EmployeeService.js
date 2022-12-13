import axios from "axios";
import * as Constants from "./Constants";
//const EMPLOYEE_API_BASE_URL = "http://localhost:8086/api/v1/employees";

class EmployeeService {
  getEmployees() {
    return axios.get(Constants.EMPLOYEE_API_BASE_URL);
  }

  addEmployee(employee) {
    return axios.post(Constants.EMPLOYEE_API_BASE_URL, employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(Constants.EMPLOYEE_API_BASE_URL + employeeId);
  }

  updateEmployee(employee, employeeId) {
    return axios.put(
      Constants.EMPLOYEE_API_BASE_URL + employeeId,
      employee
    );
  }

  deleteEmployee(employeeId) {
    return axios.delete(Constants.EMPLOYEE_API_BASE_URL + employeeId);
  }
}

export default new EmployeeService();
