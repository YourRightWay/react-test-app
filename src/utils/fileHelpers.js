import { saveAs } from 'file-saver';


/**
 * Export CSV file
 * @param fileName
 * @param data
 */

// Наверно функция должна что то вернуть?
export function exportToCSV(fileName, data) {
  /**
   * Я бы так написал
   * if (!data.length) return new Error('ExportToCSV error: Invalid data')
   * return все сотальное.
   */
  if (data[0]) {
    const replacer = (key, value) => (value === null ? '' : value);

    const header = Object.keys(data[0]);

    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));

    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    const name = `${fileName}.csv`;
    const fileToSave = new Blob([csv], {
      type: 'text/csv',
      name,
    });

    saveAs(fileToSave, name);
  } else {
    console.error('ExportToCSV error: Invalid data');
  }
}

/**
 * Export to JSON
 * @param fileName
 * @param data
 */
export function exportToJSON(fileName, data) {
  const name = `${fileName}.json`;
  const fileToSave = new Blob([JSON.stringify(data)], {
    type: 'application/json',
    name,
  });

  saveAs(fileToSave, name);
}

/**
 * Import Json from a file
 * @param target
 * @returns {Promise}
 */
export function fileReader(target) {
  return new Promise((resolve, reject) => {
    if (target.files[0]) {
      const reader = new FileReader();
      reader.readAsText(target.files[0], 'UTF-8');

      reader.onload = e => resolve(JSON.parse(e.target.result));
      reader.onerror = e => reject(e);
    } else {
      console.error('FileReader error: file does not exist');
      resolve();
    }
  });
}
