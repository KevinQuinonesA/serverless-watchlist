import { connectToDatabase } from '../functions/common/db';
import { successResponse, errorResponse } from '../functions/common/responses';


export const deleteWatchlistItem = async (event: any) => {
    const { symbol } = event.pathParameters;

    if (!symbol) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Symbol is required' }),
        };
    }

    try {
        const client = await connectToDatabase();
        const result = await client.query('DELETE FROM watchlist WHERE symbol = $1 RETURNING *', [symbol]);

        try {
            if (result.rowCount === 0) {
                return errorResponse('Watchlist item not found', 404);  
            }
            return successResponse({ message: 'Watchlist item deleted successfully' });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error deleting watchlist item:', error);
        return errorResponse('Internal server error', 500);
    }
};