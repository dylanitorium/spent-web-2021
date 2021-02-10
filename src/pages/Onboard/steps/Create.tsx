import { Field, Form } from "ui-components/form";
import { useModel } from "contexts/model";
import isEmpty from "lodash/isEmpty";

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
      <h2 className="text-indigo-900 text-3xl font-medium mb-6">
        Create a budget
      </h2>
      <p className="mb-8">
        Let’s get started by giving a name to your budget. You can call it what
        ever you like. Only you and the people you share it with will be able to
        see it.{" "}
      </p>
      <Form onSubmit={handleCreateBudget}>
        <div className="mb-8">
          <Field
            name="name"
            label="Budget Name"
            placeholder="Super Cool Budget"
            onChange={({ value }) => setName(value)}
          />
        </div>
        <div className="flex justify-end">
          <Button disabled={isEmpty(name)} loading={loading}>
            Next
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Create;
