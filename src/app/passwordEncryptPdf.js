const PDFDocument = require('pdfkit');
const fs = require('fs');

const encrypt = require("./encrypt_pdf");
const decrypt = require("./decrypt_pdf");

const [mode, file, password ] = process.argv.slice(2);

if (mode === "encrypt") {
  const doc = new PDFDocument({
    userPassword: password,
    ownerPassword: password
  });
  
  doc.pipe(fs.createWriteStream(file));
  doc
    .fontSize(25)
    .text('hello World', 100, 100);
  
  doc.end();
  
  encrypt.Encryptpdf(file, password)
}
else if (mode === "decrypt") {
  decrypt.DecryptPDF(`enc-${file}`, password);
}