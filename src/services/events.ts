import { SAMPLE_EVENTS } from '../data/sampleData';
import { Event, EventRegistration } from '../types';

let events = [...SAMPLE_EVENTS];
let registrations: EventRegistration[] = [];

export async function getEvents(): Promise<Event[]> {
  return events;
}

export async function getEventById(id: string): Promise<Event | null> {
  const event = events.find(e => e.id === id);
  return event || null;
}

export async function registerForEvent(eventId: string, profileId: string): Promise<void> {
  const event = await getEventById(eventId);
  if (!event) throw new Error('Event not found');
  
  if (event.currentParticipants >= event.maxParticipants) {
    throw new Error('Event is full');
  }

  const existingRegistration = registrations.find(
    r => r.eventId === eventId && r.profileId === profileId
  );
  
  if (existingRegistration) {
    throw new Error('Already registered for this event');
  }

  registrations.push({
    id: crypto.randomUUID(),
    eventId,
    profileId,
    registeredAt: new Date()
  });

  // Update participant count for the event //
  const eventIndex = events.findIndex(e => e.id === eventId);
  events[eventIndex] = {
    ...event,
    currentParticipants: event.currentParticipants + 1
  };
}

export async function cancelEventRegistration(eventId: string, profileId: string): Promise<void> {
  const registration = registrations.find(
    r => r.eventId === eventId && r.profileId === profileId
  );
  
  if (!registration) {
    throw new Error('Registration not found');
  }

  registrations = registrations.filter(r => r.id !== registration.id);

  // Update participant count after cancellation //
  const event = await getEventById(eventId);
  if (event) {
    const eventIndex = events.findIndex(e => e.id === eventId);
    events[eventIndex] = {
      ...event,
      currentParticipants: event.currentParticipants - 1
    };
  }
}