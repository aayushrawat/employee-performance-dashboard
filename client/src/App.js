import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChartBarIcon,
  SparklesIcon,
  LightningBoltIcon,
  ClockIcon,
  TrendingUpIcon,
} from '@heroicons/react/outline';
import PerformanceChart from './components/PerformanceChart';
import StatCard from './components/StatCard';
import TrendsList from './components/TrendsList';
import EmployeeSelector from './components/EmployeeSelector';
import EmployeeComparison from './components/EmployeeComparison';

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(1);
  const [predictions, setPredictions] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [predictionsRes, statsRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/v1/predict/employee/${selectedEmployee}`),
          axios.get(`http://localhost:8000/api/v1/stats/employee/${selectedEmployee}`)
        ]);
        setPredictions(predictionsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch employee data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedEmployee]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-red-600 text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Employee Performance Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            AI-powered insights and performance analytics
          </p>
        </div>

        {/* Employee Selector */}
        <EmployeeSelector
          selectedEmployee={selectedEmployee}
          onEmployeeChange={setSelectedEmployee}
        />

        {loading ? (
          // Loading State
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Predicted Velocity"
                value={predictions?.predicted_velocity.toFixed(2)}
                icon={SparklesIcon}
                trend="up"
              />
              <StatCard
                title="Average Velocity"
                value={stats?.average_velocity.toFixed(2)}
                icon={ChartBarIcon}
              />
              <StatCard
                title="Total Story Points"
                value={stats?.total_story_points_completed}
                icon={LightningBoltIcon}
              />
              <StatCard
                title="Sprints Completed"
                value={stats?.number_of_sprints}
                icon={ClockIcon}
              />
            </div>

            {/* Charts and Trends */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Performance History</h3>
                <PerformanceChart
                  historicalPerformance={predictions?.historical_performance || []}
                />
              </div>
              <div className="md:col-span-1">
                <TrendsList trends={predictions?.trends || []} />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Confidence Score
                  </h4>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-500 rounded-full h-4"
                        style={{
                          width: `${(predictions?.confidence_score || 0) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {((predictions?.confidence_score || 0) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Performance Trend
                  </h4>
                  <div className="flex items-center">
                    <TrendingUpIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {stats?.trend || 'Stable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Comparison */}
            <EmployeeComparison />
          </>
        )}
      </div>
    </div>
  );
}

export default App;