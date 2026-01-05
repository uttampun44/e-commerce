import Loginiimg from "@/assets/images/login.png";
import Googgle from "@/assets/images/logos_google-icon.png";
import Facebook from "@/assets/images/logos_facebook.png";
import useToggle from "@/hooks/useToggle";
import { Eye, EyeOff } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

type LoginTypes = {
    email: string;
    password: string;
}

export default function Login() {

    const [passwordVisible, togglePasswordVisible] = useToggle();

    const { register, formState: { errors }, handleSubmit } = useForm<LoginTypes>();

    const onSubmit: SubmitHandler<LoginTypes> = (data: LoginTypes) => {
        console.log(data);
    };

    return (
        <main>
            <section className="bg-[url('./src/assets/images/loginbg.png')] no-repeat bg-cover flex items-center justify-center">
                <div className="login-form max-w-5xl mx-auto px-4 pt-24 flex gap-8 mb-10">
                    <div className="login-img w-1/2">
                        <h1 className="font-bold text-4xl text-black"> Welcome Back</h1>
                        <p className="text-slate-700 text-xl mt-2">Login into your account</p>
                        <img src={Loginiimg} alt="login-img" />
                    </div>
                    <div className="login-form w-full md:w-1/2">

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-7">
                                <label htmlFor="email" className="block font-semibold text-lg">Email</label>
                                <input type="email" id="email" className="w-full p-3 border rounded-md bg-slate-300" placeholder="Enter your email address"
                                    {...register("email", { required: true })}
                                />
                                <div className="errors my-1">
                                    {errors.email && <span className="text-red-600">This field is required</span>}
                                </div>
                            </div>
                            <div className="mb-7 relative">
                                <label htmlFor="password" className="block font-semibold text-lg">Password</label>
                                <input type={passwordVisible ? "text" : "password"} id="password" className="w-full p-3 border rounded-md bg-slate-300" placeholder="Enter your password"
                                    {...register("password", { required: true })}
                                />
                                <div className="errors my-1">
                                    {errors.password && <span className="text-red-600">This field is required</span>}
                                </div>
                                {
                                    passwordVisible ?
                                        <EyeOff
                                            className="absolute top-11 right-3 cursor-pointer"
                                            onClick={togglePasswordVisible}
                                        />
                                        :
                                        <Eye
                                            className="absolute top-11 right-3 cursor-pointer"
                                            onClick={togglePasswordVisible}
                                        />
                                }
                            </div>
                            <button type="submit" className="w-full bg-black text-white p-4 rounded-md mt-1 cursor-pointer">Login</button>

                            <div className="login-google mt-7">
                                <div className="img-google flex justify-center items-center mb-4 gap-x-4 border-2 py-4 rounded-md cursor-pointer">
                                    <img src={Googgle} alt="Google" />
                                    <span className="text-base font-semibold">Login with Google</span>
                                </div>
                                <div className="img-facebook flex justify-center items-center mb-4 gap-x-4 bg-blue-600 py-4 rounded-md border cursor-pointer">
                                    <img src={Facebook} alt="Facebook" />
                                    <span className="text-base font-semibold">Login with Facebook</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}