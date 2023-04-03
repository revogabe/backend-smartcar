import express from 'express'
import { PrismaClient } from '@prisma/client'
import authMiddleware from '../middleware/index.js'

const prisma = new PrismaClient()

const router = express()

type User = {
  cpf: string
  name: string
  password: string
}

router.put('/', authMiddleware, async function (req, res) {
  // eslint-disable-next-line dot-notation
  const { cpf } = req['decoded'] as User
  const { name, password } = req.body as User

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!findUser) {
      return res
        .status(400)
        .send({ error: true, message: 'Esse usario nao existe.' })
    }

    const updateTeste = await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        name,
        password,
      },
    })

    res.status(200).send({ findUser, updateTeste })
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, message: 'O Login de usuário falhou.' })
  }
})

export default router
