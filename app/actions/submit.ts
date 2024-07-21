"use server";
 
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { error } from "console";
import { z } from 'zod';
 
export async function analyzeTOs(termsOfService: string) {
    'use server';
     
    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
    });
    const model = google('models/gemini-1.5-flash-latest');
    
    try {
        const response = await generateObject({
            model,
            prompt: `Analyze the terms of service: ${termsOfService} and return a list of the most important terms and conditions.`,
            schema: z.object({
                isItvalid: z.boolean().describe("Whether the provided terms of service is valid or not"),
                badComments: z.string().describe("The most important terms and conditions that are bad summarize the bad parts of the terms of service in 3 sentences.") ,
                goodComments: z.string().describe("The most important terms and conditions that are good summarize the good parts of the terms of service in 3 sentences.") ,
                company: z.string().describe("The name of the company"),
                isAcceptableUsePolicy: z.boolean().describe("Whether if the terms of service is acceptable or not in the context of privacy"),
                percentage: z.number().describe("The percentage of the terms of service that is good below 50 is bad and above 50 is good"),
                
            }),
        });
       
        
        if (response && response.object) {
            console.log("response", response );
            return response.object;
        } else {
            console.log("response", error);
            return { error: "No response object available." };
        }
    } catch (error) {
        return { error: "An error occurred while analyzing the terms of service." };
    }
}