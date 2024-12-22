const TrendsList = ({ trends }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
        <ul className="space-y-2">
          {trends.map((trend, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-gray-700">{trend}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TrendsList;