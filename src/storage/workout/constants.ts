import { ExerciseType, Workout } from "./type"

export const motivationalQuotes = [
    "Каждая тренировка — это шаг к лучшей версии себя",
    "Успех — это сумма небольших усилий, повторяющихся изо дня в день",
    "Не важно, как медленно ты продвигаешься, главное — не останавливаться",
    "Твоё тело может всё. Мы оба это знаем"
]

export const ExerciseTypeToText: Record<ExerciseType, string> = {
  reps: 'повт.',
  time: 'сек.',
  weight: 'кг'
}

export const workoutsDefault: Workout[] = [
    { 
      id: 1,
      name: "Зоопарк-тренировка",
      description: "Тренировка для тех, кто хочет почувствовать себя животным",
      exercises: [
        { exerciseId: 2, sets: 3, reps: 10 }, // Краб
        { exerciseId: 8, sets: 3, reps: 15 }, // Медведь
        { exerciseId: 1, sets: 2, reps: 20 }  // Пингвин
      ],
      tags: ["fullBody"],
      difficulty: 2,
      estimatedTime: 25,
      createdAt: "2025-02-16",
      timesUsed: 0
    },
    { 
      id: 2,
      name: "Интенсивный вызов",
      description: "Пробиваем потолок возможностей",
      exercises: [
        { exerciseId: 4, sets: 4, reps: 12 }, // Выпрыгивания
        {
            exerciseId: 5, sets: 3, time: 60,
            reps: 0
        }, // Планка
        { exerciseId: 15, sets: 4, reps: 10 } // Лягушка
      ],
      tags: ["legs", "core"],
      difficulty: 3,
      estimatedTime: 35,
      createdAt: "2025-02-16",
      timesUsed: 0
    },
    { 
      id: 3,
      name: "Утро кота-йога",
      description: "Проснись и порхай",
      exercises: [
        {
            exerciseId: 11, sets: 3, time: 30,
            reps: 4
        }, // Кошка
        { exerciseId: 7, sets: 2, reps: 15 },  // Поцелуи
        { exerciseId: 14, sets: 3, reps: 12 }  // Мельница
      ],
      tags: ["stretching", "core"],
      difficulty: 1,
      estimatedTime: 20,
      createdAt: "2025-02-16",
      timesUsed: 0
    },
    { 
      id: 4,
      name: "Руки-базуки",
      description: "Для тех, кто хочет пожать хоть что-то",
      exercises: [
        { exerciseId: 10, sets: 4, reps: 20 }, // Бокс
        { exerciseId: 7, sets: 3, reps: 15 },  // Поцелуи
        { exerciseId: 2, sets: 2, reps: 10 }   // Краб
      ],
      tags: ["arms"],
      difficulty: 2,
      estimatedTime: 25,
      createdAt: "2025-02-16",
      timesUsed: 0
    },
    { 
      id: 5,
      name: "Ноги-велосипеды",
      description: "Когда хочется огненных квадрицепсов",
      exercises: [
        { exerciseId: 6, sets: 4, reps: 15 },  // Выпады
        {
            exerciseId: 13, sets: 3, time: 45,
            reps: 0
        }, // Стульчик
        { exerciseId: 12, sets: 3, reps: 20 }  // Звезды
      ],
      tags: ["legs"],
      difficulty: 3,
      estimatedTime: 30,
      createdAt: "2025-02-16",
      timesUsed: 0
    }
];

export const workoutsToMockFavorite: Workout[] = [
  { 
    id: 1,
    name: "Зоопарк-тренировка",
    description: "Тренировка для тех, кто хочет почувствовать себя животным",
    exercises: [
      { exerciseId: 2, sets: 3, reps: 10 }, // Краб
      { exerciseId: 8, sets: 3, reps: 15 }, // Медведь
      { exerciseId: 1, sets: 2, reps: 20 }  // Пингвин
    ],
    tags: ["fullBody"],
    difficulty: 2,
    estimatedTime: 25,
    createdAt: "2025-02-16",
    timesUsed: 11
  },
  { 
    id: 2,
    name: "Интенсивный вызов",
    description: "Пробиваем потолок возможностей",
    exercises: [
      { exerciseId: 4, sets: 4, reps: 12 }, // Выпрыгивания
      {
          exerciseId: 5, sets: 3, time: 60,
          reps: 0
      }, // Планка
      { exerciseId: 15, sets: 4, reps: 10 } // Лягушка
    ],
    tags: ["legs", "core"],
    difficulty: 3,
    estimatedTime: 35,
    createdAt: "2025-02-16",
    timesUsed: 322
  },
  { 
    id: 3,
    name: "Утро кота-йога",
    description: "Проснись и порхай",
    exercises: [
      {
          exerciseId: 11, sets: 3, time: 30,
          reps: 4
      }, // Кошка
      { exerciseId: 7, sets: 2, reps: 15 },  // Поцелуи
      { exerciseId: 14, sets: 3, reps: 12 }  // Мельница
    ],
    tags: ["stretching", "core"],
    difficulty: 1,
    estimatedTime: 20,
    createdAt: "2025-02-16",
    timesUsed: 90
  },
  { 
    id: 4,
    name: "Руки-базуки",
    description: "Для тех, кто хочет пожать хоть что-то",
    exercises: [
      { exerciseId: 10, sets: 4, reps: 20 }, // Бокс
      { exerciseId: 7, sets: 3, reps: 15 },  // Поцелуи
      { exerciseId: 2, sets: 2, reps: 10 }   // Краб
    ],
    tags: ["arms"],
    difficulty: 2,
    estimatedTime: 25,
    createdAt: "2025-02-16",
    timesUsed: 110
  },
  { 
    id: 5,
    name: "Ноги-велосипеды",
    description: "Когда хочется огненных квадрицепсов",
    exercises: [
      { exerciseId: 6, sets: 4, reps: 15 },  // Выпады
      {
          exerciseId: 13, sets: 3, time: 45,
          reps: 0
      }, // Стульчик
      { exerciseId: 12, sets: 3, reps: 20 }  // Звезды
    ],
    tags: ["legs"],
    difficulty: 3,
    estimatedTime: 30,
    createdAt: "2025-02-16",
    timesUsed: 120
  }
];