import SectionHeading from '../SectionHeading';

export default function Hydropower() {
    return (
      <div className="mt-4 space-y-6">
        <div className="mb-6">
          <SectionHeading>Technical Overview</SectionHeading>
          <p className="font-body  font-light mb-2">
            Building the time-series forecasting model involved:
          </p>
          <ul className="list-disc pl-5 font-body  font-light [&>li]:marker:text-[var(--secondary)]">
            <li>Scraping and processing 23 years of NASA OPeNDAP hydrology data (2002 - 2024), which included environmental metrics such as rainfall, snowmelt, soil conditions, and much more</li>
            <li>Lots of feature engineering to align the different environmental metrics with their delayed impact on water inflow</li>
            <li>Designing a 3-layer LSTM network with a custom Huber loss function to handle outliers</li>
            <li>Fine-tuning dropout, regularization parameters, and model architecture to prevent overfitting</li>
            <li>Visualizing evaluation metrics (validation loss tracking, dropout, r²)</li>
          </ul>
        </div>
        <div className="mb-6">
          <SectionHeading>Thoughts</SectionHeading>
          <p className="font-body  mb-6 font-light">
            Hydropower and renewable energy was a field that I had pretty much no knowledge in before working at Hatch, so I was eager to learn about the role of software in the energy sector. This project was interesting to work on because of the real-world application and potential for growth. What excited me the most was seeing how this model could be improved and integrated into the company's optimization systems for hydropower plants. As for the development process, I ended up gaining a much deeper understanding of the theory behind machine learning while I was experimenting with the model. Although it took a lot of time and learning, I enjoyed the process.
          </p>
        </div>
      </div>
    );
  }