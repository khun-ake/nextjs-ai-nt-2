import Link from "next/link";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// http://localhost:3000/about
export default function AboutPage() {
  return (
    <main>
      <p>Power by NT</p>
      <hr />
      <Link href="/" className="underline">
        Home Page
      </Link>
    </main>
  );
}
