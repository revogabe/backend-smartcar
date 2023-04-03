import express from 'express'
import { PrismaClient } from '@prisma/client'
import authMiddleware from '../middleware/index.js'

const prisma = new PrismaClient()

const router = express()

type Cars = {
  id: string
}

type Fuel = {
  id: string
}

router.delete('/:id', authMiddleware, async function (req, res) {
  // eslint-disable-next-line dot-notation
  const { id } = req.body as Fuel
  const { id: carsId } = req.params as Cars

  try {
    const findCars = await prisma.cars.findUnique({
      where: {
        id: carsId,
      },
    })

    if (!findCars) {
      return res
        .status(400)
        .send({ error: true, message: 'Erro ao excluir combustivel.' })
    }

    const supply = await prisma.supply.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    })

    res.status(200).send(supply)
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, message: 'O registro de carro falhou.' })
  }
})

export default router
