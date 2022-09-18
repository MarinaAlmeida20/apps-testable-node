import { Appointment } from "../entities/appointment";

// data i need
interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

// Response after data
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  // receive => request with this return => CreateAppointmentRequest
  // give back/return => Promise(because it is asynchronous) => CreateAppointmentResponse

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

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
