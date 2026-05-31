import fs from 'fs';
import path from 'path';

const enPath = path.resolve('messages/en.json');
const tlPath = path.resolve('messages/tl.json');

const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const tlJson = JSON.parse(fs.readFileSync(tlPath, 'utf8'));

enJson['LatinHonors'] = {
	"title": "Latin Honors Calculator (UP, PUP, UST, Ateneo, DLSU)",
	"subtitle": "Check if your GWA or QPI qualifies for Cum Laude, Magna Cum Laude, or Summa Cum Laude based on your school's specific cutoffs.",
	"inputDetails": "Your Academic Details",
	"schoolLabel": "Select Your School",
	"gwaLabel": "Your GWA / QPI",
	"scaleHint": "Scale",
	"resultsTitle": "Latin Honors Result",
	"honorLabel": "Your Standing",
	"noHonor": "No Honor (Yet!)",
	"gapLabel": "You need to improve by",
	"gapSuffix": "to reach",
	"cutoffsTitle": "Honor Cutoffs for Your School",
	"readGuideBtn": "Read How to Get Latin Honors →"
};

tlJson['LatinHonors'] = {
	"title": "Latin Honors Calculator (UP, PUP, UST, Ateneo, DLSU)",
	"subtitle": "Tingnan kung pasok ka sa Cum Laude, Magna Cum Laude, o Summa Cum Laude batay sa cutoff ng school mo.",
	"inputDetails": "Detalye ng Acads Mo",
	"schoolLabel": "Piliin ang School Mo",
	"gwaLabel": "GWA / QPI Mo",
	"scaleHint": "Scale",
	"resultsTitle": "Resulta ng Latin Honors",
	"honorLabel": "Standing Mo",
	"noHonor": "No Honor (Pa!)",
	"gapLabel": "Kailangan mo pang mag-improve ng",
	"gapSuffix": "para maabot ang",
	"cutoffsTitle": "Honor Cutoffs ng School Mo",
	"readGuideBtn": "Paano Makakuha ng Latin Honors →"
};

enJson['DOSTScholarshipStipend'] = {
	"title": "DOST-SEI Scholarship Stipend Calculator",
	"subtitle": "Calculate your exact yearly DOST scholarship benefits: living allowance, book allowance, tuition subsidy, and thesis grant.",
	"inputDetails": "Scholarship Details",
	"schoolTypeLabel": "Type of School",
	"schoolSUC": "State University (SUC) — Free Tuition",
	"schoolPrivate": "Private HEI — With Tuition Subsidy",
	"schoolPrivateNoTuition": "Private HEI — Has Separate Tuition Scholarship",
	"yearLabel": "Year Level",
	"semLabel": "Semesters Per Year",
	"tuitionLabel": "Actual Tuition Per Semester (PHP)",
	"tuitionHint": "DOST will pay up to ₱40,000/sem for private HEIs.",
	"resultsTitle": "Annual Stipend Breakdown",
	"livingLabel": "Living Allowance",
	"livingDesc": "per month × 10 months",
	"bookLabel": "Book Allowance",
	"bookDesc": "per semester",
	"tuitionLabel2": "Tuition Subsidy",
	"tuitionDesc": "per semester (max ₱40k)",
	"thesisLabel": "Thesis/Dissertation Grant",
	"thesisDesc": "One-time, final year only",
	"gradLabel": "Graduation Clothing",
	"gradDesc": "One-time, final year only",
	"totalLabel": "Total Annual Benefits",
	"readGuideBtn": "Read DOST Scholarship Guide →"
};

tlJson['DOSTScholarshipStipend'] = {
	"title": "DOST-SEI Scholarship Stipend Calculator",
	"subtitle": "Kwentahin ang eksaktong yearly benefits ng DOST scholarship mo: living allowance, book allowance, tuition subsidy, at thesis grant.",
	"inputDetails": "Detalye ng Scholarship",
	"schoolTypeLabel": "Anong Klaseng School?",
	"schoolSUC": "State University (SUC) — Libre ang Tuition",
	"schoolPrivate": "Private HEI — May Tuition Subsidy",
	"schoolPrivateNoTuition": "Private HEI — May Ibang Tuition Scholarship",
	"yearLabel": "Year Level",
	"semLabel": "Ilang Semester Per Year?",
	"tuitionLabel": "Actual na Tuition Per Semester (PHP)",
	"tuitionHint": "Hanggang ₱40,000 lang per sem ang babayaran ng DOST sa private schools.",
	"resultsTitle": "Breakdown ng Yearly Stipend",
	"livingLabel": "Living Allowance",
	"livingDesc": "per buwan × 10 buwan",
	"bookLabel": "Book Allowance",
	"bookDesc": "per semester",
	"tuitionLabel2": "Tuition Subsidy",
	"tuitionDesc": "per semester (max ₱40k)",
	"thesisLabel": "Thesis/Dissertation Grant",
	"thesisDesc": "Isang beses lang, pang-final year",
	"gradLabel": "Graduation Clothing",
	"gradDesc": "Isang beses lang, pang-final year",
	"totalLabel": "Kabuuang Benefits sa Isang Taon",
	"readGuideBtn": "Basahin ang DOST Scholarship Guide →"
};

enJson['QPIGPA'] = {
	"title": "QPI / GPA Calculator (Ateneo, DLSU & 4.0 Scale)",
	"subtitle": "Calculate your Quality Point Index or Cumulative GPA using the 4.0 grading scale. Add your courses and units to get your weighted average.",
	"inputDetails": "Enter Your Courses",
	"systemLabel": "Grading System",
	"systemAteneo": "Ateneo QPI (4.0 Scale)",
	"systemDLSU": "DLSU CGPA (4.0 Scale)",
	"systemStandard": "Standard 4.0 GPA",
	"addCourseBtn": "+ Add Course",
	"removeCourseBtn": "Remove",
	"gradeLabel": "Grade",
	"unitsLabel": "Units",
	"resultsTitle": "Your QPI / GPA",
	"qpiLabel": "Weighted Average",
	"totalUnitsLabel": "Total Units",
	"totalQPLabel": "Total Quality Points",
	"readGuideBtn": "Read QPI Guide →"
};

tlJson['QPIGPA'] = {
	"title": "QPI / GPA Calculator (Ateneo, DLSU & 4.0 Scale)",
	"subtitle": "Kwentahin ang QPI o GPA mo gamit ang 4.0 grading scale. I-add ang mga kurso at units mo para makuha ang weighted average.",
	"inputDetails": "I-enter ang Mga Kurso",
	"systemLabel": "Grading System",
	"systemAteneo": "Ateneo QPI (4.0 Scale)",
	"systemDLSU": "DLSU CGPA (4.0 Scale)",
	"systemStandard": "Standard 4.0 GPA",
	"addCourseBtn": "+ Dagdagan ng Kurso",
	"removeCourseBtn": "Alisin",
	"gradeLabel": "Grade",
	"unitsLabel": "Units",
	"resultsTitle": "QPI / GPA Mo",
	"qpiLabel": "Weighted Average",
	"totalUnitsLabel": "Kabuuang Units",
	"totalQPLabel": "Kabuuang Quality Points",
	"readGuideBtn": "Basahin ang QPI Guide →"
};

fs.writeFileSync(enPath, JSON.stringify(enJson, null, '\t') + '\n');
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, '\t') + '\n');
console.log("Student tools translations injected!");
