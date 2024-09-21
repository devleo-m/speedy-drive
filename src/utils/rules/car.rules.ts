import Car from "../../models/car.model";
import Rental from "../../models/rental.model";
import { Op } from "sequelize";

export class CarRules {
  static isAvailable(car: Car): boolean {
    return car.status === "AVAILABLE";
  }

  // Verifica se existe sobreposição de datas de aluguel
  static async hasOverlappingRentals(carId: number, startDate: Date, endDate: Date): Promise<boolean> {
    const overlappingRentals = await Rental.findOne({
      where: {
        carId,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          {
            startDate: { [Op.lte]: startDate },
            endDate: { [Op.gte]: endDate },
          },
        ],
      },
    });

    return !!overlappingRentals; // Retorna true se existir sobreposição
  }

  static calculateRentalPrice(car: Car, days: number): number {
    return car.dailyRate * days;
  }
}
