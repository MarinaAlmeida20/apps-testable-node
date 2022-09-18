import { describe, it, expect } from "vitest";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointment-repository";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const startsAt = getFutureDate("2022-09-18");
    const endsAt = getFutureDate("2022-09-23");

    const appointmentsRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping dates", async () => {
    const startsAt = getFutureDate("2022-09-18");
    const endsAt = getFutureDate("2022-09-27");

    const appointmentsRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    // creating a new date, in the middle of the appointment lines 25-26
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-09-19"),
        endsAt: getFutureDate("2022-09-23"),
      })
    ).rejects.toBeInstanceOf(Error);

    // start before and finish after
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-09-17"),
        endsAt: getFutureDate("2022-09-29"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
