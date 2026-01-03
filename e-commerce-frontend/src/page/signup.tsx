import Loginiimg from "@/assets/images/login.png";
import Googgle from "@/assets/images/logos_google-icon.png";
import Facebook from "@/assets/images/logos_facebook.png";

export default function SignUp() {
    return (
         <main>
            <section className="bg-[url('./src/assets/images/loginbg.png')] no-repeat bg-cover flex items-center justify-center">
                <div className="login-form max-w-297.5 mx-auto px-4 pt-24 flex gap-8 mb-10">
                    <div className="login-img w-1/2">
                        <h1 className="font-bold text-4xl text-black"> Welcome Back</h1>
                       <p className="text-slate-700 text-xl mt-2">Login into your account</p>
                        <img src={Loginiimg} alt="login-img" />
                    </div>
                    <div className="login-form w-full md:w-1/2">
                       
                        <form encType="multipart/form-data">
                          <div className="mb-7">
                                <label htmlFor="fullname" className="block font-semibold text-lg">Full Name</label>
                                <input type="text" id="fullname" className="w-full p-3 border rounded-md bg-slate-300" placeholder="Enter your full name" />
                            </div>
                            <div className="mb-7">
                                <label htmlFor="email" className="block font-semibold text-lg">Email</label>
                                <input type="email" id="email" className="w-full p-3 border rounded-md bg-slate-300" placeholder="Enter your email address" />
                            </div>
                            <div className="mb-7">
                                <label htmlFor="password" className="block font-semibold text-lg">Password</label>
                                <input type="password" id="password" className="w-full p-3 border rounded-md bg-slate-300" placeholder="Enter your password" />
                            </div>
                            <button type="submit" className="w-full bg-black text-white p-4 rounded-md mt-1 cursor-pointer">Login</button>
                           
                           <div className="login-google mt-7">
                             <div className="img-google flex justify-center items-center mb-4 gap-x-4 border-2 py-4 rounded-md cursor-pointer">
                                <img src={Googgle} alt="Google" />
                                <span className="font-semibold text-sm">Login with Google</span>
                             </div>
                             <div className="img-facebook flex justify-center items-center mb-4 gap-x-4 bg-blue-600 py-4 rounded-md border cursor-pointer">
                                <img src={Facebook} alt="Facebook" />
                                <span className="font-semibold text-sm">Login with Facebook</span>
                             </div>
                           </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}