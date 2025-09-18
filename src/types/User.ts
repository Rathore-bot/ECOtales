export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
  avatar?: string;
  ageGroup?: string;
  level?: number;
  xp?: number;
  teacherCode?: string;
}

export interface Element {
  id: string;
  name: string;
  color: string;
  gradient: string;
  icon: string;
  power: string;
  description: string;
}