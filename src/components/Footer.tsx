import Link from "next/link";

export default function Footer() {
    return (
        <footer className="neo-border-thin border-l-0 border-r-0 border-b-0 py-12 text-sm font-bold uppercase tracking-widest text-text-black bg-bg-cream">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-2xl font-black tracking-tighter text-text-black uppercase">
                    Career<span className="text-neo-blue">Pilot</span>
                </div>

                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-neo-blue transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-neo-blue transition-colors">Terms</Link>
                    <Link href="/contact" className="hover:text-neo-blue transition-colors">Contact</Link>
                </div>

                <div className="text-xs">
                    © {new Date().getFullYear()} CareerPilot. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
