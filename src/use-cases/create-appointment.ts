import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointments-repository";

// data i need
interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

// Response after data
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  // receive => request with this return => CreateAppointmentRequest
  // give back/return => Promise(because it is asynchronous) => CreateAppointmentResponse

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    // check if has or not the same appointment
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    // save appointment
    await this.appointmentsRepository.create(appointment);

    return appointment;
  }

  // avoid it, because you have no control about what you will receive in request
  //   async execute(
  //     request: CreateAppointmentRequest
  //   ): Promise<CreateAppointmentResponse> {
  //     const appointment = new Appointment(request);

  //     return appointment;
  //   }
}
