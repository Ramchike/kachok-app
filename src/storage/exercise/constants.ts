import { Difficulty, EquipmentItem, Exercise, TagItem } from ".";
import {LiaDumbbellSolid} from 'react-icons/lia'
import { GrYoga } from "react-icons/gr";
import { GiAbdominalArmor, GiArm, GiLeg, GiMuscularTorso } from "react-icons/gi";
import { FaGripLines, FaRug } from "react-icons/fa6";
import { IoBody } from "react-icons/io5"
import { TbBarbellFilled, TbJumpRope} from "react-icons/tb";
import { FaHeartPulse } from "react-icons/fa6";
import { exerciseImages } from "../../assets";
import { SiSpine } from "react-icons/si";


export const difficultyOptions: {[key in Difficulty]: string} = {
    1: 'Новичок', 
    2: 'Любитель', 
    3: 'Продвинутый', 
}

export const equipmentList: EquipmentItem[] = [
  { 
    id: 'dumbbells', 
    name: 'Гантели',
    icon: LiaDumbbellSolid,
    color: 'bg-blue-500'
  },
  { 
    id: 'rope', 
    name: 'Скакалка',
    icon: TbJumpRope,
    color: 'bg-green-500' 
  },
  { 
    id: 'mat', 
    name: 'Коврик',
    icon: FaRug,
    color: 'bg-purple-500'
  },
  { 
    id: 'barbell', 
    name: 'Штанга',
    icon: TbBarbellFilled,
    color: 'bg-red-500'
  },
  { 
    id: 'resistanceBand', 
    name: 'Лента',
    icon: FaGripLines,
    color: 'bg-orange-500'
  },
];

export const tagList: TagItem[] = [
  { 
    id: 'legs', 
    name: 'Ноги',
    icon: GiLeg,
    color: 'bg-purple-500'
  },
  { 
    id: 'arms', 
    name: 'Руки',
    icon: GiArm,
    color: 'bg-orange-500'
  },
  { 
    id: 'chest', 
    name: 'Грудь',
    icon: GiMuscularTorso,
    color: 'bg-red-500'
  },
  { 
    id: 'fullBody', 
    name: 'Все тело',
    icon: IoBody,
    color: 'bg-blue-500'
  },
  { 
    id: 'cardio', 
    name: 'Кардио',
    icon: FaHeartPulse ,
    color: 'bg-green-500'
  },
  { 
    id: 'stretching', 
    name: 'Растяжка',
    icon:  GrYoga ,
    color: 'bg-yellow-500'
  },
  { 
    id: 'core', 
    name: 'Кор',
    icon: GiAbdominalArmor,
    color: 'bg-red-500'
  },
  { 
    id: 'back', 
    name: 'Спина',
    icon: SiSpine ,
    color: 'bg-red-500'
  },
];

