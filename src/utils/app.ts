// import { SelectionOption } from "src/types/typings.t";

const generateId: () => string = () => {
  const cardLoops = 3;
  let cardNumber = "";
  for (let index = 0; index <= cardLoops; index++) {
    const number = Math.floor(Math.random() * 1000);
    cardNumber = cardNumber + number;
  }

  return generateNumberWithDashes(cardNumber);
};

const generateNumberWithDashes: (number: string) => string = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, "-");
};

const generateAvatar: (name: string) => string = (name) =>
  `https://ui-avatars.com/api/?name=${name}&background=170140&color=fff&bold=true&font-size=0.33`;

// const generateACleanSet = (arrayOfData: SelectionOption[]) => {
//   const cleanSet = new Set();

//   arrayOfData.map((data) => {
//     cleanSet.add(data.value);
//   });

//   return [...cleanSet.values()] as number[];
// };

const appUtils = {
  generateAvatar,
  generateId,
};

export default appUtils;
