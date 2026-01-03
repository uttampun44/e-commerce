import FooterIcon from '@/assets/images/unitdeal.png';
import MobileApp from '@/assets/images/MobileApp.png';
import Apple from '@/assets/images/apple.png';

export default function Footer() {
  return (
    <footer>
      <section className="bg-black">
        <div className="max-w-[1190px] mx-auto py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 text-white">
         
          {/* Grid Layout - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            
            {/* United Deals */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src={FooterIcon} alt="Footer Icon" className='w-8 h-8 sm:w-9 sm:h-9 object-fill' />
                <strong className="text-xl sm:text-2xl">UNITED DEALS</strong>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400">Customer Support:</p>
                  <strong className="text-base sm:text-lg">(629) 555-0129</strong>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  4517 Washington Ave. Manchester, Kentucky 39495
                </p>
                <p className='text-xs sm:text-sm text-gray-400'>info@kinbo.com</p>
              </div>
            </div>

            {/* Top Category */}
            <div>
              <h5 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Top Category</h5>
              <ul className="list-none space-y-2 text-gray-400">
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    Computer & Laptop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    Smartphone
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    HeadPhone
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-x-2 my-2">
                    <div className="border-t border-yellow-500 w-4 border-[1px] rounded-sm"></div>
                    <strong className='text-white text-sm sm:text-base'>Accessories</strong>
                  </div>
                  <ul className="ml-6 space-y-2">
                    <li>
                      <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                        Camera & Photos
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                        TV & Movies
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h5>
              <ul className="list-none space-y-2 text-gray-400">
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    Shop Product
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    Shopping Cart
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    Whistlist
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    Compare Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    Customer Help
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs sm:text-sm hover:text-white hover:underline transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Download App */}
            <div>
              <h5 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Download App</h5>
              <div className="flex flex-col gap-3">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src={MobileApp} alt="Google Play Store" className="w-28 sm:w-32 h-auto" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src={Apple} alt="Apple App Store" className="w-28 sm:w-32 h-auto" />
                </a>
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h5 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Popular Tags</h5>
              <div className="flex flex-wrap gap-2">
                <a href="#" className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                  Laptop
                </a>
                <a href="#" className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                  Headphone
                </a>
                <a href="#" className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                  Smartphone
                </a>
                <a href="#" className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                  Camera
                </a>
                <a href="#" className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                  Accessories
                </a>
                <a href="#" className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                  TV
                </a>
                <a href="#" className="bg-gray-800 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                  Gadgets
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}