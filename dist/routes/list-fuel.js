import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/index.js';
const prisma = new PrismaClient();
const router = express();
router.get('/:id', authMiddleware, async function (req, res) {
    const { id } = req.params;
    console.log(id);
    try {
        const findCar = await prisma.cars.findUnique({
            where: {
                id,
            },
        });
        if (!findCar) {
            return res
                .status(400)
                .send({ error: true, message: 'Este carro não existe' });
        }
        const findSupply = await prisma.supply.findMany({
            where: {
                carsId: id,
            },
        });
        res.status(200).send(findSupply);
    }
    catch (err) {
        return res
            .status(400)
            .send({ error: err, message: 'O Login de usuário falhou.' });
    }
});
export default router;
//# sourceMappingURL=list-fuel.js.map