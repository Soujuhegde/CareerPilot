import Link from "next/link";
import { Button } from "./ui/Button";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 neo-border-thin border-t-0 border-l-0 border-r-0 bg-bg-cream transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="text-2xl font-black tracking-tighter text-text-black uppercase">
                    Career<span className="text-neo-blue">Pilot</span>
                </Link>

                <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-text-black">
                    <Link href="#features" className="hover:text-neo-blue transition-colors">Features</Link>
                    <Link href="#how-it-works" className="hover:text-neo-blue transition-colors">How it Works</Link>
                    <Link href="#dashboard" className="hover:text-neo-blue transition-colors">Dashboard</Link>
                    <Link href="#testimonials" className="hover:text-neo-blue transition-colors">Testimonials</Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-text-black hover:text-neo-blue transition-colors">
                        Log In
                    </Link>
                    <Button variant="primary" size="sm" href="/signup">
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    );
}
