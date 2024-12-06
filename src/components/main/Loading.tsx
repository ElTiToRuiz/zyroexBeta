
type LoadingProps = {
    loading: boolean,  
    loadingmsg: string,
    error: string|null,
};
    

export const Loading = ({loading, loadingmsg, error}:LoadingProps) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-gray-500">{loadingmsg}...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-red-500">{error}</span>
            </div>
        );
    }
}