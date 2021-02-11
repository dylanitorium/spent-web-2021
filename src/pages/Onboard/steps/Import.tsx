import { useMemo, useState, useEffect } from "react";
import { Button, Icon } from "ui-components";

import { useDropzone } from "react-dropzone";
import { Form } from "ui-components/form";

import firebase from "../../../firebase"; //TODO
import { useAuth } from "contexts/auth";
import { useModel } from "contexts/model";
import BeatLoader from "react-spinners/BeatLoader";

const FlashMessage = ({ children }) => {
  return (
    <div className="bg-green-100 text-green-500 border-green-500  border-l-4 px-6 py-6 flex items-center">
      <Icon name="MdCheckCircle" className="text-3xl" />
      <div className="ml-4">{children}</div>
    </div>
  );
};

const Import = ({ budget }) => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [_import, setImport] = useState();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const { user } = useAuth();
  const { imports } = useModel();

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
    setUploading(true);
    const storage = firebase.storage().ref();
    const ref = storage.child(
      `${user.user_id}/${budget.budget_id}/imports/${acceptedFiles[0].name}`
    );
    await ref.put(acceptedFiles[0]);
  };

  useEffect(() => {
    const promise = imports?.subscribe({
      onSnapshot: async (snapshot) => {
        if (imports && !_import) {
          setImport(snapshot && snapshot[0]);
        }
        setLoading(false);
      },
    });

    return () => void promise?.then((unsub) => unsub && unsub());
  }, []);

  if (loading) return <BeatLoader color={"#312E81"} />;

  return (
    <div className="w-full">
      <h2 className="text-indigo-900 text-3xl font-medium mb-6">
        Import some transactions
      </h2>
      {!_import ? (
        <>
          <p className="mb-4">
            Great! The next step is to import a csv of some transactions.
            Initially we are just going to set up the schema. After you’re fully
            onboarded you will be able to start classifying the transactions.
          </p>
          <p className="mb-8">
            One to three months worth of transactions will be a good amount to
            get a picture of your spending habits.
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
              <Button loading={uploading}>Import</Button>
            </div>
          </Form>
        </>
      ) : (
        <FlashMessage>Upload Successful!</FlashMessage>
      )}
    </div>
  );
};

export default Import;
