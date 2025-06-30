import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import csvParser from 'csv-parser';
import * as XLSX from 'xlsx';

export const parseFile = async (filePath: string, mimetype: string): Promise<Record<string, any>[]> => {
    const extension = path.extname(filePath).toLowerCase();

    if (mimetype === 'text/csv' || extension === '.csv') {
        return await parseCSV(filePath);
    }

    if (
        mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        mimetype === 'application/vnd.ms-excel' ||
        extension === '.xlsx' ||
        extension === '.xls'
    ) {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        return data as Record<string, any>[];
    }

    throw new Error('Unsupported file type');
};

const parseCSV = (filePath: string): Promise<Record<string, any>[]> => {
    return new Promise((resolve, reject) => {
        const results: Record<string, any>[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data: Record<string, any>) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};
