import React, { useState } from "react";
import Modal from "react-modal";
import dayjs from "dayjs";

const App = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [tasks, setTasks] = useState({});
  const [modalDate, setModalDate] = useState(null);
  const [taskInput, setTaskInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const startDay = startOfMonth.day();

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const handleOpenModal = (date) => {
    setModalDate(date);
    setTaskInput(tasks[date] || "");
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    setTasks({ ...tasks, [modalDate]: taskInput });
    setIsModalOpen(false);
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="border p-4 bg-transparent"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentDate.date(i).format("YYYY-MM-DD");
      days.push(
        <div
          key={date}
          className="relative border p-4 rounded-lg shadow-md bg-white hover:bg-indigo-100 transition-all duration-300 cursor-pointer group"
          onDoubleClick={() => handleOpenModal(date)}
        >
          <div className="font-bold text-gray-700 group-hover:text-indigo-600 transition-all">
            {i}
          </div>
          {tasks[date] && (
            <div className="flex justify-between items-center mt-2">
              <div
                className="bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md truncate max-w-[100px]"
                title={tasks[date]}
              >
                {tasks[date]}
              </div>
              {/* Pencil Edit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-500 hover:text-indigo-700 transition cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => handleOpenModal(date)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4L20 13M4 8l8-8 8"
                />
              </svg>
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-800 to-zinc-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-zinc-700 p-6 rounded-lg shadow-lg">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Prev
          </button>
          <h2 className="text-2xl font-bold">{currentDate.format("MMMM YYYY")}</h2>
          <button
            onClick={handleNextMonth}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Next
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold text-indigo-300">
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      {/* Modal for Adding/Editing Task */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 animate-slide-in"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add/Edit Task</h2>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter task"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveTask}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
