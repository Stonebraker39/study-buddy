// src/utils/loadClassesToFirebase.js
import { db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const loadClassesToFirebase = async () => {
  const classList = [
    { id: 'csci1110', name: 'CSCI 1110 - Computer Science Principles' },
    { id: 'csci1115g', name: 'CSCI 1115G - Modern Computing in Practice' },
    { id: 'csci1120', name: 'CSCI 1120 - Introduction to Computer Animation' },
    { id: 'csci1210', name: 'CSCI 1210 - Computer Programming Fundamentals' },
    { id: 'csci1220', name: 'CSCI 1220 - Computer Programming Fundamentals: Python' },
    { id: 'csci1225', name: 'CSCI 1225 - Python Programming II' },
    { id: 'csci1235', name: 'CSCI 1235 - R Programming I' },
    { id: 'csci1240', name: 'CSCI 1240 - C++ Programming I' },
    { id: 'csci1720', name: 'CSCI 1720 - Computer Science I' },
    { id: 'csci2210', name: 'CSCI 2210 - Object-Oriented Programming' },
    { id: 'csci2220', name: 'CSCI 2220 - Introduction to Data Structures and Algorithms' },
    { id: 'csci2230', name: 'CSCI 2230 - Assembly Language and Machine Organization' },
    { id: 'csci2310', name: 'CSCI 2310 - Discrete Mathematics for Computer Science' },
    { id: 'csci2410', name: 'CSCI 2410 - Practical Programming' },
    { id: 'csci2996', name: 'CSCI 2996 - Special Topics' },
    { id: 'csci3410', name: 'CSCI 3410 - Introduction to Intelligent Agents Using Science Fiction' },
    { id: 'csci3710', name: 'CSCI 3710 - Software Development' },
    { id: 'csci3720', name: 'CSCI 3720 - Data Structures and Algorithms' },
    { id: 'csci3730', name: 'CSCI 3730 - Compilers and Automata Theory' },
    { id: 'csci3790', name: 'CSCI 3790 - Algorithm Design & Implementation' },
    { id: 'csci3997', name: 'CSCI 3997 - Independent Study' },
    { id: 'csci4105', name: 'CSCI 4105 - Programming Language Structure I' },
    { id: 'csci4110', name: 'CSCI 4110 - Computing Ethics and Social Implications of Computing' },
    { id: 'csci4120', name: 'CSCI 4120 - Operating Systems I' },
    { id: 'csci4130', name: 'CSCI 4130 - Linux System Administration' },
    { id: 'csci4140', name: 'CSCI 4140 - Database Management Systems I' },
    { id: 'csci4205', name: 'CSCI 4205 - Computer Security' },
    { id: 'csci4215', name: 'CSCI 4215 - Parallel Programming' },
    { id: 'csci4220', name: 'CSCI 4220 - Cloud and Edge Computing' },
    { id: 'csci4225', name: 'CSCI 4225 - Introduction to Cryptography' },
    { id: 'csci4235', name: 'CSCI 4235 - Cellular Networks and Mobile Computing' },
    { id: 'csci4240', name: 'CSCI 4240 - Software Reverse Engineering' },
    { id: 'csci4245', name: 'CSCI 4245 - Computer Networks I' },
    { id: 'csci4250', name: 'CSCI 4250 - Human-Centered Computing' },
    { id: 'csci4255', name: 'CSCI 4255 - Digital Game Design' },
    { id: 'csci4265', name: 'CSCI 4265 - Modern Web Technologies' },
    { id: 'csci4270', name: 'CSCI 4270 - Principles of Virtual Reality' },
    { id: 'csci4310', name: 'CSCI 4310 - Bioinformatics Programming' },
    { id: 'csci4410', name: 'CSCI 4410 - Computer Graphics I' },
    { id: 'csci4415', name: 'CSCI 4415 - Introduction to Data Mining' },
    { id: 'csci4430', name: 'CSCI 4430 - Graph Data Mining' },
    { id: 'csci4435', name: 'CSCI 4435 - Text Mining and Natural Language Processing' },
    { id: 'csci4440', name: 'CSCI 4440 - Generative Artificial Intelligence' },
    { id: 'csci4980', name: 'CSCI 4980 - Senior Project' },
    { id: 'csci4996', name: 'CSCI 4996 - Special Topics' },
    { id: 'csci4999', name: 'CSCI 4999 - Senior Thesis' },
  ];

  for (const cls of classList) {
    await setDoc(doc(db, 'classes', cls.id), {
      id: cls.id,
      name: cls.name,
    });
    console.log(`Added ${cls.id} to Firestore`);
  }
};
