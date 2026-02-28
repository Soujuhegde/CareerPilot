"use server";

export async function generateCoverLetter(data: any): Promise<{ id: string }> {
    // Mock implementation for generating a cover letter
    // In a real application, this would call an AI service or API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: Math.random().toString(36).substring(7) });
        }, 1500);
    });
}

export async function deleteCoverLetter(id: string): Promise<void> {
    // Mock implementation for deleting a cover letter
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
}
