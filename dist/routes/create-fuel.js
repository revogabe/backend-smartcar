import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/index.js';
const prisma = new PrismaClient();
const router = express();
router.post('/:id', authMiddleware, async function (req, res) {
    const { price, quantity, typeFuel } = req.body;
    const { id } = req.params;
    try {
        const findCar = await prisma.cars.findUnique({
            where: {
                id,
            },
        });
        if (!findCar) {
            return res
                .status(400)
                .send({ error: true, message: 'Esse carro não está cadastrado.' });
        }
        const supply = await prisma.supply.create({
            data: {
                typeFuel,
                price,
                quantity,
                carsId: id,
            },
        });
        res.status(200).send(supply);
    }
    catch (err) {
        return res
            .status(400)
            .send({ error: err, message: 'O registro de supply falhou.' });
    }
});
export default router;
//# sourceMappingURL=create-fuel.js.map