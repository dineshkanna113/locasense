// This is an autogenerated file from Firebase Studio.
'use server';
/**
 * @fileOverview Estimates the confidence of a location based on signal strength using AI.
 *
 * - estimateLocationConfidence - A function that estimates location confidence.
 * - EstimateLocationConfidenceInput - The input type for the estimateLocationConfidence function.
 * - EstimateLocationConfidenceOutput - The return type for the estimateLocationConfidence function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const EstimateLocationConfidenceInputSchema = z.object({
  rssi: z.number().describe('The Received Signal Strength Indication (RSSI) value.'),
  deviceName: z.string().describe('The name of the Bluetooth device.'),
});
export type EstimateLocationConfidenceInput = z.infer<
  typeof EstimateLocationConfidenceInputSchema
>;

const EstimateLocationConfidenceOutputSchema = z.object({
  confidenceLevel: z
    .string()
    .describe(
      'The estimated confidence level of the location, can be high, medium, or low.'
    ),
  reason: z.string().describe('The reasoning behind the confidence level estimation.'),
});
export type EstimateLocationConfidenceOutput = z.infer<
  typeof EstimateLocationConfidenceOutputSchema
>;

export async function estimateLocationConfidence(
  input: EstimateLocationConfidenceInput
): Promise<EstimateLocationConfidenceOutput> {
  return estimateLocationConfidenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateLocationConfidencePrompt',
  input: {
    schema: z.object({
      rssi: z.number().describe('The Received Signal Strength Indication (RSSI) value.'),
      deviceName: z.string().describe('The name of the Bluetooth device.'),
    }),
  },
  output: {
    schema: z.object({
      confidenceLevel:
        z.string().describe('The estimated confidence level of the location, can be high, medium, or low.'),
      reason: z.string().describe('The reasoning behind the confidence level estimation.'),
    }),
  },
  prompt: `You are an AI expert in estimating location confidence based on Bluetooth signal strength.

  Given the following information, estimate the confidence level of the location (high, medium, or low) and provide a reason for your estimation.

  Device Name: {{{deviceName}}}
  RSSI: {{{rssi}}}

  Consider that stronger RSSI values (closer to 0) indicate a closer proximity and higher confidence, while weaker RSSI values (further from 0) indicate a more distant proximity and lower confidence.
  Also consider the device name, some devices may have more reliable signal strengths than others.
  `,
});

const estimateLocationConfidenceFlow = ai.defineFlow<
  typeof EstimateLocationConfidenceInputSchema,
  typeof EstimateLocationConfidenceOutputSchema
>(
  {
    name: 'estimateLocationConfidenceFlow',
    inputSchema: EstimateLocationConfidenceInputSchema,
    outputSchema: EstimateLocationConfidenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
