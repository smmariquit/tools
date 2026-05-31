const fs = require('fs');

const questions = [];
let id = 1;

function addQ(question, options, answer, explanation) {
    // Shuffle options to randomize the correct answer position
    const correctOpt = options[answer];
    const shuffled = [...options].map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
    const newAnswer = shuffled.indexOf(correctOpt);
    
    questions.push({
        id: id++,
        question,
        options: shuffled,
        answer: newAnswer,
        explanation
    });
}

// 1. Constitution & General Information (25 questions)
const genInfo = [
    ["What is the fundamental law of the land in the Philippines?", ["1987 Constitution", "Civil Code", "Revised Penal Code", "Labor Code"], 0, "The 1987 Constitution is the supreme law of the Republic of the Philippines."],
    ["Under the 1987 Constitution, what are the three co-equal branches of government?", ["Executive, Legislative, Judicial", "Executive, Senate, Congress", "National, Local, Barangay", "President, Vice President, Cabinet"], 0, "The government has three co-equal branches: Executive, Legislative, and Judicial."],
    ["Who is the Commander-in-Chief of all armed forces of the Philippines?", ["The President", "The Secretary of National Defense", "The Chief of Staff of the AFP", "The Vice President"], 0, "According to Article VII, Section 18 of the Constitution, the President is the Commander-in-Chief."],
    ["Which department is primarily responsible for the conservation and management of the country's environment?", ["DENR", "DOST", "DA", "DOE"], 0, "The Department of Environment and Natural Resources (DENR) is tasked with environmental protection."],
    ["What is the term of office for the President of the Philippines?", ["6 years without reelection", "6 years with one reelection", "4 years with one reelection", "5 years without reelection"], 0, "Article VII, Sec 4: The President is elected for a term of six years and is not eligible for any reelection."],
    ["Which principle states that no person shall be deprived of life, liberty, or property without due process of law?", ["Due Process of Law", "Equal Protection", "Eminent Domain", "Police Power"], 0, "This is the Due Process clause found in Article III, Section 1 (Bill of Rights)."],
    ["The right of the State to take private property for public use upon payment of just compensation is called:", ["Eminent Domain", "Police Power", "Taxation", "Expropriation"], 0, "Eminent Domain is the inherent power of the state to take private property for public use."],
    ["What is the maximum number of consecutive terms a Senator can serve?", ["Two consecutive terms", "Three consecutive terms", "One term only", "No limit"], 0, "Senators can serve a maximum of two consecutive six-year terms."],
    ["The legislative power of the Philippines is vested in the:", ["Congress of the Philippines", "Supreme Court", "Office of the President", "Sandiganbayan"], 0, "Legislative power is vested in the Congress, which consists of the Senate and the House of Representatives."],
    ["Who has the exclusive power to declare the existence of a state of war?", ["Congress", "The President", "The Supreme Court", "The Secretary of National Defense"], 0, "Under the Constitution, only Congress, by a two-thirds vote of both Houses, has the sole power to declare a state of war."],
    ["What is the required age for a candidate running for President of the Philippines?", ["At least 40 years old on the day of election", "At least 35 years old", "At least 45 years old", "At least 50 years old"], 0, "Article VII, Sec 2: A Presidential candidate must be at least 40 years of age on the day of the election."],
    ["Which government agency is mandated to protect consumers against deceptive, unfair, and unconscionable sales acts?", ["DTI", "DOJ", "NBI", "FDA"], 0, "The Department of Trade and Industry (DTI) implements the Consumer Act of the Philippines."],
    ["What Republic Act is known as the Code of Conduct and Ethical Standards for Public Officials and Employees?", ["R.A. 6713", "R.A. 3019", "R.A. 9184", "R.A. 7160"], 0, "Republic Act 6713 outlines the ethical standards for public officials and employees."],
    ["The Anti-Graft and Corrupt Practices Act is also known as:", ["R.A. 3019", "R.A. 6713", "R.A. 10963", "R.A. 10173"], 0, "R.A. 3019 is the Anti-Graft and Corrupt Practices Act."],
    ["What is the statutory retirement age for government employees under the GSIS?", ["65 years old", "60 years old", "55 years old", "70 years old"], 0, "The compulsory retirement age for government employees is 65 years old."],
    ["Which constitutional commission oversees the civil service?", ["Civil Service Commission", "Commission on Elections", "Commission on Audit", "Ombudsman"], 0, "The Civil Service Commission (CSC) is the central personnel agency of the government."],
    ["The power to apply and interpret laws is vested in the:", ["Judiciary", "Legislative", "Executive", "Ombudsman"], 0, "Judicial power is vested in one Supreme Court and in such lower courts as may be established by law."],
    ["What is the writ that protects an individual's right to life, liberty, and security?", ["Writ of Amparo", "Writ of Habeas Corpus", "Writ of Habeas Data", "Writ of Kalikasan"], 0, "The Writ of Amparo is a remedy available to any person whose right to life, liberty, and security is violated or threatened."],
    ["A public official who betrays public trust may be removed from office through:", ["Impeachment", "Quo Warranto", "Resignation", "Recall"], 0, "High-ranking officials may be removed from office via Impeachment for betrayal of public trust, among other grounds."],
    ["The right to vote is also known as:", ["Suffrage", "Plebiscite", "Referendum", "Initiative"], 0, "Suffrage is the right and obligation to vote of qualified citizens."],
    ["Which agency is responsible for monetary policy and managing the country's banking system?", ["Bangko Sentral ng Pilipinas", "Department of Finance", "Bureau of Treasury", "NEDA"], 0, "The Bangko Sentral ng Pilipinas (BSP) is the central bank of the Philippines."],
    ["Under R.A. 6713, public officials shall file under oath their statement of assets, liabilities, and net worth (SALN) every:", ["Year", "Month", "Three Years", "Six Months"], 0, "Public officials and employees must file their SALN annually."],
    ["What is the national language of the Philippines according to the 1987 Constitution?", ["Filipino", "Tagalog", "English", "Pilipino"], 0, "Article XIV, Section 6 specifies that the national language of the Philippines is Filipino."],
    ["Which environmental law governs solid waste management in the Philippines?", ["R.A. 9003", "R.A. 8749", "R.A. 9275", "R.A. 6969"], 0, "R.A. 9003 is the Ecological Solid Waste Management Act of 2000."],
    ["Who is considered the 'Father of the Philippine Constitution'?", ["Claro M. Recto", "Jose Rizal", "Apolinario Mabini", "Andres Bonifacio"], 0, "Claro M. Recto is often referred to as the Father of the 1935 Constitution."]
];
genInfo.forEach(q => addQ(q[0], q[1], q[2], q[3]));