export const exercisesDefault: Exercise[] = [
  // Смешные
  {
    id: 1,
    name: "Пингвиньи шаги",
    instruction: `1. Лягте на спину, ноги согните в коленях и подтяните к ягодицам.
2. Отрывайте плечи и голову от пола, сохраняя поясницу прижатой.
3. Поочередно касайтесь руками внешней стороны стоп.

Акцент: косые мышцы живота (80% нагрузки), прямая мышца пресса.
Совет: имитируйте переваливающуюся походку пингвина для большей амплитуды.`,
    difficulty: 1,
    equipment: [],
    tags: ["core"],
    is_pined: false,
    image: exerciseImages.exercise1
  },
  {
    id: 2,
    name: "Крабья прогулка",
    instruction: `1. Сядьте на пол, упритесь ладонями и стопами.
2. Поднимите таз до параллели бедер с полом.
3. Передвигайтесь вперед или назад, синхронизируя руку и ногу.

Варианты:
- Ходьба боком усиливает косые мышцы.
- Лестничный краб (подъем по ступеням).

Работает: трицепсы (45%), ягодицы (30%), кора (25%).`,
    difficulty: 2,
    equipment: [],
    tags: ["fullBody"],
    is_pined: false,
    image: exerciseImages.exercise2
  },
  {
    id: 3,
    name: "Танцующий бурпи",
    instruction: `1. Из положения стоя выполните присед, затем упор лежа и отжимание.
2. При подъеме добавьте джазовое движение рук (волна или круги).
3. Завершите прыжком с хлопком над головой.

Модификации:
- Без отжимания для начинающих.
- С поворотом на 180 градусов при прыжке.

Эффект: сжигает 12-15 ккал/мин, высокая кардио-нагрузка.`,
    difficulty: 3,
    equipment: [],
    tags: ["cardio"],
    is_pined: false,
    image: exerciseImages.exercise3
  },
  {
    id: 4,
    name: "Приседания с выпрыгиванием",
    instruction: `1. Ноги на ширине плеч, приседайте до угла 90 градусов в коленях.
2. Взрывным движением выпрыгните вверх, руки тяните к потолку.
3. Мягко приземляйтесь на носки с переходом на пятку.

Ошибки:
- Колени не должны уходить внутрь (риск травм).
- Не распрямляйтесь полностью в прыжке.

Польза: увеличивает мощность прыжка на 37% через 8 недель тренировок.`,
    difficulty: 3,
    equipment: [],
    tags: ["legs"],
    is_pined: false,
    image: exerciseImages.exercise4
  },
  {
    id: 5,
    name: "Планка с подтягиванием колен",
    instruction: `1. Примите положение классической планки.
2. Поочередно подтягивайте колени к груди.
3. Сохраняйте таз на уровне плеч.

Варианты:
- Двойное подтягивание (оба колена одновременно).
- Используйте резиновую ленту для усиления нагрузки.

Активация мышц:
- Поперечная мышца живота (60%).
- Плечи (20%).`,
    difficulty: 2,
    equipment: ["mat"],
    tags: ["core"],
    is_pined: false,
    image: exerciseImages.exercise5
  },
  {
    id: 6,
    name: "Боковые выпады",
    instruction: `1. Сделайте широкий шаг в сторону с переносом веса на рабочую ногу.
2. Колено рабочей ноги не должно выходить за носок.
3. Вернитесь в исходное положение через толчок пяткой.

Глубина:
- Для новичков угол в колене около 45 градусов.
- Для продвинутых бедро параллельно полу.

Работают приводящие мышцы (70%) и квадрицепсы (30%).`,
    difficulty: 1,
    equipment: ["dumbbells"],
    tags: ["legs"],
    is_pined: false,
    image: exerciseImages.exercise6
  },
  {
    id: 7,
    name: "Воздушные поцелуи мышцам",
    instruction: `1. Согните руку в локте под углом 90 градусов (поза "покажи бицепс").
2. Напрягая мышцу, посылайте ей воздушный поцелуй со звуком "чмок".
3. Чередуйте руки, добавляя вращение кисти.

Психологический эффект:
- Повышает мотивацию на тренировке (+23%).
- Снижает восприятие усталости.`,
    difficulty: 1,
    equipment: [],
    tags: ["arms"],
    is_pined: false,
    image: exerciseImages.exercise7
  },
  {
    id: 8,
    name: "Медвежья походка",
    instruction: `1. Встаньте на четвереньки, оторвите колени на несколько сантиметров от пола.
2. Передвигайтесь мелкими шагами, синхронизируя руку и противоположную ногу.
3. Спину держите параллельно полу.

Сложность:
- Добавьте рюкзак с весом для увеличения нагрузки.
- Выполняйте упражнение по наклонной поверхности.`,
    difficulty: 3,
    equipment: [],
    tags: ["fullBody"],
    is_pined: false,
    image: exerciseImages.exercise8
  },
  {
  id: 9,
  name: "Супермен на диване",
  instruction: `1. Лягте на живот так, чтобы руки и ноги свисали с дивана.
2. Одновременно поднимайте руки и ноги вверх, как супермен в полете.
3. Задержитесь в верхней точке на секунду, затем медленно опуститесь.`,
  difficulty: 1,
  equipment: [],
  tags: ["core"],
  is_pined: false,
  image: exerciseImages.exercise9
  },
   {
    id :10,
    name :"Бокс с тенью",
    instruction :"1.Встаньте в боксерскую стойку.\n"
                +"2.Наносите удары в воздух, имитируя реальный бой.\n"
                +"3.Добавьте уклоны и перемещения для большей реалистичности.",
    difficulty :2,
    equipment :['rope'],
    tags :["arms", "cardio"],
    is_pined :false,
    image: exerciseImages.exercise10
   },
   {
    id :11,
    name :"Кошачья спина",
    instruction :"1.Встаньте на четвереньки, руки и колени расположены на ширине плеч.\n"
                +"2.На вдохе прогните спину вниз и поднимите голову вверх.\n"
                +"3.На выдохе выгните спину дугой и прижмите подбородок к груди.",
    difficulty :1,
    equipment :[],
    tags :["core", "stretching"],
    is_pined :false,
    image: exerciseImages.exercise11
   },
   {
    id :12,
    name :"Звездные прыжки",
    instruction :"1.Встаньте прямо, ноги вместе, руки вдоль тела.\n"
                +"2.В прыжке разведите ноги в стороны и поднимите руки над головой, образуя звезду.\n"
                +"3.Вернитесь в исходное положение и повторите.",
    difficulty :2,
    equipment :[],
    tags :["cardio"],
    is_pined :false,
    image: exerciseImages.exercise12
   },
   {
    id :13,
    name :"Стульчик у стены",
    instruction :"1.Прислонитесь спиной к стене.\n"
                +"2.Скользите вниз до положения, когда колени согнуты под углом в 90 градусов.\n"
                +"3.Удерживайте это положение как можно дольше.",
    difficulty :3,
    equipment :[],
    tags :["legs"],
    is_pined :false,
    image: exerciseImages.exercise13
   },
   {
    id :14,
    name :"Ветряная мельница",
    instruction :"1.Встаньте прямо, ноги шире плеч.\n"
                +"2.Наклонитесь вбок, пытаясь коснуться рукой противоположной ноги.\n"
                +"3.Вернитесь в исходное положение и повторите в другую сторону.",
    difficulty :2,
    equipment :[],
    tags :["core", "stretching"],
    is_pined :false,
    image: exerciseImages.exercise14
   },
   {
    id :15,
    name :"Лягушка-путешественница",
    instruction :"1.Присядьте на корточки, руки на полу перед собой.\n"
                +"2.Выпрыгните вперед, как лягушка, перемещая руки вперед.\n"
                +"3.Продолжайте прыгать вперед, преодолевая расстояние.",
    difficulty :3,
    equipment :['resistanceBand'],
    tags :["legs", "cardio"],
    is_pined :false,
    image: exerciseImages.exercise15
  }
];