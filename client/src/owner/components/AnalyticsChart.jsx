/**
 * ANALYTICS CHART COMPONENT
 * Display sales, revenue, and customer data
 */

import React from 'react';
import { FaChart

Bar, FaTrendingUp, FaUsers, FaShoppingCart } from 'react-icons/fa';

const AnalyticsChart = ({ stats = {} }) => {
  const {
    totalSales = 0,
    totalRevenue = 0,
    totalCustomers = 0,
    totalOrders = 0,
  } = stats;

  const cards = [
    {
      title: 'Total Sales',
      value: `Rs ${totalRevenue.toLocaleString()}`,
      icon: <FaTrendingUp className="text-3xl text-green-500" />,
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: <FaShoppingCart className="text-3xl text-blue-500" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: <FaUsers className="text-3xl text-purple-500" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Avg Order Value',
      value: `Rs ${totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}`,
      icon: <FaChartBar className="text-3xl text-gold" />,
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} p-6 rounded-lg shadow-md border-l-4 border-l-gold`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </div>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsChart;