// 2. English (Vocabulary, Grammar, Analogies - 25 questions)
const english = [
    ["Identify the synonym of the word: METICULOUS", ["Careful", "Careless", "Messy", "Hasty"], 0, "Meticulous means showing great attention to detail; very careful and precise."],
    ["Identify the antonym of the word: EPHEMERAL", ["Permanent", "Temporary", "Short-lived", "Fleeting"], 0, "Ephemeral means lasting for a very short time, so its antonym is permanent."],
    ["Complete the analogy: Odometer is to distance as Anemometer is to:", ["Wind speed", "Temperature", "Atmospheric pressure", "Earthquake magnitude"], 0, "An odometer measures distance, while an anemometer measures wind speed."],
    ["Choose the correct spelling:", ["Accommodation", "Accomodation", "Acommodation", "Acomodation"], 0, "The correct spelling is Accommodation (two c's and two m's)."],
    ["Identify the error in the sentence: 'The bouquet of red roses smell so sweet.'", ["smell", "bouquet", "red roses", "so sweet"], 0, "The subject is 'bouquet' (singular), so the verb should be 'smells' instead of 'smell'."],
    ["Choose the correct word: 'Between you and ___, I think we will win.'", ["me", "I", "mine", "myself"], 0, "'Between' is a preposition, so it requires an object pronoun ('me')."],
    ["Identify the meaning of the idiom: 'Bite the bullet'", ["Face a difficult situation bravely", "Eat something hard", "To be extremely hungry", "To fight back physically"], 0, "To bite the bullet means to endure a painful or otherwise unpleasant situation that is seen as unavoidable."],
    ["Choose the correct form of the verb: 'Neither the manager nor the employees ___ aware of the new policy.'", ["are", "is", "was", "has been"], 0, "When using 'neither/nor', the verb agrees with the subject closest to it ('employees' -> plural 'are')."],
    ["Complete the analogy: Archipelago is to islands as constellation is to:", ["Stars", "Planets", "Galaxies", "Moons"], 0, "An archipelago is a group of islands; a constellation is a group of stars."],
    ["Identify the synonym of the word: UBIQUITOUS", ["Omnipresent", "Rare", "Unique", "Scarce"], 0, "Ubiquitous means present, appearing, or found everywhere (omnipresent)."],
    ["Identify the antonym of the word: BENIGN", ["Malignant", "Gentle", "Harmless", "Kind"], 0, "Benign means gentle or harmless; its antonym is malignant (harmful)."],
    ["Choose the correct sentence:", ["Every one of the students has passed.", "Every one of the students have passed.", "Everyone of the students has passed.", "Every one of the student have passed."], 0, "'Every one' is a singular subject, so it takes the singular verb 'has'."],
    ["What does the prefix 'omni-' mean?", ["All", "None", "Few", "Many"], 0, "'Omni-' comes from Latin meaning 'all' (e.g., omnipresent, omnivorous)."],
    ["Complete the analogy: Doctor is to hospital as chef is to:", ["Restaurant", "Kitchen", "Food", "Menu"], 0, "A doctor works in a hospital; a chef works in a restaurant."],
    ["Choose the best word to complete the sentence: 'The speaker’s words were so ___ that the audience was moved to tears.'", ["Poignant", "Apathetic", "Mundane", "Frivolous"], 0, "Poignant means evoking a keen sense of sadness or regret; deeply touching."],
    ["Choose the correct spelling:", ["Embarrassment", "Embarassment", "Embarrasment", "Embarasment"], 0, "The correct spelling is Embarrassment (two r's and two s's)."],
    ["Identify the error: 'He is one of the applicants who is qualified for the position.'", ["is qualified", "He is", "one of the", "for the position"], 0, "The pronoun 'who' refers to 'applicants' (plural), so the verb should be 'are qualified'."],
    ["What does 'status quo' mean?", ["The existing state of affairs", "A drastic change", "A legal proceeding", "A formal resignation"], 0, "Status quo is a Latin phrase meaning the current state of things."],
    ["Identify the synonym of the word: CANDID", ["Frank", "Deceptive", "Secretive", "Shy"], 0, "Candid means truthful and straightforward; frank."],
    ["Complete the analogy: Pen is to writer as scalpel is to:", ["Surgeon", "Butcher", "Carpenter", "Sculptor"], 0, "A writer uses a pen; a surgeon uses a scalpel."],
    ["Choose the correct word: 'The company distributed the profits ___ its five founders.'", ["among", "between", "with", "through"], 0, "'Among' is used for three or more entities; 'between' is used for two."],
    ["Identify the antonym of the word: MITIGATE", ["Aggravate", "Alleviate", "Lessen", "Ease"], 0, "Mitigate means to make less severe. The antonym is aggravate (make worse)."],
    ["Which word is the odd one out?", ["Enormous", "Gigantic", "Minuscule", "Colossal"], 0, "Minuscule means very small, while the others mean very large."],
    ["Identify the error: 'The data shows that our profits are increasing.'", ["shows", "The data", "that our", "are increasing"], 0, "'Data' is plural (singular is 'datum'), so the verb should technically be 'show' in strict formal English."],
    ["Complete the analogy: Bravery is to cowardice as abundance is to:", ["Scarcity", "Wealth", "Plenty", "Surplus"], 0, "Bravery and cowardice are antonyms; the antonym of abundance is scarcity."]
];
english.forEach(q => addQ(q[0], q[1], q[2], q[3]));

