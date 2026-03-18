import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  return (
    <div className="section-padding-y min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-10 h-10 text-red-500" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h2>
        <p className="text-gray-600 mb-8">
          We couldn't process your payment. This might be due to a declined card, insufficient funds, or a network issue. Please try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 bg-[#5176ea] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4361c4] transition-all shadow-md"
          >
            <RefreshCcw className="w-5 h-5" /> Try Again
          </button>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            Support
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-[#5176ea] transition-colors flex items-center justify-center gap-1">
            <Home className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
