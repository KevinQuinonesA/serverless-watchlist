export interface WatchlistItem {
    id: number;
    user_id: number;
    symbol: string;
    company_name: string;
    notes?: string;
    created_at: Date;
}

export interface CreateWatchlistItemPayload {
    user_id: number;
    symbol: string;
    company_name: string;
    notes?: string;
}