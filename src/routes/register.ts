import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { generateToken } from '../services/auth.js'

const prisma = new PrismaClient()

const router = express()

type User = {
  name: string
  cpf: string
  password: string
}

router.post('/', async function (req, res) {
  const { cpf, password, name } = req.body as User

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (findUser) {
      return res
        .status(400)
        .send({ error: true, message: 'Esse usuário já existe.' })
    }

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10)

    // now we set user password to hashed password
    const passwordHash = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        password: passwordHash,
      },
    })

    const token = generateToken(user);

    res.status(200).send({ user, token, message: 'Usuário registrado com sucesso.' })
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, message: 'O registro de usuário falhou.' })
  }
})

export default router
