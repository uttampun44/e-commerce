export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="header-container p-4 max-w-[990px] mx-auto">
        <div className="row flex justify-between items-center">
          <div className="heading-text">
            Welcome to worldwide Megamart!
          </div>
          <div className="deliver-order-offers">
             <div className="deliver">
                Deliver to User - City
             </div>
              <div className="order-offers">
                <span className="mx-2">|</span>
                <span className="mx-2">Order History</span>
                <span className="mx-2">|</span>
                <span className="mx-2">Offers</span>
              </div>
              <div className="offers">
                <span className="mx-2">|</span>
                <span className="mx-2">Help</span>
              </div>
          </div>
        </div>
      </div>
    </header>
  )
}