import { connectToDatabase } from '../functions/common/db';

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
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Watchlist item not found' }),
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Watchlist item deleted successfully' }),
            };
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error deleting watchlist item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};