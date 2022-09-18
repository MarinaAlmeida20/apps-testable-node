import { Appointment } from "../entities/appointment";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  //   save(appointment: Appointment): Promise<void>;

  // to fins a date with same start and end - clashing dates
  findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null>;
}

// all of it goes to in-memory
