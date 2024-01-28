/**
 * Function to initialize the grading process.
 */
function init() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const headers = sheet.getRange('A3:H3').getValues()[0];
    const allData = sheet.getDataRange().getValues();
    const lastRow = sheet.getLastRow();
  
    const table = sheet.getRange(4, 1, lastRow - 3, headers.length).getValues();
    const totalOfClasses = parseInt(allData[1][0].match(/\d+/)[0]);
  
    for (let i = 0; i < table.length; i++) {
      const rowData = table[i];
      const rowIndex = findRowIndex(allData, rowData[0]);
      const fouls = rowData[headers.indexOf('Faltas')];
      
      Logger.log(`Processing student ${rowData[0]}:`);
  
      if (areTooManyFouls(fouls, totalOfClasses)) {
        setStudentStatus(sheet, rowIndex, 'Reprovado por Falta', 0);
        Logger.log('Status: Reprovado por Falta');
      } else {
        const average = averageOfGrades(rowData, headers);
        Logger.log(`Average grade: ${average.toFixed(2)}`);
  
        if (average < 5) {
          setStudentStatus(sheet, rowIndex, 'Reprovado por Nota', 0);
          Logger.log('Status: Reprovado por Nota');
        } else if (average >= 5 && average < 7) {
          const naf = calculateNaf(average);
          setStudentStatus(sheet, rowIndex, 'Exame Final', naf);
          Logger.log(`Status: Exame Final, NAF: ${naf}`);
        } else {
          setStudentStatus(sheet, rowIndex, 'Aprovado', 0);
          Logger.log('Status: Aprovado');
        }
      }
  
      Logger.log('---');
    }
  }
  
  /**
   * Function to set the student's status and NAF on the sheet.
   * @param {Object} sheet - The active sheet.
   * @param {number} rowIndex - The row index of the student.
   * @param {string} status - The status to set.
   * @param {number} naf - The NAF to set.
   */
  function setStudentStatus(sheet, rowIndex, status, naf) {
    const headers = sheet.getRange('A3:H3').getValues()[0];
    sheet.getRange(rowIndex, headers.indexOf('Situação') + 1).setValue(status);
    sheet.getRange(rowIndex, headers.indexOf('Nota para Aprovação Final') + 1).setValue(Math.ceil(naf));
  }
  
  /**
   * Function to calculate the NAF (Nota para Aprovação Final).
   * @param {number} m - The average grade.
   * @returns {number} - The calculated NAF.
   */
  function calculateNaf(m) {
    const naf = Math.max(0, 10 - m);
    return naf;
  }
  
  /**
   * Function to find the row index of a student in the data.
   * @param {Array} allData - All data in the sheet.
   * @param {string} matricula - The student's registration number.
   * @returns {number} - The row index.
   */
  function findRowIndex(allData, matricula) {
    for (let i = 0; i < allData.length; i++) {
      if (allData[i][0] === matricula) {
        return i + 1;
      }
    }
    return -1;
  }
  
  /**
   * Function to calculate the average of grades.
   * @param {Array} rowData - The student's grade data.
   * @param {Array} headers - The headers of the sheet.
   * @returns {number} - The average grade.
   */
  function averageOfGrades(rowData, headers) {
    const p1 = rowData[headers.indexOf('P1')] / 10;
    const p2 = rowData[headers.indexOf('P2')] / 10;
    const p3 = rowData[headers.indexOf('P3')] / 10;
    return (p1 + p2 + p3) / 3;
  }
  
  /**
   * Function to check if there are too many fouls.
   * @param {number} numFouls - The number of fouls.
   * @param {number} numClasses - The total number of classes.
   * @returns {boolean} - True if there are too many fouls, false otherwise.
   */
  function areTooManyFouls(numFouls, numClasses) {
    const foulThreshold = 0.25;
    return numFouls > foulThreshold * numClasses;
  }
  
