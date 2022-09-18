// create a fake data base

import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointments-repository";
import { areIntervalsOverlapping } from "date-fns";

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find((appointment) => {
      return areIntervalsOverlapping(
        // true - if existe clashing date and false - if not
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt }, // what i want to compare
        { inclusive: true } // to include less and equal
      );
    });

    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }

  // async save(appointment: Appointment): Promise<void> {
  // need id
  // }
}
