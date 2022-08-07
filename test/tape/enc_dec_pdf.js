"use strict";
const crypto = require("crypto");
let test = require('tape');
let {Encryptpdf} = require("../../app/encrypt_pdf");
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();



test('encrypt pdf should encrypt pdf', t => {

	let filename = `input-${genRanHex(6)}.pdf`
	doc.pipe(fs.createWriteStream());
	doc.fontSize(25).text('hello tape',100,100);
	doc.end();

  const cipherPDF = encryptPdf;
})