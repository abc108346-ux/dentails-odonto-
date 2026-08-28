import React from "react";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, where, getDocs, writeBatch, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format, addDays, startOfToday, isSunday, isSaturday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle2, Loader2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { BookingStatus } from '../types';

function getAvailableTimeSlots(dateStr: string) {
  const date = parseISO(dateStr);
  if (isSunday(date)) return [];
  
  const slots: string[] = [];
  
  // Morning slots 08:00 - 11:30
  for (let h = 8; h <= 11; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    slots.push(`${h.toString().padStart(2, '0')}:30`);
  }

  // Afternoon slots 13:30 - 18:30
  if (!isSaturday(date)) {
    slots.push('13:30');
    for (let h = 14; h <= 18; h++) {
      slots.push(`${h.toString().padStart(2, '0')}:00`);
      if (h !== 18) slots.push(`${h.toString().padStart(2, '0')}:30`);
      if (h === 18) slots.push('18:30'); // Up to 18:30
    }
  }

  return slots;
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const initialTreatment = searchParams.get('tratamento') === 'estetica' ? 'estetica' : 'implantes';

  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState(initialTreatment);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const today = startOfToday();
  const nextDays = Array.from({ length: 14 }).map((_, i) => addDays(today, i + 1)).filter(d => !isSunday(d));

  useEffect(() => {
    if (!selectedDate) return;
    
    setLoadingSlots(true);
    const q = query(collection(db, 'booked_slots'), where('date', '==', selectedDate));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const booked = querySnapshot.docs.map(doc => doc.data().time as string);
      setBookedSlots(booked);
      setLoadingSlots(false);
    }, (error) => {
      console.error(error);
      setLoadingSlots(false);
    });

    setSelectedTime(''); // Reset time when date changes

    return () => unsubscribe();
  }, [selectedDate]);

  const allSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];
  const availableSlots = allSlots.filter(s => !bookedSlots.includes(s));

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !phone) return;

    setSubmitting(true);
    setError('');

    try {
      const batch = writeBatch(db);
      
      const slotId = `${selectedDate}_${selectedTime}`;
      const slotRef = doc(db, 'booked_slots', slotId);
      
      const bookingId = crypto.randomUUID();
      const bookingRef = doc(db, 'bookings', bookingId);

      // We use set for slotRef. Because of our Firestore rules (allow create: if true, but no update for public),
      // this will fail if the slot is already taken!
      batch.set(slotRef, {
        date: selectedDate,
        time: selectedTime,
        status: 'solicitado' as BookingStatus
      });

      batch.set(bookingRef, {
        id: bookingId,
        name,
        phone,
        email: email || null,
        treatment,
        date: selectedDate,
        time: selectedTime,
        status: 'solicitado' as BookingStatus,
        createdAt: Date.now()
      });

      await batch.commit();
      setStep(3); // Success step
    } catch (err: any) {
      console.error(err);
      if (err.code === 'permission-denied') {
        setError('Este horário acabou de ser reservado por outra pessoa. Por favor, escolha outro.');
        setSelectedTime(""); // refresh slots
        setSelectedTime('');
      } else {
        setError('Ocorreu um erro ao processar seu agendamento. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 3) {
    const whatsappMsg = `Olá! Gostaria de agendar uma avaliação na Dentalis. Acabei de solicitar pelo site para o dia ${format(parseISO(selectedDate), 'dd/MM')} às ${selectedTime}.`;
    
    return (
      <div className="w-full bg-white min-h-screen py-24">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-semibold text-[#4a4a4a] mb-4">Agendamento solicitado com sucesso!</h1>
          
          <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-left mt-10 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <p><span className="text-gray-500 text-sm block">Paciente</span> <span className="font-medium text-gray-900">{name}</span></p>
              <p><span className="text-gray-500 text-sm block">Tratamento</span> <span className="font-medium text-gray-900">{treatment === 'implantes' ? 'Implantes Dentários' : 'Estética Odontológica'}</span></p>
              <p><span className="text-gray-500 text-sm block">Data e Horário</span> <span className="font-medium text-gray-900">{format(parseISO(selectedDate), "dd 'de' MMMM", { locale: ptBR })} às {selectedTime}</span></p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">Nossa equipe entrará em contato para confirmar sua consulta.</p>
          
          <a
            href={`https://wa.me/5554981610906?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-8 py-4 bg-[#25D366] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
          >
            Falar com a Dentalis pelo WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-turquoise-500"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-turquoise-500">Agendamento</span>
            <span className="w-8 h-[1px] bg-turquoise-500"></span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-[#4a4a4a] mb-4">Agende sua avaliação</h1>
          <p className="text-[#858688]">Escolha o melhor horário para o seu atendimento.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
          {/* Progress bar */}
          <div className="flex bg-gray-100 h-2">
            <div className="bg-turquoise-500 h-2 transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }} />
          </div>

          <div className="p-6 sm:p-10">
            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleBooking}>
              {step === 1 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                  {/* Treatment Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-4">Qual tratamento você tem interesse?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['implantes', 'estetica'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTreatment(t)}
                          className={cn(
                            "p-4 rounded-2xl border-2 text-left transition-all",
                            treatment === t 
                              ? "border-turquoise-500 bg-turquoise-50/50" 
                              : "border-gray-100 bg-white hover:border-turquoise-200"
                          )}
                        >
                          <span className="block font-medium text-gray-900">
                            {t === 'implantes' ? 'Implantes Dentários' : 'Estética Odontológica'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-4 flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-turquoise-500" />
                      Escolha uma data
                    </label>
                    <div className="flex overflow-x-auto gap-3 pb-4 snap-x no-scrollbar">
                      {nextDays.map(date => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        const isSelected = selectedDate === dateStr;
                        return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => setSelectedDate(dateStr)}
                            className={cn(
                              "flex-shrink-0 snap-start p-4 rounded-2xl border-2 transition-all w-28 text-center",
                              isSelected 
                                ? "border-turquoise-500 bg-turquoise-50/50" 
                                : "border-gray-100 bg-white hover:border-turquoise-200"
                            )}
                          >
                            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">{format(date, 'EEE', { locale: ptBR })}</span>
                            <span className="block text-2xl font-semibold text-[#4a4a4a]">{format(date, 'dd')}</span>
                            <span className="block text-xs text-gray-500 mt-1">{format(date, 'MMM', { locale: ptBR })}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                      <label className="block text-sm font-medium text-gray-900 mb-4 flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-turquoise-500" />
                        Escolha um horário
                      </label>
                      
                      {loadingSlots ? (
                        <div className="flex items-center justify-center p-8 text-gray-400">
                          <Loader2 className="w-6 h-6 animate-spin mr-2" />
                          <span>Carregando horários...</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {availableSlots.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500 p-4 bg-gray-50 rounded-xl">Nenhum horário disponível para esta data.</p>
                          ) : (
                            availableSlots.map(time => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={cn(
                                  "py-3 px-2 rounded-xl border-2 text-sm font-medium transition-all text-center",
                                  selectedTime === time
                                    ? "border-turquoise-500 bg-turquoise-50 text-turquoise-700"
                                    : "border-gray-100 bg-white text-gray-700 hover:border-turquoise-200"
                                )}
                              >
                                {time}
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full py-4 px-6 bg-turquoise-500 hover:bg-turquoise-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-full font-medium transition-colors"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
                  
                  <div className="bg-turquoise-50/50 p-6 rounded-2xl flex justify-between items-center mb-8">
                    <div>
                      <p className="text-xs text-turquoise-700 font-medium uppercase tracking-wider mb-1">Resumo</p>
                      <p className="text-gray-900 font-medium">{format(parseISO(selectedDate), "dd/MM/yyyy")} às {selectedTime}</p>
                    </div>
                    <button type="button" onClick={() => setStep(1)} className="text-sm font-medium text-turquoise-600 hover:underline">
                      Alterar
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-500/20 outline-none transition-all"
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp / Telefone *</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-500/20 outline-none transition-all"
                      placeholder="(54) 90000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail (opcional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-500/20 outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-4 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !name || !phone}
                      className="flex-1 py-4 px-6 bg-turquoise-500 hover:bg-turquoise-600 disabled:bg-turquoise-300 text-white rounded-full font-medium transition-colors flex items-center justify-center"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Confirmando...
                        </>
                      ) : (
                        'Confirmar Agendamento'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
