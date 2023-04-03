import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/index.js';
const prisma = new PrismaClient();
const router = express();
router.patch('/:id', authMiddleware, async function (req, res) {
    // eslint-disable-next-line dot-notation
    const { id, typeFuel, quantity, price } = req.body;
    const { id: carsId } = req.params;
    try {
        const findCars = await prisma.cars.findUnique({
            where: {
                id: carsId,
            },
        });
        if (!findCars) {
            return res
                .status(400)
                .send({ error: true, message: 'Erro ao editar combustivel.' });
        }
        const supply = await prisma.supply.update({
            where: {
                id,
            },
            data: {
                typeFuel,
                price,
                quantity,
            },
        });
        res.status(200).send(supply);
    }
    catch (err) {
        return res
            .status(400)
            .send({ error: err, message: 'O registro de carro falhou.' });
    }
});
export default router;
//# sourceMappingURL=update-fuel.js.map