const SectionHeading = ({ children }) => (
    <div className="flex items-center mb-2 mt-4">
      <h2 className="text-lg font-heading font-bold italic text-primary dark:text-darkSecondary md:mb-0 md:whitespace-nowrap">
        {children}
      </h2>
      <div className="hidden md:block w-full h-px bg-primary dark:bg-darkSecondary ml-4"></div>
    </div>
  );
  
  export default SectionHeading;