import React, { useState } from "react";
import { useLocationContext } from "../../context/LocationContext";
import * as XLSX from "xlsx";
interface ExcelReaderProps {
  className?: string;
}

const ExcelReader: React.FC<ExcelReaderProps> = ({ className }) => {
  const { setLocations } = useLocationContext();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const locations = jsonData.slice(1).map((row: any[]) => ({
          longitude: row[0],
          latitude: row[1],
          date: row[2],
        }));
        setLocations(locations);
      };
      reader.readAsBinaryString(file);
    }
  };
  return (
    <div className={`${className}`}>
      <div className="p-4">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>
    </div>
  );
};
export default ExcelReader;
