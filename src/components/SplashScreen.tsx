import Image from 'next/image';

export default function SplashScreen() {
  return (
    <main className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
      <Image
        src="/static/icons/Logo.svg"
        width="255"
        height="44"
        alt={process.env.NEXT_PUBLIC_APP_NAME}
      />
    </main>
  );
}
