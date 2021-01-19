const Dot = ({
  children,
  active = false,
  completed = false,
}: {
  children: any;
  active?: boolean;
  completed?: boolean;
}) => (
  <div className="flex items-center">
    <span
      className={`uppercase text-sm tracking-widest transition-all  w-16 text-right ${
        active ? "font-semibold" : "text-gray-500"
      }`}
    >
      {children}
    </span>
    <div className="rounded-full w-6 h-6 bg-gray-900 ml-3 flex justify-center items-center">
      <div
        className={`rounded-full w-4 h-4 bg-white transition-all  ${
          active
            ? "opacity-1"
            : completed
            ? "bg-gray-400 opacity-1"
            : "opacity-0"
        }`}
      ></div>
    </div>
  </div>
);

const Line = () => <div className="w-1 h-12 mr-2.5 bg-gray-900" />;

const OnboardStepTracker = ({ activeStep }: { activeStep: number }) => {
  const isActive = (index) => activeStep === index;
  const isCompleted = (index) => activeStep > index;

  return (
    <div className="flex flex-col items-end">
      <Dot active={isActive(0)} completed={isCompleted(0)}>
        Create
      </Dot>
      <Line />
      <Dot active={isActive(1)} completed={isCompleted(1)}>
        Share
      </Dot>
      <Line />
      <Dot active={isActive(2)} completed={isCompleted(2)}>
        Import
      </Dot>
    </div>
  );
};

export default OnboardStepTracker;
