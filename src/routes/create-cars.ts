import express from 'express'
import { PrismaClient } from '@prisma/client'
import authMiddleware from '../middleware/index.js'
import { validarPlaca } from '../utils/validation-plate.js'

const prisma = new PrismaClient()

const router = express()

type User = {
  id: string
}

type Cars = {
  plate: string
  renavam: string
  brand: string
  model: string
  color: string
  year: number
  power: string
}

router.post('/', authMiddleware, async function (req, res) {
  // eslint-disable-next-line dot-notation
  const { id: userId } = req['decoded'] as User
  const { plate, renavam, brand, model, color, year, power } = req.body as Cars

  const isValidate = validarPlaca(plate)

  const isValidateYear = !!(year > 1900 && year < 2023 + 1)

  if (!isValidate) {
    return res.status(400).send({ error: true, message: 'Placa inválida.' })
  }

  if (!isValidateYear) {
    return res.status(400).send({ error: true, message: 'Ano inválido.' })
  }

  try {
    const findCar = await prisma.cars.findUnique({
      where: {
        plate,
      },
    })

    if (findCar) {
      return res
        .status(400)
        .send({ error: true, message: 'Esse carro já está cadastrado.' })
    }

    const cars = await prisma.cars.create({
      data: {
        plate,
        renavam,
        brand,
        model,
        color,
        year,
        power,

        userId,
      },
    })

    res.status(200).send(cars)
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, message: 'O registro de carro falhou.' })
  }
})

export default router
