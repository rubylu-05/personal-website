export default function Pokeplants() {
    return (
      <div className="mt-4 space-y-6">
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            The Project
          </h4>
          <p className="font-body text-sm font-light">
            Poképlants creates an interactive gaming experience where users can use their real-life houseplants as Pokémon-style characters to battle others. The user would add their plant to their "Plantdex", and hardware components (a camera, moisture sensors, and a photoresistor) would provide real-time insight into the plant's health. Stronger plants have stronger abilities, so the game is meant to create an incentive for players to take better care of their plants.
          </p>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Technical Overview
          </h4>
          <ul className="list-disc pl-5 font-body text-sm font-light [&>li]:marker:text-[var(--secondary)]">
            <li>Hardware was used to measure plant health</li>
            <li>OpenAI was used to identify plants and their health</li>
            <li>Langchain was used to process data into game actions</li>
            <li>Flask was used for the back-end</li>
            <li>Socket.IO was used for real-time multiplayer battles</li>
            <li>React was used to design the game</li>
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Thoughts
          </h4>
          <p className="font-body text-sm font-light">
            This project initially started off as a kind of unserious idea from a team member ("what if we made Pokémon but with actual plants?"), but it ended up taking us further than we expected. Our intention was to go for the environmental track prize, which was a cool IKEA shark plushie. Instead, we ended up winning the whole thing and receiving a pair of 2nd-gen Airpod Pros! I found it pretty exciting to collaborate with a talented team and work under pressure to turn an idea into a product. There was a lot of front-end work involved here, and we were determined to make the game and its mechanics look fun, which is why we decided to try to evoke the nostalgia of old Pokémon games. Overall, I was happy about how this project turned out and pleasantly surprised by its win at Toronto's largest summer hackathon.
          </p>
        </div>
      </div>
    );
  }