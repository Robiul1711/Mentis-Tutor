import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="section-padding-y min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-500" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your payment has been processed successfully. You'll receive a confirmation email shortly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 bg-[#5176ea] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4361c4] transition-all shadow-md"
          >
            Go to Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
