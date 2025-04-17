import { connectToDatabase } from '../functions/common/db';
import { successResponse, errorResponse } from '../functions/common/responses';

export const getWatchlistItems = async (event: any) => {
    const userId = event.queryStringParameters?.userId || 123;

    if (!userId) {
        return errorResponse('User ID is required', 400);
    }

    let client;
    try {
        client = await connectToDatabase();
        const result = await client.query('SELECT * FROM watchlist WHERE user_id = $1', [userId]);
        
        const watchlistItems = result.rows;

        return successResponse(watchlistItems);
    } catch (error) {
        console.error('Error retrieving watchlist items:', error);
        return errorResponse('Could not retrieve watchlist items', 500);
    } finally {
        if (client) {
            client.release();
        }
    }
};