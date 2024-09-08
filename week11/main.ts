let monsterName: string;
let level: number;
let hasGold: boolean;
let skill: undefined;
let area: null;

monsterName = "코드잇 고블린";
level = 255;
hasGold = false;
skill = undefined;
area = null;

console.log(
  `${monsterName}의 레벨은 ${level}이고,\n` +
    `${
      hasGold ? "해치우면 골드를 얻는" : "해치워도 골드를 주지 않는"
    } 몬스터입니다.\n` +
    `${skill ? `가진 능력은 ${skill} 이고 \n` : ""}` +
    `${area ? `출현 지역은 ${area} 입니다.` : ""}`
);