// 3. Procedural Math (25 questions)
for (let i = 0; i < 25; i++) {
    // Generate different types of math questions
    const type = i % 5;
    if (type === 0) { // Age Problem
        const p1 = Math.floor(Math.random() * 10) + 5;
        const p2 = p1 * 2;
        const diff = p2 - p1;
        const question = `Mark is ${p1} years old and his father is ${p2} years old. In how many years will his father's age be exactly 1.5 times Mark's age?`;
        // Eq: (p2 + x) = 1.5 * (p1 + x) => p2 + x = 1.5p1 + 1.5x => p2 - 1.5p1 = 0.5x => x = 2 * (p2 - 1.5p1)
        const ans = Math.round(2 * (p2 - 1.5 * p1));
        addQ(question, [String(ans), String(ans + 2), String(Math.abs(ans - 3)), String(ans + 5)], 0, `Let x be the number of years. (${p2} + x) = 1.5(${p1} + x). Solving for x gives ${ans} years.`);
    } else if (type === 1) { // Work Problem
        const t1 = Math.floor(Math.random() * 5) + 3; // 3 to 7
        const t2 = Math.floor(Math.random() * 5) + 4; // 4 to 8
        const question = `Worker A can finish a job in ${t1} hours, and Worker B can finish the same job in ${t2} hours. How many hours will it take them to finish the job working together? (Round to two decimal places)`;
        const ans = (1 / ((1/t1) + (1/t2))).toFixed(2);
        addQ(question, [ans, (parseFloat(ans) + 1.2).toFixed(2), (parseFloat(ans) - 0.5).toFixed(2), (parseFloat(ans) + 0.8).toFixed(2)], 0, `Using the formula 1/T = 1/A + 1/B, 1/T = 1/${t1} + 1/${t2}. Solving for T gives ${ans} hours.`);
    } else if (type === 2) { // Percentage Problem
        const price = (Math.floor(Math.random() * 50) + 10) * 10;
        const discount = (Math.floor(Math.random() * 4) + 1) * 10; // 10, 20, 30, 40
        const question = `A laptop originally costs ₱${price}. If it is on sale for ${discount}% off, what is the sale price?`;
        const ans = price * (1 - discount/100);
        addQ(question, [`₱${ans}`, `₱${ans + 50}`, `₱${ans - 100}`, `₱${price - discount}`], 0, `Discount amount is ${discount}% of ${price}. ${price} - (${discount/100} * ${price}) = ${ans}.`);
    } else if (type === 3) { // Distance/Speed Problem
        const speed = (Math.floor(Math.random() * 5) + 4) * 10; // 40 to 80
        const time = Math.floor(Math.random() * 3) + 2; // 2 to 4
        const distance = speed * time;
        const question = `A car travels at a constant speed of ${speed} km/h. How far will it travel in ${time} hours and 30 minutes?`;
        const ans = speed * (time + 0.5);
        addQ(question, [`${ans} km`, `${ans - 20} km`, `${ans + 40} km`, `${speed * time} km`], 0, `Distance = Speed × Time. Distance = ${speed} × ${time + 0.5} = ${ans} km.`);
    } else if (type === 4) { // Number Series
        const start = Math.floor(Math.random() * 10) + 2;
        const diff = Math.floor(Math.random() * 5) + 3;
        const qStr = `Find the next number in the series: ${start}, ${start + diff}, ${start + diff*2}, ${start + diff*3}, ?`;
        const ans = start + diff * 4;
        addQ(qStr, [String(ans), String(ans + diff - 1), String(ans - 2), String(ans + 2)], 0, `The pattern is adding ${diff} to the previous number.`);
    }
}

