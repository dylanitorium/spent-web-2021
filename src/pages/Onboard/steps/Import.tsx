import { useMemo, useState } from "react";
import { Button, Icon } from "ui-components";

import { useDropzone } from "react-dropzone";
import { Form } from "ui-components/form";

import firebase from "../../../firebase";

const Import = ({ budget }) => {
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();

  const hasFiles = useMemo(() => acceptedFiles.length > 0, [acceptedFiles]);

  const getFileNames = () => {
    if (acceptedFiles.length > 1) {
      return `${acceptedFiles.length} files`;
    }

    return acceptedFiles[0].name;
  };

  const getDropzoneText = () => {
    if (hasFiles) {
      return getFileNames();
    }

    return (
      <div className="flex flex-col items-center">
        <Icon name="MdFileUpload" className="text-2xl"></Icon>Drop a file or
        click to select
      </div>
    );
  };

  const handleImportFiles = async () => {
    setLoading(true);
    const storage = firebase.storage().ref();
    const ref = storage.child(
      `${budget.budget_id}/imports/${acceptedFiles[0].name}`
    );
    await ref.put(acceptedFiles[0]);
  };

  return (
    <div>
      <h2 className="text-indigo-900 text-3xl font-medium mb-6">
        Import some transactions
      </h2>
      <p className="mb-4">
        Great! The next step is to import a csv of some transactions. Initially
        we are just going to set up the schema. After you’re fully onboarded you
        will be able to start classifying the transactions.
      </p>
      <p className="mb-8">
        One to three months worth of transactions will be a good amount to get a
        picture of your spending habits.
      </p>
      <Form onSubmit={handleImportFiles}>
        <div
          {...getRootProps({
            className: `h-36 bg-indigo-100 w-100 mb-8 border-indigo-300 rounded flex flex-col items-center justify-center text-indigo-300 hover:bg-indigo-200 hover:text-indigo-400 hover:border-indigo-400 transition-colors cursor-pointer ${
              hasFiles
                ? "text-indigo-700 border-2 border-indigo-400"
                : "border-dashed border-2"
            }`,
          })}
        >
          <input {...getInputProps()} />
          {getDropzoneText()}
        </div>
        <div className="flex justify-end">
          <Button loading={loading}>Import</Button>
        </div>
      </Form>
    </div>
  );
};

export default Import;
