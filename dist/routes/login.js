import express from 'express';
import { PrismaClient } from '@prisma/client';
import { comparePasswords, generateToken } from '../services/auth.js';
import { exclude } from '../utils/index.js';
import { validateCPF } from '../utils/validation-cpf.js';
const prisma = new PrismaClient();
const router = express();
router.post('/', async function (req, res) {
    const { cpf, password } = req.body;
    const isValidateCpf = validateCPF(cpf);
    if (!isValidateCpf) {
        return res.status(400).send({ error: true, message: 'CPF inválido.' });
    }
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                cpf,
            },
        });
        if (!findUser) {
            return res
                .status(400)
                .send({ error: true, message: 'Esse usario nao existe.' });
        }
        const validPassword = await comparePasswords(password, findUser.password);
        if (validPassword) {
            const token = generateToken({
                id: findUser.id,
                cpf: findUser.cpf,
                name: findUser.name,
            });
            const userWithoutPassword = exclude(findUser, ['password']);
            res.status(200).send({ ...userWithoutPassword, token });
        }
        else {
            return res.status(400).send({ error: true, message: 'Senha incorreta.' });
        }
    }
    catch (err) {
        return res
            .status(400)
            .send({ error: err, message: 'O Login de usuário falhou.' });
    }
});
export default router;
//# sourceMappingURL=login.js.map