export default function Hydropower() {
    return (
      <div className="mt-4 space-y-6">
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Technical Overview
          </h4>
          <p className="font-body text-sm font-light mb-2">
            Building the time-series forecasting model involved:
          </p>
          <ul className="list-disc pl-5 font-body text-sm font-light space-y-1 [&>li]:marker:text-[var(--secondary)]">
            <li>Scraping and processing 19 years of NASA OpenDAP hydrology data (2006 - 2024), which included environmental metrics such as rainfall, snowmelt, soil conditions, and much more</li>
            <li>Lots of feature engineering to align the different environmental metrics with their delayed impact on water inflow</li>
            <li>Designing a 3-layer LSTM network with a custom Huber loss function to handle outliers</li>
            <li>Fine-tuning dropout, regularization parameters, and model architecture to prevent overfitting</li>
            <li>Visualizing evaluation metrics (validation loss tracking, dropout, r²)</li>
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Thoughts
          </h4>
          <p className="font-body text-sm font-light">
            Hydropower and renewable energy was a field that I had pretty much no knowledge in before working at Hatch, so I was eager to learn about the role of software in the energy sector. This project was interesting to work on because of the real-world application and potential for growth. What excited me the most was seeing how this model could be improved and integrated into the company's optimization systems for hydropower plants. As for the development process, I ended up gaining a much deeper understanding of the theory behind machine learning while I was experimenting with the model. Although it took a lot of time and learning, I enjoyed the process.
          </p>
        </div>
      </div>
    );
  }