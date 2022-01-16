export const tableNotes = [
  "width/height possible for <table>",
  "width possible for <th>/<td>. width set on any last <th>/<td> in a column will be used as width for that column",
  `
  height possible for row aka <tr>. The actual value of height of a row: it will be large enough for other rows to be included inside 'table' height; 
  it will be small enough to accommodate its content. This means that actual height can vary depending on row content or other rows content and is not fixed. 
  Example: let table be 100vh containing many rows. Giving a height of 100% to a row will not give it 100% of its parent (<table>). To do that give 
  100vh height to that row. If you give it a height of 1vh or 1% or 0% or 1px etc the actual height will not be that. It will be minimum of what content it 
  accommodate.
`,
];
