import { Optional } from "sequelize"

export interface CarAttributes {
    id: number
    model: string
    brand: string
    color: string
    year: number
    plate: string
    dailyRate: number
    status: 'AVAILABLE' | 'UNAVAILABLE'
}

export interface CarCreationAttributes extends Optional<CarAttributes, 'id' | 'status'> {}