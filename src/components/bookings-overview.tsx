'use client';
import { useEffect, useState } from 'react';
import { db } from '@/config/firebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { Search, ChevronDown } from 'lucide-react';

type Booking = {
  id?: string;
  name: string;
  email?: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Checked In' | 'Checked Out' | 'Pending' | 'Cancelled';
  amount: number;
};

export default function BookingsOverview() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All Bookings');
  const [form, setForm] = useState<Booking>({
    name: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    status: 'Confirmed',
    amount: 0,
  });

  const fetchBookings = async () => {
    const snapshot = await getDocs(collection(db, 'bookings'));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
    setBookings(data);
  };

  const handleAddBooking = async () => {
    if (!form.name || !form.roomNumber || !form.checkIn || !form.checkOut) return;

    await addDoc(collection(db, 'bookings'), {
      ...form,
      email: `${form.name.toLowerCase().replace(' ', '.')}@example.com`,
      amount: Number(form.amount),
      createdAt: Timestamp.now(),
    });

    setForm({
      name: '',
      roomNumber: '',
      checkIn: '',
      checkOut: '',
      status: 'Confirmed',
      amount: 0,
    });
    setShowForm(false);
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings based on search and filter
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         booking.roomNumber.includes(searchQuery);
    
    if (filter === 'All Bookings') return matchesSearch;
    if (filter === 'Upcoming') return matchesSearch && ['Confirmed', 'Pending'].includes(booking.status);
    if (filter === 'Current') return matchesSearch && booking.status === 'Checked In';
    if (filter === 'Past') return matchesSearch && booking.status === 'Checked Out';
    if (filter === 'Cancelled') return matchesSearch && booking.status === 'Cancelled';
    
    return matchesSearch;
  });

  const statusColors = {
    'Confirmed': 'bg-green-100 text-green-800',
    'Checked In': 'bg-blue-100 text-blue-800',
    'Checked Out': 'bg-gray-100 text-gray-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-primary-foreground text-primary p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-sm text-gray-500">Manage hotel bookings and reservations</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
        >
          {showForm ? 'Close Form' : 'Add Booking'}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All Bookings</option>
            <option>Upcoming</option>
            <option>Current</option>
            <option>Past</option>
            <option>Cancelled</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Add Booking Form */}
      {showForm && (
        <div className="bg-white rounded-lg mb-6 p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New Booking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Guest Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Room Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.roomNumber}
                onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Check In</label>
              <input
                type="date"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Check Out</label>
              <input
                type="date"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Booking['status'] })}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amount (KSh)</label>
              <input
                type="number"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: +e.target.value })}
              />
            </div>
          </div>
          <button
            onClick={handleAddBooking}
            className="mt-4 w-full md:w-auto bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition font-medium"
          >
            Submit Booking
          </button>
        </div>
      )}

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Booking List</h2>
          <p className="text-sm text-gray-500">Manage all hotel bookings and reservations</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <>
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{booking.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{booking.roomNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{booking.checkIn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{booking.checkOut}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">KSh {booking.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-primary/80">...</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-1 pb-3 text-sm text-gray-500" colSpan={7}>
                      {booking.email}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}