export default function Nudge() {
    return (
      <div className="mt-4 space-y-6">
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            The Project
          </h4>
          <p className="font-body text-sm font-light">
            The user would express the task that they are trying to accomplish; for example, maybe they want to practice Leetcode and get a job. The extension would then start observing their activity, making snarky comments verbally and nudging them to get back on track (hence the name). If they opened a Leetcode problem and went straight to the solution, they would probably get called out. The extension "speaks" out loud in a tone and voice that's meant to mimic the narrator in The Stanley Parable.
          </p>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Technical Overview
          </h4>
          <ul className="list-disc pl-5 font-body text-sm font-light [&>li]:marker:text-[var(--secondary)]">
            <li>JavaScript was used to create the core functionality and monitor user activity</li>
            <li>React.js was used to create the extension's pop-up and dashboard</li>
            <li>MongoDB was used to store activity logs</li>
            <li>Flask was used for the back-end</li>
            <li>GPT-4 (OpenAI) was used to generate the responses based on the information fetched from the extension</li>
            <li>Eleven Labs TTS was used to give voice to the narrator</li>
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Thoughts
          </h4>
          <p className="font-body text-sm font-light">
            This product isn't perfect - most hackathon projects aren't - but it taught me a lot about how Chrome extensions work under the hood. I gained some pretty valuable full-stack experience, but unfortunately also learned firsthand about how frustrating Chrome extensions can be to debug, especially when I'm trying to trace different messages and errors between background scripts, popups, and content scripts. However, this made it extra satisfying when the project started coming together nicely. I really enjoyed the process of building Nudge, especially in the unique environment of a hackathon, and found the premise to be pretty fun to design.
          </p>
        </div>
      </div>
    );
  }