import { connectToDatabase } from '../functions/common/db';
import { errorResponse, successResponse } from '../functions/common/responses';

export const createWatchlistItem = async (event: any) => {
    if (!event.body) {
        return errorResponse('Request body is required', 400);
    }

    let data;
    try {
        data = JSON.parse(event.body);
    } catch (error) {
        return errorResponse('Invalid JSON in request body', 400);
    }

    const { symbol, company_name, notes } = JSON.parse(event.body);
    const user_id = event?.requestContext?.authorizer?.claims.sub || 123; // Assuming user ID is obtained from the JWT token

    if (!symbol || !company_name) {
        return errorResponse('Symbol and company name are required', 400);
    }

    const client = await connectToDatabase();

    try {
        const result = await client.query(
            'INSERT INTO watchlist (user_id, symbol, company_name, notes, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [user_id, symbol, company_name, notes]
        );

        const newItem = result.rows[0];

        return successResponse(newItem, 201);
    } catch (error) {
        console.error('Error inserting item:', error);
        return errorResponse('Could not create watchlist item', 500);
    } finally {
        client.release();
    }
};