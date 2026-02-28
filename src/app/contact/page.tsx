import Link from "next/link";

export default function Contact() {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center p-6">
            <div className="bg-white neo-border p-10 max-w-md w-full neo-shadow-lg text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-text-black">Contact Us</h1>
                <p className="text-text-black font-bold mb-8">Reach out to the CareerPilot team.</p>
                <div className="space-y-4 mb-8">
                    <input type="text" placeholder="Your Name" className="w-full neo-border-thin p-4 font-bold bg-bg-cream" />
                    <input type="email" placeholder="Email Address" className="w-full neo-border-thin p-4 font-bold bg-bg-cream" />
                    <textarea placeholder="Your Message" rows={4} className="w-full neo-border-thin p-4 font-bold bg-bg-cream resize-none" />
                    <button className="w-full px-8 py-4 bg-neo-green text-black font-black uppercase tracking-widest neo-border-thin shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-200">
                        Send Message
                    </button>
                </div>
                <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-neo-blue underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
