import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="wrap pt-40 pb-32">
      <p className="eyebrow mb-6">404</p>
      <h1 className="display max-w-3xl">This page isn&apos;t in our specification.</h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/" variant="primary">Back to home</Button>
        <Button href="/products" variant="ghost">See products</Button>
      </div>
    </section>
  );
}
