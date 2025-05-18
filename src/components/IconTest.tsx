'use client';

import React from 'react';
import { Home, Building, Calendar, User, Settings, Menu } from 'lucide-react';

const IconTest = () => {
  return (
    <div className="p-8 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Lucide Icon Test</h2>
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <Home className="w-8 h-8 text-blue-500" />
          <span className="mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <Building className="w-8 h-8 text-green-500" />
          <span className="mt-1">Building</span>
        </div>
        <div className="flex flex-col items-center">
          <Calendar className="w-8 h-8 text-red-500" />
          <span className="mt-1">Calendar</span>
        </div>
        <div className="flex flex-col items-center">
          <User className="w-8 h-8 text-purple-500" />
          <span className="mt-1">User</span>
        </div>
        <div className="flex flex-col items-center">
          <Settings className="w-8 h-8 text-yellow-500" />
          <span className="mt-1">Settings</span>
        </div>
        <div className="flex flex-col items-center">
          <Menu className="w-8 h-8 text-gray-500" />
          <span className="mt-1">Menu</span>
        </div>
      </div>
    </div>
  );
};

export default IconTest;
