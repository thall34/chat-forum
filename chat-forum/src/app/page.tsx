export default function Home() {
  return (
    <div className="homepage">
      <main className="w-full">
        <section className="flex flex-col items-center gap-[1em] w-full">
          <h1 className="p-[1em] text-[1.5em]">
            Welcome to Harmony
          </h1>
          <form className="flex flex-col items-center gap-[1em] w-fit px-[5em] py-[2em] border border-gray-400 rounded-xl shadow-md">
            <h2 className="text-[1.5em]">Login</h2>
            <label htmlFor="name">Username: </label>
            <input type="text" name="name" id="name" required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md"/>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md"/>
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
};