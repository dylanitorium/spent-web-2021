const Form = ({ onSubmit, ...props }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    {...props}
  />
);

export default Form;
