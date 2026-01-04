import { Input } from "./ui/input";
import HeaderImage from "@/assets/images/headerimage.png"
import Deals from "@/assets/images/deals.png"
import { Menu } from "lucide-react";
import DropdownTabs from "./dropdowntabs";
import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <div className="header-container bg-black text-white">
        <div className="max-w-297.5 mx-auto ">
          <div className="row flex justify-between items-center p-4">
            <div className="heading-text">
              Welcome to worldwide Megamart!
            </div>
            <div className="deliver-order-offers flex items-center">
              <div className="deliver">
                Deliver to <strong>423651</strong>
              </div>
              <div className="order-offers">
                <span className="mx-2">|</span>
                <span className="mx-2">Track your orders</span>
                <span className="mx-2">|</span>
                <span className="mx-2">All Offers</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* search bar  */}

      <div className=" max-w-297.5 mx-auto p-4">
        <div className="flex items-center gap-2">
          <div className="hamburger bg-[#F3F9FB] p-2 rounded-md">
            <Menu className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-black cursor-pointer" />
          </div>
          <div className="top-title flex items-center gap-4 ">
            <Link to="/">
              <strong className="text-2xl md:text-3xl lg:text-4xl text-black">UNITED DEALS</strong>
            </Link>
            <img
              src={HeaderImage}
              alt="flash sale"
              className="w-6 h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain shrink-0"
            />
          </div>
          <div className="search flex-1 mx-2">
            <Input type="text" placeholder="Search for products, brands and more" className="w-full" />
          </div>
          <div className="deals flex align-center gap-2">
            <div className="img-deals flex align-center gap-2">
              <img src={Deals} className="w-2 h-2 md:w-5 md:h-5 lg:w-6 lg:h-6 object-contain shrink-0" />
              <span className="text-base font-bold text-[#FC7901]">My Deals</span>
              <span className="mx-2">|</span>
            </div>

            <div className="sign-up-deals">
              <span className="text-base"><Link to="/signup">Sign Up</Link> / <Link to="/login">Login</Link></span>
              <span className="mx-2">|</span>
            </div>
            <div className="cart-deals">
              <span className="text-base">Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* dropdowntabs row  */}
      <div className="dropdown-row max-w-297.5 mx-auto p-4">
        <div className="row flex justify-between items-center gap-4">
          <DropdownTabs />
          <DropdownTabs />
          <DropdownTabs />
          <DropdownTabs />
          <DropdownTabs />
          <DropdownTabs />
          <DropdownTabs />
        </div>
      </div>
    </header>
  )
}