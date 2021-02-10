import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as path from "path";
// import * as os from "os";
// import * as fs from "fs";
// import * as util from "util";
import { v4 as uuid } from "uuid";
// const parseCsv = require("csv-parse/lib/sync"); //TODO

// const readFile = util.promisify(fs.readFile);

admin.initializeApp();

const db = admin.firestore();

export const createImportRecord = functions.storage
  .object()
  .onFinalize(async (object: any) => {
    const [user_id, budget_id] = object.name.split("/");
    const import_id = uuid();

    await db
      .collection("imports")
      .doc(import_id)
      .set({
        import_id,
        name: path.basename(object.name),
        path: object.name,
        bucket: object.bucket,
        content_type: object.contentType,
        users: [user_id],
        budget: budget_id,
      });
  });

// export const processImport = functions.firestore
//   .document("imports/{import_id}")
//   .onCreate(async (snap: any) => {
//     const { name, bucket, path: filePath, schema }: any = snap.data();

//     const storageBucket = admin.storage().bucket(bucket);
//     const tempFilePath = path.join(os.tmpdir(), name);

//     await storageBucket.file(filePath).download({ destination: tempFilePath });
//     const importContents = await readFile(tempFilePath);
//     const parsedImportContents = parseCsv(importContents, {
//       columns: true,
//     });

//     if (!schema) {

//       return;
//     }

//     await Promise.all(
//       parsedImportContents.map(async (transaction: any) => {
//         const transaction_id = uuid();
//         await db
//           .collection("transactions")
//           .doc(transaction_id)
//           .set(transaction);
//       })
//     );
//   });
