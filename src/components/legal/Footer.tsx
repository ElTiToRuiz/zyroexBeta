import React from "react";
import { motion } from "framer-motion";
import {FaFacebookF,FaTwitter,FaInstagram, FaLinkedinIn} from "react-icons/fa";

export const Footer: React.FC = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative pt-16 text-gray-800"
        >
            {/* Wave SVG at top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg
                    className="relative block w-[calc(135%+1.3px)] h-16"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                >
                    <path
                        fill="#f3f4f6" /* Tailwind gray-50 */
                        d="M321.39 56.69c59.52 0 107.94-18.71 147.36-37.06C506.19 7.65 546.76-7.92 607.6 2.55c62.34 10.84 121.23 39.45 183.56 51.74 37.93 7.51 82.55 8.22 131.88-6.23v70.39H0V65.33c87.87 20.87 125.71-8.64 193.61-18.18 61.15-8.65 123.77 9.54 127.78 9.54z"
                    />
                </svg>
            </div>

            {/* Footer Content Wrapper */}
            <div className="bg-gray-50 pt-6 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    {/* Column 1: Company Info */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">Our Company</h2>
                        <p className="text-sm text-gray-600">
                            We are committed to creating exceptional products and providing
                            top-notch customer service. Thank you for supporting our journey.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">Quick Links</h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <a
                                    href="/about"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/products"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    Products
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/pricing"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">Resources</h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <a
                                    href="/blog"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/help"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/faq"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="hover:text-indigo-600 transition-colors"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Icons */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">Follow Us</h2>
                        <p className="text-sm text-gray-600 mb-3">
                            Connect with us on social media
                        </p>
                        <div className="flex items-center space-x-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 transition-colors"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 transition-colors"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 transition-colors"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 transition-colors"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Bar */}
            <div className="bg-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Zyroex. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-xs mt-2 sm:mt-0">
                        Built with &hearts; by Zyroex Team
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};
