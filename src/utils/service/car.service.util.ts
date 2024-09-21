import carRepositoryImpl from "../../repository/impl/car.repository.impl";
import { CarRules } from "../rules/car.rules";

export class CarService {
    async rentCar(carId: number, days: number) {
        const car = await carRepositoryImpl.findByIdCar(carId);

        if (!car) {
            throw new Error('Carro não encontrado');
        }

        // Verifica se o carro está disponível
        if (!CarRules.isAvailable(car)) {
            throw new Error('Carro indisponível para aluguel');
        }

        // Calcula o valor do aluguel
        const price = CarRules.calculateRentalPrice(car, days);

        // Lógica para criar o aluguel...

        return { price };
    }
}