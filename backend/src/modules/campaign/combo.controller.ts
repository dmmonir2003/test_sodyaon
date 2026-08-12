import { Request, Response, NextFunction } from 'express';
import { ComboTemplate, ComboOrder, ComboItem } from './combo.model';
import { Product } from '../product/product.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Public: Get all active combo templates
export const getActiveComboTemplates = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const templates = await ComboTemplate.find({ isActive: true }).sort('-createdAt');
  res.status(200).json({
    success: true,
    data: templates,
  });
});

// Public: Validate chosen toys against combo template rules
export const validateCombo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { templateId, items } = req.body; // items: Array of { productId, variantSku, quantity }

  if (!templateId || !Array.isArray(items) || items.length === 0) {
    return next(new ApiError(400, 'Template ID and items array are required'));
  }

  const template = await ComboTemplate.findById(templateId);
  if (!template || !template.isActive) {
    return next(new ApiError(404, 'Combo template not found or inactive'));
  }

  // Calculate total item count
  const totalItems = items.reduce((sum, item) => sum + Number(item.quantity), 0);

  if (totalItems < template.minItems) {
    return next(new ApiError(400, `You must select at least ${template.minItems} items for this combo (currently selected ${totalItems})`));
  }

  if (totalItems > template.maxItems) {
    return next(new ApiError(400, `Maximum items limit for this combo is ${template.maxItems} (currently selected ${totalItems})`));
  }

  // Calculate price and build item list details
  let listPriceTotal = 0;
  const itemsDetails = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return next(new ApiError(404, `Product not found with ID ${item.productId}`));
    }

    let unitPrice = product.price;
    if (item.variantSku) {
      const variant = product.variants.find(v => v.sku === item.variantSku);
      if (variant) {
        unitPrice = variant.priceOverride || variant.price;
      }
    }

    const itemTotal = unitPrice * item.quantity;
    listPriceTotal += itemTotal;

    itemsDetails.push({
      productId: product._id,
      variantSku: item.variantSku,
      name: product.nameEn,
      quantity: item.quantity,
      unitPrice,
      totalPrice: itemTotal,
    });
  }

  // Calculate percentage discount
  const discountApplied = Math.round((listPriceTotal * template.discountPct) / 100);
  const finalComboPrice = Math.max(0, listPriceTotal - discountApplied);

  res.status(200).json({
    success: true,
    data: {
      templateId: template._id,
      titleEn: template.titleEn,
      titleBn: template.titleBn,
      minItems: template.minItems,
      maxItems: template.maxItems,
      discountPct: template.discountPct,
      originalPrice: listPriceTotal,
      discountApplied,
      finalComboPrice,
      items: itemsDetails,
    },
  });
});

// Protected: Initialize a combo order bundle during cart updates
export const createComboOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { templateId, items } = req.body;
  const userId = (req as any).user.id;

  const template = await ComboTemplate.findById(templateId);
  if (!template || !template.isActive) {
    return next(new ApiError(404, 'Combo template not found'));
  }

  // Calculate pricing
  let originalPriceSum = 0;
  const validatedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) continue;

    let unitPrice = product.price;
    if (item.variantSku) {
      const variant = product.variants.find(v => v.sku === item.variantSku);
      if (variant) {
        unitPrice = variant.priceOverride || variant.price;
      }
    }

    const itemTotal = unitPrice * item.quantity;
    originalPriceSum += itemTotal;

    validatedItems.push({
      productId: product._id,
      variantId: item.variantSku,
      quantity: item.quantity,
      unitPrice,
    });
  }

  const discountApplied = Math.round((originalPriceSum * template.discountPct) / 100);
  const totalPrice = originalPriceSum - discountApplied;

  // Save combo order bundle log
  const comboOrder = await ComboOrder.create({
    userId,
    templateId,
    totalPrice,
    discountApplied,
    status: 'pending',
  });

  // Save each item
  const itemsToCreate = validatedItems.map(item => ({
    comboOrderId: comboOrder._id,
    productId: item.productId,
    variantId: item.variantId,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  }));

  await ComboItem.insertMany(itemsToCreate);

  res.status(201).json({
    success: true,
    data: comboOrder,
  });
});

// Admin: Create combo offer rules template
export const createComboTemplate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const template = await ComboTemplate.create(req.body);
  res.status(201).json({
    success: true,
    data: template,
  });
});
