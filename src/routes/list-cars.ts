import express from 'express'
import { PrismaClient } from '@prisma/client'
import authMiddleware from '../middleware/index.js'

const prisma = new PrismaClient()

const router = express()

type User = {
  id: string
}

router.get('/', authMiddleware, async function (req, res) {
  // eslint-disable-next-line dot-notation
  const { id: userId } = req['decoded'] as User

  try {
    const findCars = await prisma.cars.findMany({
      where: {
        userId,
      },
    })

    if (!findCars) {
      return res
        .status(400)
        .send({ error: true, message: 'Não existem carros' })
    }

    res.status(200).send(findCars)
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, message: 'O Login de usuário falhou.' })
  }
})

export default router
