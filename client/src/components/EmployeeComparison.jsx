import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeComparison = () => {
  const [employeeStats, setEmployeeStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEmployeeStats = async () => {
      try {
        const promises = Array.from({ length: 10 }, (_, i) =>
          axios.get(`http://localhost:8001/api/v1/stats/employee/${i + 1}`)
        );
        const responses = await Promise.all(promises);
        setEmployeeStats(responses.map((res, index) => ({
          id: index + 1,
          ...res.data
        })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee stats:', error);
        setLoading(false);
      }
    };

    fetchAllEmployeeStats();
  }, []);

  if (loading) {
    return <div>Loading comparison data...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Team Performance Comparison</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg Velocity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employeeStats.sort((a, b) => b.average_velocity - a.average_velocity).map((stat) => (
              <tr key={stat.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Employee {stat.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {stat.average_velocity.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {stat.total_story_points_completed}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    stat.trend === 'Improving' ? 'bg-green-100 text-green-800' :
                    stat.trend === 'Declining' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {stat.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeComparison;