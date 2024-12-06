export type ErrorProps = {
    message: string;
    id: string;
};

export const Error = ({ message, id }: ErrorProps) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 max-w-md w-full rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-2">An error occurred</h1>
                <p className="text-sm mb-4">Error ID: <span className="font-mono">{id}</span></p>
                <p className="text-base">{message}</p>
            </div>
        </div>
    );
};