// 4. Logic & Analytical Reasoning (25 questions)
const logic = [
    ["If all roses are flowers, and some flowers fade quickly. Which of the following is necessarily true?", ["Some roses fade quickly.", "All roses fade quickly.", "Some flowers that fade quickly are roses.", "None of the above."], 3, "Just because some flowers fade quickly does not mean those specific flowers are roses. Hence, none can be conclusively proven."],
    ["Statement 1: All birds have wings. Statement 2: A penguin is a bird. Conclusion: A penguin has wings. Is the conclusion logical?", ["Yes, it is logically valid.", "No, because penguins cannot fly.", "No, because penguins have flippers.", "Cannot be determined."], 0, "In a categorical syllogism, if all A are B, and C is A, then C is B. It is logically valid."],
    ["In a race, if you overtake the person in second place, what position are you in?", ["First", "Second", "Third", "Last"], 1, "If you overtake the second person, you take their place, making you second."],
    ["Mary’s father has five daughters: Nana, Nene, Nini, Nono. What is the name of the fifth daughter?", ["Nunu", "Nana", "Mary", "None"], 2, "The father is Mary's father, so Mary is one of the daughters."],
    ["Which word does not belong to the group?", ["Apple", "Banana", "Carrot", "Mango"], 2, "A carrot is a root vegetable, while the others are fruits."],
    ["If A > B, and B > C, which of the following must be true?", ["A < C", "C > A", "A > C", "A = C"], 2, "By the transitive property of inequality, if A is greater than B and B is greater than C, A must be greater than C."],
    ["A man is looking at a portrait. He says, 'Brothers and sisters have I none, but that man's father is my father's son.' Who is in the portrait?", ["Himself", "His son", "His father", "His grandfather"], 1, "Since he has no brothers or sisters, 'my father's son' is himself. Thus, 'that man's father is myself'. The man in the portrait is his son."],
    ["Unscramble the letters: 'R O M I N O T'. What does it spell?", ["A type of vehicle", "A computer peripheral", "An animal", "A city"], 1, "The unscrambled word is MONITOR, which is a computer peripheral."],
    ["If some A are B, and no B are C, can we conclude that some A are not C?", ["Yes, it is a valid conclusion.", "No, it is invalid.", "Only if all A are C.", "Cannot be determined."], 0, "Since the A that overlap with B cannot be C, it is true that at least some A are not C."],
    ["Which is the odd one out?", ["Triangle", "Square", "Circle", "Pentagon"], 2, "A circle has no straight edges or corners, while the others are polygons with straight sides."],
    ["If you arrange the words 'L E P A P' to form a valid English word, what category does it belong to?", ["Fruit", "Animal", "Color", "Country"], 0, "The unscrambled word is APPLE, which is a fruit."],
    ["Statement: 'If it rains, the ground gets wet.' It is not raining. What can you conclude?", ["The ground is wet.", "The ground is not wet.", "We cannot conclude whether the ground is wet or not.", "The ground will get wet tomorrow."], 2, "The ground could be wet for other reasons (like a sprinkler). This is the fallacy of denying the antecedent."],
    ["What number comes next? 1, 1, 2, 3, 5, 8, ?", ["11", "12", "13", "15"], 2, "This is the Fibonacci sequence. The next number is 5 + 8 = 13."],
    ["If all cats purr, and Fluffy purrs, is Fluffy definitely a cat?", ["Yes", "No", "Cannot be determined", "Fluffy is a dog"], 1, "No. Just because all cats purr doesn't mean everything that purrs is a cat (e.g., a motor). This is the fallacy of affirming the consequent."],
    ["Find the odd one out.", ["Piano", "Violin", "Guitar", "Cello"], 0, "A piano is a percussion/keyboard instrument, while the others are stringed instruments played with a bow or plucked directly."],
    ["If 'DOG' is coded as 'FQI', how is 'CAT' coded?", ["ECV", "DBU", "FDW", "EDU"], 0, "Each letter is shifted forward by 2 in the alphabet. C(+2)=E, A(+2)=C, T(+2)=V."],
    ["Which is heavier: a pound of feathers or a pound of bricks?", ["A pound of feathers", "A pound of bricks", "They weigh the same", "Cannot be determined"], 2, "Both weigh one pound."],
    ["A doctor gives you three pills and tells you to take one every half hour. How long will the pills last?", ["30 minutes", "1 hour", "1.5 hours", "2 hours"], 1, "You take the first pill at 0 mins, the second at 30 mins, and the third at 60 mins (1 hour)."],
    ["Some businessmen are rich. All rich people are happy. What can be concluded?", ["All businessmen are happy.", "Some businessmen are happy.", "No businessmen are happy.", "All happy people are businessmen."], 1, "Since some businessmen are rich, and all rich people are happy, those specific businessmen must be happy."],
    ["Look at this series: 36, 34, 30, 28, 24, ... What number should come next?", ["20", "22", "23", "26"], 1, "The pattern is alternating subtraction: -2, -4, -2, -4. So, 24 - 2 = 22."],
    ["Which word is the odd one out?", ["Happy", "Joyful", "Ecstatic", "Melancholy"], 3, "Melancholy means sad, while the others mean happy."],
    ["If yesterday was two days before Monday, what day is it today?", ["Saturday", "Sunday", "Tuesday", "Wednesday"], 1, "Two days before Monday is Saturday. If yesterday was Saturday, today is Sunday."],
    ["If building A is taller than building B, and building C is shorter than building B, which is the shortest?", ["Building A", "Building B", "Building C", "Cannot be determined"], 2, "A > B > C. Therefore, C is the shortest."],
    ["A clock shows the time as 3:15. What is the angle between the hour and minute hands?", ["0 degrees", "7.5 degrees", "15 degrees", "30 degrees"], 1, "At 3:15, the minute hand is exactly on the 3. The hour hand has moved 1/4 of the way past the 3. The angle between hours is 30 degrees. 1/4 of 30 is 7.5 degrees."],
    ["Which of the following is an anagram of 'LISTEN'?", ["SILENT", "LINENS", "ENLISTS", "TINSELS"], 0, "SILENT uses the exact same letters as LISTEN."]
];
logic.forEach(q => addQ(q[0], q[1], q[2], q[3]));

// Write to ts file
const fileContent = `// Auto-generated 100 Civil Service Exam Questions
export const QUESTION_BANK = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync('src/app/[locale]/civil-service-reviewer/questions.ts', fileContent);
console.log('Successfully generated 100 questions.');
