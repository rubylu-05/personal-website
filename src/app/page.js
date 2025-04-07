export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-300 p-6 fixed h-screen top-0 left-0 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">Ruby Lu</h1>
          <div className="flex space-x-2 mb-6">
            <a href="#" aria-label="Email"><span className="text-xl">✉️</span></a>
            <a href="#" aria-label="LinkedIn"><span className="text-xl">🔗</span></a>
            <a href="#" aria-label="GitHub"><span className="text-xl">🐙</span></a>
          </div>
          <nav className="space-y-2 text-gray-800">
            <a href="#about" className="text-brown-500 font-semibold">About</a>
            <a href="#recent" className="block">Recent Work</a>
            <a href="#resume" className="block">Resume</a>
            <a href="#misc" className="block">Miscellaneous</a>
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="ml-64 p-10 flex-1 bg-[#fdfdfd] text-gray-900">
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold text-[#a8896c] mb-4">Hi, my name is Ruby!</h2>
          <p className="text-lg">
            I study computer science at the University of Waterloo and I’m constantly seeking opportunities to evolve my skill set. I’m passionate about <strong>learning as much as possible</strong> and <strong>working on things with a tangible impact</strong>.
          </p>
        </section>

        <section id="recent" className="mb-16">
          <h2 className="text-3xl font-bold text-[#a8896c] mb-4">Past, present, and future</h2>
          <p className="mb-4">
            In the <span className="text-[#d0bba2]">summer of 2024</span>, I worked on enhancing desktop applications and automating systems for <strong>YM Inc.</strong>, a Toronto-based retail company that operates fashion brands across North America.
          </p>
          <p className="mb-4">
            In <span className="text-[#b9c3d1]">winter 2025</span>, I interned at <strong>Hatch</strong> in their Niagara Falls office, where I dipped my toes into the complexities of hydropower optimization. I worked to improve the efficiency of hydroelectric dams and explored the use of machine learning for predicting water inflow - I found this experience to be a really interesting intersection of engineering, sustainability, and software.
          </p>
          <p className="mb-4">
            In the <span className="text-[#d0bba2]">fall of 2025</span>, I’ll be joining <strong>Amazon Web Services (AWS)</strong> in Seattle as an SDE intern, where I’ll be contributing to the DynamoDB team. I’m really excited to be getting the chance to explore the world of cloud computing.
          </p>
          <p>
            I’m currently on the lookout for <span className="text-[#d0bba2]">summer 2026</span> internship opportunities.
          </p>
        </section>

        <section id="resume" className="mb-16">
          <h2 className="text-2xl font-bold">Resume</h2>
          <p>[Add resume download or details here]</p>
        </section>

        <section id="misc" className="mb-16">
          <h2 className="text-2xl font-bold">Miscellaneous</h2>
          <p>[Add any additional content here]</p>
        </section>
      </main>
    </div>
  );
}
