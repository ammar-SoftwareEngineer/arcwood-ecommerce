

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
console.log(slug);
  return (
    <section className="blogs-section py-12">
      <div className="container mx-auto px-8 lg:px-6 xl:px-16 py-12">
        <h1>{slug}</h1>
      </div>
    </section>
  );
}