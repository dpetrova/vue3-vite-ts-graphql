export interface Ref<T> {
    value: T
  }

export interface Task {
    task: string;
    createdAt: number;
    finishedAt: number | undefined;    
  }