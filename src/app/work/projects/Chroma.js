export default function Chroma() {
    return (
      <div className="mt-4 space-y-6">
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            The Project
          </h4>
          <p className="font-body text-sm font-light">
            Chroma allows the user to input their available colours by adding them with a colour picker or uploading a photo of their paint swatches. These colours will be stored in a palette that they can edit and fine-tune. Next, the user can choose to take or upload an image to use as a reference, and the app will generate a palette based on this image. With these two palettes, the app uses a linear algebra approach to calculate the ratios for how much of each available colour is needed to create the target colours.
          </p>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Technical Overview
          </h4>
          <ul className="list-disc pl-5 font-body text-sm font-light space-y-1 [&>li]:marker:text-[var(--secondary)]">
            <li>Flutter was used to build the mobile app</li>
            <li>Flask was used for the back-end, which includes a Python script to handle calculations</li>
            <li>OpenCV was used to extract colours from images</li>
            <li>An AWS EC2 instance was used to host the back-end server</li>
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Thoughts
          </h4>
          <p className="font-body text-sm font-light">
            Mobile app development operates pretty differently from web development, so it was a little intimidating at first. However, we were determined to make it work, even under the time constraint of a hackathon. We did a lot of breaking, fixing, learning, and desperate researching to finish the project just in time. It's worth noting that the RGB colour model (which is optimized for screens) might not be the best representation of how paints actually mix in real life, but the resulting colours generally ended up being pretty close to the target colours. This experience introduced me to the world of mobile development, which I would definitely be willing to explore further.
          </p>
        </div>
      </div>
    );
  }