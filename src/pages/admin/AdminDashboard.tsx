import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { Booking, BookingStatus } from '../../types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { signOut } from 'firebase/auth';
import { LogOut, RefreshCcw, Check, X, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'todos'>('todos');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Booking);
      setBookings(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching bookings: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (booking: Booking, status: BookingStatus) => {
    try {
      await updateDoc(doc(db, 'bookings', booking.id), { status });
      if (status === 'cancelado') {
        // Also remove the slot so someone else can book it
        const slotId = `${booking.date}_${booking.time}`;
        await deleteDoc(doc(db, 'booked_slots', slotId));
      } else if (status === 'confirmado' && booking.status === 'cancelado') {
         // This is complex to recreate the slot, but we can do a simple update
      }
      
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status } : b));
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar status.');
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const filteredBookings = bookings.filter(b => {
    if (filterStatus !== 'todos' && b.status !== filterStatus) return false;
    if (filterDate && b.date !== filterDate) return false;
    return true;
  });

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'solicitado': return 'bg-yellow-100 text-yellow-800';
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-light text-[#4a4a4a]">Agendamentos</h1>
            <p className="text-gray-500">Gerencie os agendamentos da clínica.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:bg-red-50 bg-white px-4 py-2 rounded-lg shadow-sm border border-red-100 transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Sair
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-turquoise-500"
            >
              <option value="todos">Todos</option>
              <option value="solicitado">Solicitado</option>
              <option value="confirmado">Confirmado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-turquoise-500"
            />
            {filterDate && (
              <button 
                onClick={() => setFilterDate('')}
                className="ml-2 text-xs text-red-500 hover:underline"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Carregando agendamentos...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">Nenhum agendamento encontrado com os filtros atuais.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tratamento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{format(parseISO(booking.date), "dd/MM/yyyy")}</div>
                        <div className="text-sm text-gray-500">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                        <div className="text-xs text-gray-500">Feito em {format(new Date(booking.createdAt), "dd/MM HH:mm")}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.phone}</div>
                        {booking.email && <div className="text-sm text-gray-500">{booking.email}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {booking.treatment === 'implantes' ? 'Implantes' : 'Estética'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {booking.status === 'solicitado' && (
                            <>
                              <button 
                                onClick={() => updateStatus(booking, 'confirmado')}
                                className="text-green-600 hover:bg-green-100 p-1.5 rounded-md transition-colors"
                                title="Confirmar"
                              >
                                <Check size={18} />
                              </button>
                              <button 
                                onClick={() => updateStatus(booking, 'cancelado')}
                                className="text-red-600 hover:bg-red-100 p-1.5 rounded-md transition-colors"
                                title="Cancelar (Libera o horário)"
                              >
                                <X size={18} />
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmado' && (
                            <button 
                              onClick={() => updateStatus(booking, 'cancelado')}
                              className="text-red-600 hover:bg-red-100 p-1.5 rounded-md transition-colors"
                              title="Cancelar (Libera o horário)"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
