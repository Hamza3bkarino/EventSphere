import { useEffect, useState } from "react";
import { MdSearch, MdCategory, MdAttachMoney, MdDateRange } from "react-icons/md";

export default function ModernFilter({ events, onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [date, setDate] = useState("");

  const categories = [...new Set(events.map(e => e.category))];

  useEffect(() => {
    let filtered = [...events];

    if (search) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(e => e.category === category);
    }

    if (minPrice) filtered = filtered.filter(e => +e.price >= +minPrice);
    if (maxPrice) filtered = filtered.filter(e => +e.price <= +maxPrice);

    if (date) filtered = filtered.filter(e => e.date === date);

    onFilter(filtered);
  }, [search, category, minPrice, maxPrice, date, events, onFilter]);

  return (
    <div className="mb-8 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-5 border border-[#73301c]/20 w-[90%] mx-auto ">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">

        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#73301c]">
          <MdSearch className="text-[#73301c] text-xl" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#73301c]">
          <MdCategory className="text-[#73301c] text-xl" />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#73301c]">
          <MdAttachMoney className="text-[#73301c] text-xl" />
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#73301c]">
          <MdAttachMoney className="text-[#73301c] text-xl" />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#73301c]">
          <MdDateRange className="text-[#73301c] text-xl" />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

      </div>
    </div>
  );
}
