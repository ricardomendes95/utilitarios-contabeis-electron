/* eslint-disable import/prefer-default-export */
import ejs from 'ejs';
import path from 'path';

export async function renderEjs(
  fileName: string,
  content: any
): Promise<string> {

  const filePath = path.join(__dirname, '..', 'assets', fileName);
  // const filePath = path.join(__dirname, '..', '..', '..', 'assets', fileName);

  return new Promise((resolve, reject) => {
    // @ts-ignore
    ejs.renderFile(filePath, content, (err: Error, data: any) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}
