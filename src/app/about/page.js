import LastFm from './LastFm';

export default function About() {
  return (
    <div className="mt-6 ml-6 mr-20">
      <h1 className="text-4xl font-body font-extralight text-secondary mb-4">Hi, I'm Ruby!</h1>
      <p className="text-base font-light font-body mb-12">
        I'm a computer science student at the University of Waterloo who loves building practical solutions and learning through implementation.
      </p>
      
      <h2 className="text-4xl font-body font-extralight text-secondary mb-4">Past, present, and future</h2>
      <p className="mb-4 font-body font-light">
        In the summer of 2024, I worked on enhancing desktop applications and automating systems for <a href="https://www.ym-inc.com" className="text-primary font-extrabold underline-animation" target="_blank">YM Inc.</a>, a Toronto-based retail company that operates fashion brands across North America.
      </p>
      <p className="mb-4 font-body font-light">
        In winter 2025, I interned at <a href="https://www.hatch.com/" className="text-primary font-extrabold underline-animation" target="_blank">Hatch</a> in their Niagara Falls office, where I dipped my toes into the complexities of hydropower optimization. I worked to improve the efficiency of hydroelectric dams and explored the use of machine learning for predicting water inflow - this experience ended up being a really interesting intersection of engineering, sustainability, and software.
      </p>
      <p className="mb-4 font-body font-light">
        In the fall of 2025, I'll be joining <a href="https://aws.amazon.com/" className="text-primary font-extrabold underline-animation" target="_blank">Amazon Web Services (AWS)</a> in Seattle as an SDE intern, which I'm pretty excited about!
      </p>
      <p className="mb-12 font-body font-light">I'm currently on the lookout for summer 2026 internship opportunities.</p>
      
      <h2 className="text-4xl font-body font-extralight text-secondary mb-4">Life outside of coding</h2>
      
      <LastFm />
    </div>
  );
}