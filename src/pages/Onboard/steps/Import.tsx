import { useMemo, useState } from "react";
import { Button } from "ui-components";

import { useDropzone } from "react-dropzone";
import { Form } from "ui-components/form";

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

    return "Drag a file here or click to select";
  };

  const handleImportFiles = () => {};

  return (
    <div>
      <p className="mb-6">
        Import a csv of some transactions from your bank account. Three months
        is a good amount to get an accurate picture of your spending habits.
      </p>
      <Form onSubmit={handleImportFiles}>
        <div
          {...getRootProps({
            className: `h-24 w-100 mb-6 border-gray-500 rounded flex items-center justify-center text-gray-500 hover:bg-gray-300 hover:text-gray-700  transition-colors cursor-pointer ${
              hasFiles ? "text-gray-700 border-2" : "border-dashed border"
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
