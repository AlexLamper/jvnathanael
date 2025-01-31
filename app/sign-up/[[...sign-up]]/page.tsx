import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-center lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold font-outfit mx-auto mb-4 lg:max-w-[40%] max-w-[80%]">
            Op deze pagina kunt u een account aanmaken.
        </h1>
        <div className="w-full max-w-md p-6">
            <SignUp />
        </div>
    </div>
  );
}