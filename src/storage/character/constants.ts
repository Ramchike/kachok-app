import { BodyPart, CharacterLevel, Gender, ItemWithLevels } from "./type";
import { characterImages } from "../../assets";
import { GiArmoredPants, GiForearm } from "react-icons/gi";
import { IoShirt } from "react-icons/io5";
import { BsHeadsetVr } from "react-icons/bs";
import { PiSneakerFill } from "react-icons/pi";

export const levelExperience = {
  1: 100,
  2: 250,
  3: 500
};

export const bodyPartIcons = {
  body: IoShirt,
  legs: GiArmoredPants,
  arms: GiForearm,
  head: BsHeadsetVr,
  boots: PiSneakerFill
};

export const bodyPartLabels: Record<BodyPart, string> = {
  body: 'Тело',
  legs: 'Ноги',
  arms: 'Руки',
  head: 'Голова',
  boots: 'Обувь'
}

export const CharacterAvatars: Record<Gender, Record<CharacterLevel, string>> = {
  male: {
    1: characterImages.character_man_1,
    2: characterImages.character_man_2,
    3: characterImages.character_man_3,
  },
  female: {
    1: characterImages.character_woman_1,
    2: characterImages.character_woman_2,
    3: characterImages.character_woman_3,
  }
}

export const Items: Record<Gender, Record<BodyPart, ItemWithLevels[]>> = {
  male: {
    arms: [
      {
        id: 'barbell',
        name: 'Штанга поцелуев',
        price: 0,
        body_part: 'arms',
        lvl_img: {
          1: characterImages.arms_barbell_1,
          2: characterImages.arms_barbell_2,
          3: characterImages.arms_barbell_3,
        }
      },
      {
        id: 'dumbell',
        name: 'Гантели питомцы',
        price: 0,
        body_part: 'arms',
        lvl_img: {
          1: characterImages.arms_dumbell_1,
          2: characterImages.arms_dumbell_2,
          3: characterImages.arms_dumbell_3,
        }
      },
      {
        id: 'ege',
        name: 'Учебник',
        price: 50,
        body_part: 'arms',
        lvl_img: {
          1: characterImages.arms_ege_1,
          2: characterImages.arms_ege_2,
          3: characterImages.arms_ege_3,
        }
      },
    ],
    body: [
      {
        id: 'shahov',
        name: 'Код в качалке',
        price: 300,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_shahov_1,
          2: characterImages.body_shahov_2,
          3: characterImages.body_shahov_3,
        }
      },
      {
        id: 'ios',
        name: 'Яблоко в качалке',
        price: 300,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_ios_1,
          2: characterImages.body_ios_2,
          3: characterImages.body_ios_3,
        }
      },
      {
        id: 'dano',
        name: 'Статистика в качалке',
        price: 120,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_dano_1,
          2: characterImages.body_dano_2,
          3: characterImages.body_dano_3,
        }
      },
      {
        id: 'jesus',
        name: 'Святой качок',
        price: 0,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_jesus_1,
          2: characterImages.body_jesus_2,
          3: characterImages.body_jesus_3,
        }
      },
      {
        id: 'new_year',
        name: 'Праздник на животе',
        price: 180,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_new_year_1,
          2: characterImages.body_new_year_2,
          3: characterImages.body_new_year_3,
        }
      },
      {
        id: 'red_body',
        name: 'Красный перец',
        price: 130,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_red_1,
          2: characterImages.body_red_2,
          3: characterImages.body_red_3,
        }
      },
      {
        id: 'smile',
        name: 'Улыбка подмышками',
        price: 110,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_smile_1,
          2: characterImages.body_smile_2,
          3: characterImages.body_smile_3,
        }
      },
      {
        id: 'smoking',
        name: 'Элегантный потяг',
        price: 250,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_smoking_1,
          2: characterImages.body_smoking_2,
          3: characterImages.body_smoking_3,
        }
      },
      {
        id: 'think',
        name: 'Мыслитель в отпуске',
        price: 140,
        body_part: 'body',
        lvl_img: {
          1: characterImages.body_think_1,
          2: characterImages.body_think_2,
          3: characterImages.body_think_3,
        }
      },
    ],
    boots: [
      {
        id: 'green',
        name: 'Зелёные попрыгунчики',
        price: 160,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.boots_green_1,
          2: characterImages.boots_green_2,
          3: characterImages.boots_green_3,
        }
      },
      {
        id: 'red',
        name: 'Красные драконы',
        price: 170,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.boots_red_1,
          2: characterImages.boots_red_2,
          3: characterImages.boots_red_3,
        }
      },
      {
        id: 'violet',
        name: 'Фиолетовое безумие',
        price: 180,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.boots_violet_1,
          2: characterImages.boots_violet_2,
          3: characterImages.boots_violet_3,
        }
      },
      {
        id: 'white_green',
        name: 'Мятная свежесть',
        price: 150,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.boots_white_green_1,
          2: characterImages.boots_white_green_2,
          3: characterImages.boots_white_green_3,
        }
      },
      {
        id: 'white_red',
        name: 'Клубничный всплеск',
        price: 140,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.boots_white_red_1,
          2: characterImages.boots_white_red_2,
          3: characterImages.boots_white_red_3,
        }
      },
      {
        id: 'white_violet',
        name: 'Лавандовые сны',
        price: 130,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.boots_white_violet_1,
          2: characterImages.boots_white_violet_2,
          3: characterImages.boots_white_violet_3,
        }
      },
      {
        id: 'white_yellow',
        name: 'Банановый рай',
        price: 120,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.boots_white_yellow_1,
          2: characterImages.boots_white_yellow_2,
          3: characterImages.boots_white_yellow_3,
        }
      },
    ],
    head: [
      {
        id: 'crown_1',
        name: 'Корона качка',
        price: 300,
        body_part: 'head',
        lvl_img: {
          1: characterImages.head_crown_1,
          2: characterImages.head_crown_2,
          3: characterImages.head_crown_3,
        }
      },
      {
        id: 'gas_1',
        name: 'Противогаз марсианина',
        price: 250,
        body_part: 'head',
        lvl_img: {
          1: characterImages.head_gas_1,
          2: characterImages.head_gas_2,
          3: characterImages.head_gas_3,
        }
      },
      {
        id: 'indus_1',
        name: 'Тюрбан мудреца',
        price: 220,
        body_part: 'head',
        lvl_img: {
          1: characterImages.head_indus_1,
          2: characterImages.head_indus_2,
          3: characterImages.head_indus_3,
        }
      },
      {
        id: 'yellow_1',
        name: 'Кепка солнечного удара',
        price: 180,
        body_part: 'head',
        lvl_img: {
          1: characterImages.head_yellow_1,
          2: characterImages.head_yellow_2,
          3: characterImages.head_yellow_3,
        }
      },
    ],
    legs: [
      {
        id: 'pants_cat_1',
        name: 'Кошачья грация',
        price: 190,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.legs_pants_cat_1,
          2: characterImages.legs_pants_cat_2,
          3: characterImages.legs_pants_cat_3,
        }
      },
      {
        id: 'pants_gray_1',
        name: 'Серая мышь на тусовке',
        price: 0,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.legs_pants_gray_1,
          2: characterImages.legs_pants_gray_2,
          3: characterImages.legs_pants_gray_3,
        }
      },
      {
        id: 'pants_horror_1',
        name: 'Крик моды',
        price: 0,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.legs_pants_horror_1,
          2: characterImages.legs_pants_horror_2,
          3: characterImages.legs_pants_horror_3,
        }
      },
      {
        id: 'pants_people_1',
        name: 'Человеческий фактор',
        price: 210,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.legs_pants_people_1,
          2: characterImages.legs_pants_people_2,
          3: characterImages.legs_pants_people_3,
        }
      },
      {
        id: 'pants_red_1',
        name: 'Красная тревога',
        price: 195,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.legs_pants_red_1,
          2: characterImages.legs_pants_red_2,
          3: characterImages.legs_pants_red_3,
        }
      },
      {
        id: 'pants_violet_1',
        name: 'Фиолетовое настроение',
        price: 185,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.legs_pants_violet_1,
          2: characterImages.legs_pants_violet_2,
          3: characterImages.legs_pants_violet_3,
        }
      },
      {
        id: 'short_black_blue_1',
        name: 'Синяя бездна',
        price: 160,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.legs_short_black_blue_1,
          2: characterImages.legs_short_black_blue_2,
          3: characterImages.legs_short_black_blue_3,
        }
      },
      {
        id: 'short_blue_1',
        name: 'Морской бриз',
        price: 150,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.legs_short_blue_1,
          2: characterImages.legs_short_blue_2,
          3: characterImages.legs_short_blue_3,
        }
      },
    ],
  },
  female: {
    arms: [],
    head: [
      {
        id: 'cat',
        name: 'Кошачий фит',
        price: 100,
        body_part: 'head',
        lvl_img: {
          1: characterImages.fe_cat_1,
          2: characterImages.fe_cat_2,
          3: characterImages.fe_cat_3,
        }
      },
      {
        id: 'crown',
        name: 'Корона силы',
        price: 200,
        body_part: 'head',
        lvl_img: {
          1: characterImages.fe_crown_1,
          2: characterImages.fe_crown_2,
          3: characterImages.fe_crown_3,
        }
      },
      {
        id: 'gas',
        name: 'Маска качка',
        price: 150,
        body_part: 'head',
        lvl_img: {
          1: characterImages.fe_gas_1,
          2: characterImages.fe_gas_2,
          3: characterImages.fe_gas_3,
        }
      },
    ],
    boots: [
      {
        id: 'gray',
        name: 'Серые тяжи',
        price: 80,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.fe_boots_gray_1,
          2: characterImages.fe_boots_gray_2,
          3: characterImages.fe_boots_gray_3,
        }
      },
      {
        id: 'rainbow',
        name: 'Радужные прыжки',
        price: 120,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.fe_boots_rainbow_1,
          2: characterImages.fe_boots_rainbow_2,
          3: characterImages.fe_boots_rainbow_3,
        }
      },
      {
        id: 'red',
        name: 'Красные рывки',
        price: 90,
        body_part: 'boots',
        lvl_img: {
          1: characterImages.fe_boots_red_1,
          2: characterImages.fe_boots_red_2,
          3: characterImages.fe_boots_red_3,
        }
      },
    ],
    body: [
      {
        id: 'basket_blue',
        name: 'Синий качкомайк',
        price: 0,
        body_part: 'body',
        lvl_img: {
          1: characterImages.fe_basket_blue_1,
          2: characterImages.fe_basket_blue_2,
          3: characterImages.fe_basket_blue_3,
        }
      },
      {
        id: 'basket_violet',
        name: 'Фиолетовый качкомайк',
        price: 150,
        body_part: 'body',
        lvl_img: {
          1: characterImages.fe_backet_violet_1,
          2: characterImages.fe_backet_violet_2,
          3: characterImages.fe_backet_violet_3,
        }
      },
      {
        id: 'basket_red',
        name: 'Красный качкомайк',
        price: 150,
        body_part: 'body',
        lvl_img: {
          1: characterImages.fe_basket_red_1,
          2: characterImages.fe_basket_red_2,
          3: characterImages.fe_basket_red_3,
        }
      },
      {
        id: 'prod',
        name: 'Топик-разработчик',
        price: 100,
        body_part: 'body',
        lvl_img: {
          1: characterImages.fe_prod_1,
          2: characterImages.fe_prod_2,
          3: characterImages.fe_prod_3,
        }
      },
      {
        id: 'topic_blue',
        name: 'Синий топик зала',
        price: 80,
        body_part: 'body',
        lvl_img: {
          1: characterImages.fe_topic_blue_1,
          2: characterImages.fe_topic_blue_2,
          3: characterImages.fe_topic_blue_3,
        }
      },
    ],
    legs: [
      {
        id: 'green',
        name: 'Зеленые приседы',
        price: 0,
        body_part: 'legs',
        lvl_img: {
          1: characterImages.fe_legs_green_1,
          2: characterImages.fe_legs_green_2,
          3: characterImages.fe_legs_green_3,
        }
      },
    ],
  }  
};