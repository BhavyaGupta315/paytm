export default async function validateToken(token: string): Promise<boolean> {
    try {
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
        });

        return response.ok; 
    } catch (err) {
        return false; 
    }
}
