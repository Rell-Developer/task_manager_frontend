import { useState, createContext, ReactElement } from "react";
import { toast } from "react-toastify";
import type { TaskT, TaskDataT, TaskContextT } from "../types";
import clienteAxios from "../config/axios";

// Iniciamos el contexto con valores iniciales
const TaskContext = createContext<TaskContextT>({
    searchTasks: () => {},
    tasks: [],
    filterTasks: () => {},
    openCreateForm: () => {},
    openForm: "",
    setOpenForm: () => {},
    task: { title:""},
    setTask: () =>{},
    updateStatus: () => {},
    viewTask: () => {},
    deleteTask: () => {},
    saveTask: () => {},
    refreshToken: () => {},
    editMode: () => {}
});

const TaskProvider = ({ children }: { children: ReactElement }) => {
    // States
    const [tasks, setTasks] = useState<TaskT[]>([]);
    const [openForm, setOpenForm] = useState("");
    const [filter, setFilter] = useState("");
    const [task, setTask] = useState<TaskDataT>({
        title: ""
    });
    const [token, setToken] = useState("");

    const saveTask = async() => {
        try {
            // Validamos el titulo
            if(task.title.trim() == ""){
                toast.error("El titulo es obligatorio");
                return;
            }
            // Peticion para crear las tareas
            const { data } = (task._id && task._id.trim().length > 0) 
                ? await clienteAxios.put(`tasks/${task._id}`, task, getClientToken())
                : await clienteAxios.post('tasks', task, getClientToken());

            // Validamos el resultado
            if (data.error) {
                toast.error(data.message);
                return;
            }
            // Notificacion y reseteo de estados
            toast.success(data.message);

            // Validamos si tiene id, si lo tiene, es edicion, sino, es creacion y se agrega
            if (task._id) {
                const tasksFilter = [...tasks];
                for (let i = 0; i < tasksFilter.length; i++) {
                    if (tasksFilter[i]._id == task._id) {
                        tasksFilter[i] = {
                            ...tasksFilter[i],
                            ...task
                        }
                    }
                }
                setTasks(tasksFilter);
            } else if(filter !== "completed") {
                setTasks( ts => [...ts, data.result]);
            }
            // Reseteamos
            setTask({
                _id: "",
                title: "",
                description:""
            });
            setOpenForm("");
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                return toast.error("Error de conexion, verifique su conexion a internet");
            };
            if (error.response.status >= 400) {
                return toast.error(error.response.data.message);
            };
            toast.error("Hubo un error al crear la tarea");
            return
        }
    }

    // Metodo para buscar las tareas
    const searchTasks = async() => {
        try {
            // Buscar las tareas
            const { data } = await clienteAxios.get("tasks", getClientToken());

            // Validamos la respuesta
            if (data.error) {
                toast.error(data.message);
                return
            }
            // Establecemos las tareas
            setTasks(data.result);            
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                return toast.error("Error de conexion, verifique su conexion a internet");
            };
            if (error.response.status >= 400) {
                return toast.error(error.response.data.message);
            }
            toast.error("Hubo un error al buscar las tareas");
        }
    };

    const filterTasks = async(filter:string) => {
        try {
            // Url para la busqueda con filtro
            const url = `/tasks`;
            const headers = filter == "" ? getClientToken(): {
                headers: {
                    ...getClientToken().headers,
                    filter: `${filter == "completed"}` 
                }
            };
            
            // Realizamos el filtro por los headers
            const { data } = await clienteAxios.get(url, headers);

            // Validamos el resultado
            if (data.error) {
                toast.error(data.message);
                return
            }
            // Establecemos la lista
            setTasks(data.result);
            setFilter(filter);
        } catch (error:any) {
            if (error.code === "ERR_NETWORK") {
                return toast.error("Error de conexion, verifique su conexion a internet");
            };
            if (error.response.status >= 400) {
                return toast.error(error.response.data.message);
            }
            toast.error("Hubo un error al filtrar las tareas");
            return
        }
    };

    const openCreateForm = () => {
        setTask({
            _id: "",
            title: "",
            description:""
        });
        setOpenForm("create");
    };

    const updateStatus = async(task: TaskT) => {
        try {
            // Actualizamos el estatus de la tarea
            const { data } = await clienteAxios.put(`/tasks/${task._id}`,{
                completed: !task.completed
            }, getClientToken());

            // Validamos el resultado
            if (data.error) {
                toast.error(data.message);
                return
            }

            // Notificamos
            toast.success(data.message);

            // Actualizamos la lista de tareas
            updateTaskList({
                ...task,
                completed: !task.completed
            });
        } catch (error:any) {
            if (error.code === "ERR_NETWORK") {
                return toast.error("Error de conexion, verifique su conexion a internet");
            };
            if (error.response.status >= 400) {
                return toast.error(error.response.data.message);
            }
            toast.error("Hubo un error al actualizar la tarea");
            return
        }
    };

    const updateTaskList = (task: TaskT) => {
        // Lista
        let tasksFilter = [...tasks];

        if ((filter == "pending" && task.completed) || (filter == "completed" && !task.completed)) {
            tasksFilter = tasksFilter.filter(t => t._id != task._id);
        }else{
            for (let i = 0; i < tasksFilter.length; i++) {
                if (tasksFilter[i]._id == task._id) {
                    tasksFilter[i] = {
                        ...tasksFilter[i],
                        completed: task.completed
                    }
                }
            }
        }
        // Establecemos la lista
        setTasks(tasksFilter);
    };

    const viewTask = async (id: string) => {
        try {
            // Obtenemos la informacion de la tarea
            const { data } = await clienteAxios.get(`tasks/${id}`, getClientToken());
            
            // Validamos el resultado
            if (data.error) {
                toast.error(data.message);
                return
            }

            // Establecemos la tarea a visualizar y abrimos el formulario
            setTask(data.result);
            setOpenForm("read");
        } catch (error:any) {
            if (error.code === "ERR_NETWORK") {
                return toast.error("Error de conexion, verifique su conexion a internet");
            };
            if (error.response.status >= 400) {
                return toast.error(error.response.data.message);
            }
            toast.error("Hubo un error al ver esta tarea");
            return;
        }
    };

    const deleteTask = async(id:string) => {
        try {
            // Peticion para eliminar 
            const { data } = await clienteAxios.delete(`tasks/${id}`, getClientToken());

            // Validar resultado
            if (data.error) {
                toast.error(data.message);
                return;
            }

            // Filtramos las tareas
            const taskFiltered = [...tasks].filter( t => t._id !== id);

            // Notificamos y reseteamos el formulario
            toast.success(data.message);
            setOpenForm("");
            setTasks(taskFiltered);
        } catch (error:any) {
            if (error.code === "ERR_NETWORK") {
                return toast.error("Error de conexion, verifique su conexion a internet");
            };
            if (error.response.status >= 400) {
                return toast.error(error.response.data.message);
            }
            toast.error("Hubo un error al eliminar la tarea");
            return
        }
    };

    const refreshToken = async() => {
        try {
            // Obtenemos el token
            const { data } = await clienteAxios.get("users/get-token", getClientToken());

            // Si existe un error
            if (data.error) {
                toast.error(data.message);
                return ""
            }

            // Establecemos el token
            setToken(data.result);
            sessionStorage.setItem("token", data.result);

            if(tasks.length == 0){
                searchTasks();
            };

            toast.success(data.message);
        } catch (error:any) {
            if (error.code === "ERR_NETWORK") {
                return toast.error("Error de conexion, verifique su conexion a internet");
            };
            if (error.response.status >= 400) {
                return toast.error(error.response.data.message);
            }
            toast.error("Hubo un error al refrescar el token de autenticación");
        }
    };

    const getClientToken = () => {
        // Obtenemos el token
        let Token = token.trim().length == 0 ? sessionStorage.getItem("token"):token;

        // Si no se consigue, retornamos objeto vacio
        if(!Token){
            return {};
        };
        // Retornamos la configuracion de los headers
        return {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }
    }

    const editMode = (task: TaskT) => {
        // Establecemos la tarea a visualizar y abrimos el formulario
        setTask(task);
        setOpenForm("edit");
    }

    return (
        <TaskContext.Provider value={{
            searchTasks,
            tasks,
            filterTasks,
            openCreateForm,
            openForm,
            setOpenForm,
            task,
            setTask,
            updateStatus,
            viewTask,
            deleteTask,
            saveTask, 
            refreshToken,
            editMode
        }}>
            { children }
        </TaskContext.Provider>
    )
}

export {
    TaskProvider
}

export default TaskContext