import { Field, Form } from "ui-components/form";
import { useModel } from "contexts/model";

import { useState } from "react";
import { Button } from "ui-components";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const { budgets } = useModel();
  const [name, setName] = useState("");

  const handleCreateBudget = async () => {
    setLoading(true);
    await budgets?.create({ name });
  };

  return (
    <>
      <p className="mb-6">Let's start by giving a name to your budget</p>
      <Form onSubmit={handleCreateBudget}>
        <div className="mb-6">
          <Field
            name="name"
            label="Budget Name"
            placeholder="Super Cool Budget"
            onChange={({ value }) => setName(value)}
          />
        </div>
        <div className="flex justify-end">
          <Button loading={loading}>Next</Button>
        </div>
      </Form>
    </>
  );
};

export default Create;
