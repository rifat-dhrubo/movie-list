import AppLayout from "components/Layouts/AppLayout";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <main className="container mx-auto">
        <section className="grid place-content-center">
          <h1 className="text-2xl text-purple-500">Template</h1>
          <input type="text" />
        </section>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <AppLayout title="Home">{page}</AppLayout>;
};

export default Home;
