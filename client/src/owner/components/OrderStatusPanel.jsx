/**
 * ORDER STATUS PANEL COMPONENT
 * Update order status from Pending → Confirmed → Shipped → Delivered
 */

import React, { useState } from 'react';
import { FaBox, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';

const OrderStatusPanel = ({ order, onStatusChange, loading = false }) => {
  const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
  const statusIcons = {
    Pending: <FaClock className="text-yellow-500" />,
    Confirmed: <FaCheckCircle className="text-blue-500" />,
    Shipped: <FaTruck className="text-purple-500" />,
    Delivered: <FaBox className="text-green-500" />,
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(order._id, newStatus);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">Order #{order._id?.slice(-8)}</p>
          <p className="text-lg font-semibold">{order.user?.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gold">Rs {order.totalPrice}</p>
        </div>
      </div>

      {/* Status Progress */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {statuses.map((status, index) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={loading}
            className={`p-3 text-center rounded-lg transition ${
              order.orderStatus === status
                ? 'bg-gold text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className="flex justify-center mb-1">
              {statusIcons[status]}
            </div>
            <p className="text-xs font-semibold">{status}</p>
          </button>
        ))}
      </div>

      {/* Order Items */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="font-semibold mb-3">Items:</p>
        {order.products?.map((item, index) => (
          <div key={index} className="flex justify-between text-sm py-1 border-b last:border-b-0">
            <span>{item.name} × {item.quantity}</span>
            <span className="font-semibold">Rs {item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusPanel;
