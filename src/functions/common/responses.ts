export const successResponse = (data: any) => {
    return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

export const errorResponse = (message: string, statusCode: number = 400) => {
    return {
        statusCode,
        body: JSON.stringify({ message }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};