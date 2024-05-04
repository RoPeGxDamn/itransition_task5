import { allFakers, faker } from "@faker-js/faker";
import { getRandomInt } from "./getRandomInt";

const geoAlpha = [
  "ა",
  "ბ",
  "გ",
  "დ",
  "ე",
  "ვ",
  "ზ",
  "თ",
  "ი",
  "კ",
  "ლ",
  "მ",
  "ნ",
  "ო",
  "პ",
  "ჟ",
  "რ",
  "ს",
  "ტ",
  "უ",
  "ფ",
  "ქ",
  "ღ",
  "ყ",
  "შ",
  "ჩ",
  "ც",
  "ძ",
  "წ",
  "ჭ",
  "ხ",
  "ჯ",
  "ჰ",
];
const ruAlpha = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я",
];
const gerAlpha = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ä",
  "Ö",
  "Ü",
  "ẞ",
];

const alphaObj = {
  de: gerAlpha,
  ru: ruAlpha,
  ka_GE: geoAlpha,
};

export const removeRandomChar = (str) => {
  const index = getRandomInt(+str?.length);
  return str.slice(0, index - 1) + str.slice(index);
};

export const addRandomChar = (str, region) => {
  const index = getRandomInt(+str.length);
  const arr = str.split("");
  arr.splice(index, 0, faker.helpers.arrayElement(alphaObj[region]));
  return arr.join("");
};

export const replaceRandomChar = (str) => {
  const index = getRandomInt(+str.length);
  const arr = str.split("");
  let tmp = arr[index];
  if (index == 0) arr[index] = arr[index + 1];
  else arr[index] = arr[index - 1];
  arr[index - 1] = tmp;
  return arr.join("");
};

export const generateErrors = (collection, errCount, region) => {
  const customFaker = allFakers[region];
  const probOfLast =
    errCount < 1 ? errCount : errCount % Number.parseInt(errCount);
  console.log(probOfLast);

  return collection.map((item) => {
    let errItem = item;
    for (let i = 0; i <= errCount; i++) {
      if (probOfLast == 0 && i == parseInt(errCount)) break;
      const randomProperty = faker.helpers.arrayElement([
        "fullname",
        "address",
        "phoneNumber",
      ]);
      const funcArr = [
        removeRandomChar(errItem[randomProperty]),
        addRandomChar(errItem[randomProperty], region),
        replaceRandomChar(errItem[randomProperty]),
      ];

      if (errItem[randomProperty].length > 30) {
        errItem[randomProperty] = removeRandomChar(errItem[randomProperty]);
      } else {
        i == parseInt(errCount) && probOfLast < 1
          ? faker.helpers.maybe(
              () => {
                errItem[randomProperty] = funcArr[getRandomInt(3)];
              },
              { probability: probOfLast }
            )
          : (errItem[randomProperty] = funcArr[getRandomInt(3)]);
      }
    }
    return errItem;
  });
};
