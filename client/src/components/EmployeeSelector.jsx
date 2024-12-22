const EmployeeSelector = ({ selectedEmployee, onEmployeeChange }) => {
    const employeeTypes = {
      1: "High Performer",
      2: "Declining Performer",
      3: "Improving Performer",
      4: "Average Performer",
      5: "Inconsistent Performer",
      6: "High Performer II",
      7: "Improving Performer II",
      8: "Declining Performer II",
      9: "Average Performer II",
      10: "Inconsistent Performer II"
    };
  
    return (
      <div className="mb-6">
        <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
          Select Employee
        </label>
        <select
          id="employee"
          value={selectedEmployee}
          onChange={(e) => onEmployeeChange(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {Object.entries(employeeTypes).map(([id, type]) => (
            <option key={id} value={id}>
              Employee {id} - {type}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default EmployeeSelector;