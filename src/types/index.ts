import { Dispatch, SetStateAction } from "react";

export type TaskT = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
};

export type TaskDataT = {
    _id?: string;
    title: string;
    description?: string;
    completed?: boolean;
    createdAt?: string;
};

export type TaskContextT = {
    searchTasks: () => void;
    tasks: TaskT[],
    filterTasks: (filter: string) => void;
    openCreateForm: () => void;
    openForm: string;
    setOpenForm: Dispatch<SetStateAction<string>>;
    task: TaskDataT;
    setTask: Dispatch<SetStateAction<TaskDataT>>;
    updateStatus: (task: TaskT) => void;
    viewTask: (id: string) => void;
    deleteTask: (id: string) => void;
    saveTask: () => void;
    refreshToken: () => void;
    editMode: (task: TaskT) => void;
};

export type TaskCardProps = { 
    task: TaskT; 
    updateStatus: (task:TaskT) => void; 
    viewTask: (id:string) => void;
    deleteTask: (id: string) => void;
    editMode: (task: TaskT) => void;
};

export type TaskFormProps = { 
    openForm: string; 
    setOpenForm: Dispatch<SetStateAction<string>>;
    task: TaskDataT;
    setTask: Dispatch<SetStateAction<TaskDataT>>;
    saveTask: () => void;
};