import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FiltersProps {
  onApply: (filters: { startDate: Date | null; endDate: Date | null; category: string }) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onApply }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [category, setCategory] = useState<string>("All");

  const applyFilters = () => {
    onApply({ startDate, endDate, category });
  };

  return (
    <div className="my-6 flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-gray-700 font-medium">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Select start date"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="Select end date"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Books">Books</option>
        </select>
      </div>
      <button
        onClick={applyFilters}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition">
        Apply Filters
      </button>
    </div>
  );
};
