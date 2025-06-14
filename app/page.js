import connectDB from "@/app/database/db";

export default function Home() {
  connectDB()
  console.log('1')
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to My Next.js App</h1>
      <p>This is the first page of your project.</p>
      <a
        href="https://nextjs.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        Learn more about Next.js
      </a>
    </main>
  );
}
