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
        active ? "font-semibold text-indigo-50" : "text-indigo-300"
      }`}
    >
      {children}
    </span>
    <div className="rounded-full w-10 h-10 bg-indigo-300 ml-3 flex justify-center items-center">
      <div
        className={`rounded-full w-8 h-8 bg-indigo-50 transition-all  ${
          active
            ? "opacity-1"
            : completed
            ? "opacity-0"
            : "bg-indigo-900 opacity-1"
        }`}
      ></div>
    </div>
  </div>
);

const Line = () => <div style={{ marginRight: "18px" }} className="w-1 h-12 bg-indigo-300" />;

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
        Import
      </Dot>
      <Line />
      <Dot active={isActive(2)} completed={isCompleted(2)}>
        Share
      </Dot>
    </div>
  );
};

export default OnboardStepTracker;
