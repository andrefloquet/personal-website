import { CircleCheck } from "lucide-react";

export default function About() {
    return (
        <main className="mx-auto my-16 max-w-9/10">
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="mb-4 text-3xl font-bold text-slate-900">Privacy Policy for Floquet App</h1>
                <p className="mb-6 text-sm text-slate-500">Effective date: 01/11/2025</p>
                <p className="mb-4 text-slate-700">
                    Andre Floquet built the Floquet mobile app as a free service. This app is intended to display my
                    professional profile, including skills, work experience, certifications, and education.
                </p>
                <p className="mb-4 text-slate-700">
                    The app does not collect, store, or share personal user data. There are no analytics, ads, or
                    external tracking services.
                </p>
                <p className="text-slate-700">
                    If you have any questions or suggestions about this Privacy Policy, please contact me at
                    {" "}andrefloquet@gmail.com.
                </p>
            </section>
        </main>
    )
}