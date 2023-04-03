import express from 'express'
import { PrismaClient } from '@prisma/client'
import authMiddleware from '../middleware/index.js'
import { exclude } from '../utils/index.js'
// import { comparePasswords, generateToken } from '../services/auth.js'

const prisma = new PrismaClient()

const router = express()

type User = {
  cpf: string
}

router.get('/', authMiddleware, async function (req, res) {
  // eslint-disable-next-line dot-notation
  const { cpf } = req['decoded'] as User

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    const userWithoutPassword = exclude(findUser, ['password'])

    if (!findUser) {
      return res
        .status(400)
        .send({ error: true, message: 'Esse usario nao existe.' })
    }

    res.status(200).send(userWithoutPassword)
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, message: 'O Login de usuário falhou.' })
  }
})

export default router
