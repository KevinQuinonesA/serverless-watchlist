export const successResponse = (data: any, statusCode: number = 200) => {
    return {
        statusCode,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',        	
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    };
};

export const errorResponse = (message: string, statusCode: number = 400) => {
    return {
        statusCode,
        body: JSON.stringify({ message }),
        headers: {
            'Content-Type': 'application/json',	
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    };
};