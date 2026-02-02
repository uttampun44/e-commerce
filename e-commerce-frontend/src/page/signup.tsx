import Loginiimg from "@/assets/images/login.png";
import Googgle from "@/assets/images/logos_google-icon.png";
import Facebook from "@/assets/images/logos_facebook.png";
import useToggle from "@/hooks/useToggle";
import { Eye, EyeOff } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "@/hooks/api/usePost";
import { useNavigate } from "react-router";
import { signUpSchema, type SignUpFormData } from "@/schemas/signUp.schema";
import {toast} from 'sonner'
import { Activity } from "react";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const [passwordVisible, togglePasswordVisible] = useToggle();
  const [confirmPasswordVisible, toggleConfirmPasswordVisible] = useToggle();

  const navigate = useNavigate();

  const {
    isPending,
    isSuccess,
    mutate: createRegister,
  } = usePost<any, SignUpFormData>("/api/v1/auth/register", {
    invalidateQueries: [["create"]],

    onSuccess: () => {
        toast.success('Successfully registered')
        navigate('/login')
    },
    onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || 'Something went wrong';
        toast.error(errorMessage);
        console.error('Registration error:', error);
    },
    showErrorMessage: false,
    showSuccessMessage: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = (data: SignUpFormData) => {
    try {
      createRegister(data);
      navigate('/login')
    } catch (error: any) {
      toast.error(error)
    }
  };

  return (
    <main>
      <section className="bg-[url('./src/assets/images/loginbg.png')] no-repeat bg-cover flex items-center justify-center">
        <div className="login-form max-w-297.5 mx-auto px-4 pt-24 flex gap-8 mb-10">
          <div className="login-img w-1/2">
            <h1 className="font-bold text-4xl text-black"> Welcome Back</h1>
            <p className="text-slate-700 text-xl mt-2">
              Login into your account
            </p>
            <img src={Loginiimg} alt="login-img" />
          </div>
          <div className="login-form w-full md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="fullname"
                  className="block font-semibold text-lg"
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  className="w-full p-3 border rounded-md bg-slate-300"
                  placeholder="Enter your full name"
                  {...register("fullname")}
                />
                <div className="errors">
                  {errors.fullname && (
                    <span className="text-red-600">{errors.fullname.message}</span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold text-lg">
                  Email
                </label>
                <Input
                  type="email"
                  className="w-full p-3 border rounded-md bg-slate-300"
                  placeholder="Enter your email address"
                  {...register("email")}
                />
                <div className="errors my-1">
                  {errors.email && (
                    <span className="text-red-600">{errors.email.message}</span>
                  )}
                </div>
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block font-semibold text-lg"
                >
                  Password
                </label>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full p-3 border rounded-md bg-slate-300"
                  placeholder="Enter your password"
                  {...register("password")}
                />

                {passwordVisible ? (
                  <EyeOff
                    className="absolute top-11 right-3 cursor-pointer"
                    onClick={togglePasswordVisible}
                  />
                ) : (
                  <Eye
                    className="absolute top-11 right-3 cursor-pointer"
                    onClick={togglePasswordVisible}
                  />
                )}
                <div className="errors my-1">
                  {errors.password && (
                    <span className="text-red-600">{errors.password.message}</span>
                  )}
                </div>
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="confirm_password"
                  className="block font-semibold text-lg"
                >
                  Confirm Password
                </label>
                <Input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  className="w-full p-3 border rounded-md bg-slate-300"
                  placeholder="Enter your Confirm Password"
                  {...register("confirm_password")}
                />
                {confirmPasswordVisible ? (
                  <EyeOff
                    className="absolute top-11 right-3 cursor-pointer"
                    onClick={toggleConfirmPasswordVisible}
                  />
                ) : (
                  <Eye
                    className="absolute top-11 right-3 cursor-pointer"
                    onClick={toggleConfirmPasswordVisible}
                  />
                )}
                <div className="errors my-1">
                  {errors.confirm_password && (
                    <span className="text-red-600">{errors.confirm_password.message}</span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white p-4 rounded-md mt-1 cursor-pointer"
              >
                {isPending ? "Signing up..." : "Signup"}
              </button>
              
              <Activity mode={isSuccess ? 'visible' : 'hidden'}>
                 <p className="text-green-600 text-center mt-2">
                  Registration successful! Redirecting...
                </p>
              </Activity>

              <div className="login-google mt-7">
                <div className="img-google flex justify-center items-center mb-4 gap-x-4 border-2 py-4 rounded-md cursor-pointer">
                  <img src={Googgle} alt="Google" />
                  <span className="font-semibold text-sm">
                    Login with Google
                  </span>
                </div>
                <div className="img-facebook flex justify-center items-center mb-4 gap-x-4 bg-blue-600 py-4 rounded-md border cursor-pointer">
                  <img src={Facebook} alt="Facebook" />
                  <span className="font-semibold text-sm">
                    Login with Facebook
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
