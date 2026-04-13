import React, { useContext, useMemo } from "react";
import { ReadsBookContext } from "../../context/BookContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PageToRead = () => {
  const contextValue = useContext(ReadsBookContext);
  const { storedBook = [] } = contextValue || {};

  // ১. পেজ নম্বর অনুযায়ী ডাটা প্রস্তুত
  const pageData = useMemo(() => {
    return storedBook.map((book) => ({
      name:
        book.bookName?.length > 15 ?
          book.bookName.slice(0, 15) + "..."
        : book.bookName || "Unknown",
      pages: book.totalPages || 0,
      rating: book.rating || 0,
    }));
  }, [storedBook]);

  // ২. ক্যাটাগরি অনুযায়ী ডাটা
  const categoryData = useMemo(() => {
    const categories = {};
    storedBook.forEach((book) => {
      const category = book.category || "Uncategorized";
      categories[category] = (categories[category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [storedBook]);

  // ৩. রেটিং অনুযায়ী ডাটা
  const ratingData = useMemo(() => {
    const ratingGroups = {
      "4.5-5.0": 0,
      "4.0-4.5": 0,
      "3.5-4.0": 0,
      "3.0-3.5": 0,
      "Below 3.0": 0,
    };

    storedBook.forEach((book) => {
      const rating = book.rating || 0;
      if (rating >= 4.5) ratingGroups["4.5-5.0"]++;
      else if (rating >= 4.0) ratingGroups["4.0-4.5"]++;
      else if (rating >= 3.5) ratingGroups["3.5-4.0"]++;
      else if (rating >= 3.0) ratingGroups["3.0-3.5"]++;
      else ratingGroups["Below 3.0"]++;
    });

    return Object.entries(ratingGroups).map(([range, count]) => ({
      range,
      count,
    }));
  }, [storedBook]);

  // রঙের জন্য array
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  // যদি কোনো বই না থাকে
  if (storedBook.length === 0) {
    return (
      <div className="text-white page-width fade-up">
        <div className="text-center py-16 px-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="text-6xl mb-2">📊</div>
          <h3 className="text-xl font-semibold text-white/80">
            No Data to Display
          </h3>
          <p className="text-white/40">
            Add some books to your reading list to see statistics!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-5 xl:mx-0">
      <div className="text-white page-width  fade-up">
        {/* হেডার */}
        <div className="p-8 bg-white/5 text-center rounded-2xl mb-8">
          <h4 className="font-bold text-xl sm:text-2xl md:text-3xl bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Reading Statistics
          </h4>
          <p className="text-white/60 mt-2">
            Total Books Read: {storedBook.length}
          </p>
        </div>

        {/* চার্ট গুলো গ্রিড আকারে */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ১. বার চার্ট (পেজ সংখ্যা) */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Pages per Book
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="pages" fill="#3b82f6" name="Total Pages" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ২. পাই চার্ট (ক্যাটাগরি) */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Books by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ৩. বার চার্ট (রেটিং ডিস্ট্রিবিউশন) */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Rating Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="range" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                />
                <Bar dataKey="count" fill="#f59e0b" name="Number of Books" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ৪. লাইন চার্ট (পেজ vs রেটিং) */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Pages vs Rating
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="pages"
                  stroke="#3b82f6"
                  name="Pages"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="rating"
                  stroke="#f59e0b"
                  name="Rating"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* সারাংশ কার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-blue-400">
              {storedBook.length}
            </div>
            <div className="text-white/60">Total Books</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="text-3xl mb-2">📄</div>
            <div className="text-2xl font-bold text-green-400">
              {storedBook.reduce(
                (sum, book) => sum + (book.totalPages || 0),
                0,
              )}
            </div>
            <div className="text-white/60">Total Pages</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-yellow-400">
              {(
                storedBook.reduce((sum, book) => sum + (book.rating || 0), 0) /
                  storedBook.length || 0
              ).toFixed(1)}
            </div>
            <div className="text-white/60">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageToRead;
