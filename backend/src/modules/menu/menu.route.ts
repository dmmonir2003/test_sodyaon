import { Router } from 'express';
import * as menuController from './menu.controller';

const router = Router();

// Public route to browse active links
router.get('/', menuController.getMenuItems);

// Administrative CRUD paths
router.post('/', menuController.createMenuItem);
router.patch('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

export default router;
