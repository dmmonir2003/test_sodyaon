import { Request, Response, NextFunction } from 'express';
import { genAI } from '../../config/gemini';
import { Product } from '../product/product.model';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';

// Fallback logic for local development if Gemini key is missing/mock
const isMockKey = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock-gemini-key';

// 1. Gift Finder
export const getGiftSuggestions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { ageRange, categoryId, budget } = req.body;

  if (!ageRange) {
    return next(new ApiError(400, 'Age range is required'));
  }

  // 1. Lookup products matching filters in DB
  const queryObj: any = {};
  if (categoryId) queryObj.categoryId = Number(categoryId);
  if (ageRange) queryObj.ageRange = ageRange;
  if (budget) queryObj.price = { $lte: Number(budget) };

  const matchingProducts = await Product.find(queryObj).limit(3);

  if (isMockKey) {
    // Generate simulated AI advice
    const mockAdvice = `Based on your request for a gift suitable for age ${ageRange}, under ${budget || 'any'} BDT, we suggest choosing interactive toys. Educational toys support cognitive development and improve problem-solving skills.`;
    return res.status(200).json({
      success: true,
      data: {
        advice: mockAdvice,
        suggestedProducts: matchingProducts,
      },
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const productListText = matchingProducts
      .map((p) => `- ID: ${p.numericId}, Name: ${p.name}, Price: ${p.price} BDT, Description: ${p.description}`)
      .join('\n');

    const prompt = `
      You are an expert children's gift consultant.
      The user is looking for a gift for a child in the age range of "${ageRange}" with a budget of "${budget || 'unlimited'} BDT".
      Here are some available products from our store:
      ${productListText}

      Please write a short, friendly, expert paragraph advising the parent on what to choose and why (based on developmental psychology/play research). Focus on why the listed products (or types of toys) are beneficial. Keep the output under 150 words.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      success: true,
      data: {
        advice: text.trim(),
        suggestedProducts: matchingProducts,
      },
    });
  } catch (error: any) {
    return next(new ApiError(500, `Gemini API Error: ${error.message}`));
  }
});

// 2. Parenting Assistant
export const askParentingAssistant = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { childAge, developmentalFocus, question } = req.body;

  if (!question) {
    return next(new ApiError(400, 'Question is required'));
  }

  if (isMockKey) {
    const mockAdvice = `For a ${childAge || 'young'} child focusing on ${developmentalFocus || 'general play'}, it is essential to support sensory and motor explorations. Engage in open-ended stacking activities and reading picture books together to boost vocabulary.`;
    return res.status(200).json({
      success: true,
      data: {
        answer: mockAdvice,
        suggestedActivities: [
          'Interactive storytelling with animated expressions.',
          'Blocks and geometric shape sorting to build spatial skills.',
        ],
      },
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      You are Sodayon's AI Parenting Assistant, a child development expert.
      Child Profile: Age: "${childAge || 'Unknown'}", Focus: "${developmentalFocus || 'General development'}".
      Question: "${question}"

      Please provide an empathetic, professional answer with actionable parenting tips and 2 bullet-pointed play/educational activities. Format the response clearly. Keep it under 200 words.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      success: true,
      data: {
        answer: text.trim(),
      },
    });
  } catch (error: any) {
    return next(new ApiError(500, `Gemini API Error: ${error.message}`));
  }
});

// 3. Product Compare
export const compareProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { productIds } = req.body; // Expects array of 2 IDs

  if (!Array.isArray(productIds) || productIds.length < 2) {
    return next(new ApiError(400, 'At least 2 product IDs are required for comparison'));
  }

  const products = await Product.find({
    $or: [
      { _id: productIds[0].match(/^[0-9a-fA-F]{24}$/) ? productIds[0] : null },
      { _id: productIds[1].match(/^[0-9a-fA-F]{24}$/) ? productIds[1] : null },
      { numericId: isNaN(Number(productIds[0])) ? -1 : Number(productIds[0]) },
      { numericId: isNaN(Number(productIds[1])) ? -1 : Number(productIds[1]) },
    ].filter(Boolean),
  });

  if (products.length < 2) {
    return next(new ApiError(404, 'One or both products could not be found in catalog'));
  }

  const p1 = products[0];
  const p2 = products[1];

  if (isMockKey) {
    return res.status(200).json({
      success: true,
      data: {
        comparison: `Comparing "${p1.name}" and "${p2.name}":
        - Price: "${p1.name}" costs ${p1.price} BDT vs "${p2.name}" at ${p2.price} BDT.
        - Age Appropriateness: "${p1.name}" is best for ${p1.ageRange || 'all ages'} vs "${p2.name}" for ${p2.ageRange || 'all ages'}.
        - Key Benefit: "${p1.name}" highlights "${p1.tags.join(', ')}" whereas "${p2.name}" centers on "${p2.tags.join(', ')}".`,
      },
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Compare these two toys/products:
      Product 1: Name: "${p1.name}", Price: "${p1.price} BDT", Age Range: "${p1.ageRange}", Tags: "${p1.tags.join(', ')}", Description: "${p1.description}"
      Product 2: Name: "${p2.name}", Price: "${p2.price} BDT", Age Range: "${p2.ageRange}", Tags: "${p2.tags.join(', ')}", Description: "${p2.description}"

      Please generate a comparison report highlighting:
      1. Price difference.
      2. Developmental suitability difference (which age group benefits from which toy).
      3. Key verdict on which one a parent should buy based on cognitive vs physical play goals.
      Keep it brief and well-formatted. Under 150 words.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      success: true,
      data: {
        comparison: text.trim(),
      },
    });
  } catch (error: any) {
    return next(new ApiError(500, `Gemini API Error: ${error.message}`));
  }
});
