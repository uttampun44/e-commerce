export default function TopNav() {
    return (
       <nav>
        <div className="top-nav bg-black text-white py-3">
        <div className="max-w-[1200px] mx-auto">
           <div className="row flex justify-between items-center">
             <div className="heading-left font-lato-bold text-sm font-semibold">
             <h1>Welcome to worldwide Megamart</h1>
             </div>
             <div className="right-nav">
                <ul className="flex items-center gap-4 text-sm text-white">
                    <li><a>Deliver to <span className="font-lato-bold font-semibold">423651</span></a></li>
                    <li><a>Track Order</a></li>
                    <li><a>All Offers</a></li>
                </ul>
             </div>
           </div>
        </div>
        </div>
       </nav>
    )
}