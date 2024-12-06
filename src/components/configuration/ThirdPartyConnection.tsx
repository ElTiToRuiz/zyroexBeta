export const ThirdPartyConnection = () => (
    <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-medium text-red-600">Feature Coming Soon: Currently Under Development</h3>
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">System Integrations</h2>
        <p className="text-gray-500">Connect your system with popular platforms to enable seamless integration and improve workflow efficiency.</p>
    

        <div className="space-y-6">
            {/* Connect with Amazon */}
            <div>
                <button 
                    className="w-full py-3 px-6 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#FF7F00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
                    aria-label="Connect with Amazon"
                    disabled
                >
                    Connect with Amazon
                </button>
            </div>
    
            {/* Connect with Shopify */}
            <div>
                <button 
                    className="w-full py-3 px-6 bg-[#95BF47] text-white font-semibold rounded-md hover:bg-[#75a739] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#95BF47]"
                    aria-label="Connect with Shopify"
                    disabled
                >
                    Connect with Shopify
                </button>
            </div>
        </div>
    </div>
);