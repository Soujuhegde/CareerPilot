import Link from "next/link";

export default function Login() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-white neo-border p-10 max-w-md w-full neo-shadow-lg text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-text-black">Welcome Back</h1>
                <p className="text-text-black font-bold mb-8">Ready to land your dream job?</p>
                <div className="space-y-4 mb-8">
                    <input type="email" placeholder="Email Address" className="w-full neo-border-thin p-4 font-bold bg-bg-cream" />
                    <input type="password" placeholder="Password" className="w-full neo-border-thin p-4 font-bold bg-bg-cream" />
                    <Link href="/industry-insights" className="block w-full px-8 py-4 bg-neo-pink text-black font-black uppercase tracking-widest neo-border neo-shadow-hover hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                        Log In
                    </Link>
                </div>
                <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-neo-blue underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
