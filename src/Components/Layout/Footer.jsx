import {
  FaInstagram,
  FaXTwitter,
  FaMeta,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Styleo</h2>
          <p className="text-sm text-gray-400">
            Premium products. Secure payments. Fast delivery.
          </p>
          <div className="flex gap-4 mt-4 text-xl">
            <a className="hover:text-pink-500 transition" href="#">
              <FaInstagram />
            </a>
            <a className="hover:text-sky-400 transition" href="#">
              <FaXTwitter />
            </a>
            <a className="hover:text-blue-500 transition" href="#">
              <FaMeta />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-medium mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">All Products</a></li>
            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white">Offers</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-medium mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">Shipping</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Payments */}
        <div>
          <h3 className="text-white font-medium mb-3">We Accept</h3>
          <div className="flex gap-4 text-3xl text-gray-400">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
          <p className="text-xs text-gray-500 mt-4">
            100% secure checkout
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Styleo. All rights reserved.
      </div>
    </footer>
  );
}
