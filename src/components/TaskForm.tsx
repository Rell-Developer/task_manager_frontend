import type { TaskFormProps } from "../types";
import Button from "./Button";

const TaskForm = ({ 
    openForm, 
    setOpenForm, 
    task,
    setTask,
    saveTask
    }: TaskFormProps) => {

    const getTitle = ():string => {
        if (openForm == "read") {
            return "Ver Tarea";
        };

        if (openForm == "edit") {
            return "Editar Tarea";
        };

        if (openForm == "create") {
            return "Crear Tarea";
        }

        return "";
    }

    const handleSubmit = async(e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        saveTask();
    };

    return(
        <div onSubmit={e => handleSubmit(e)} className="w-full p-5">
            <h2 className="text-color1 font-bold text-xl uppercase text-center">
                { getTitle() }
            </h2>
            <form className="w-full">
                <div className="flex flex-col mb-3">
                    <label htmlFor="title" className="font-bold text-color1">Titulo</label>
                    {
                        openForm == "read" 
                        ? <p>{task.title}</p>
                        : <input 
                            type="text" 
                            name="title" 
                            className="border p-3 rounded" 
                            placeholder="ej. Mi nueva tarea" 
                            value={task.title} 
                            onChange={e => setTask({ ...task, title: e.target.value })}
                        />
                    }
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="description" className="font-bold text-color1">Descripcion</label>
                    {
                        openForm == "read"
                        ? <p className="w-full">{ task.description }</p>
                        : <textarea 
                            id="description" 
                            name="description" 
                            className="border p-3 rounded h-32"
                            placeholder="Ej. Mi descripcion de la tarea" 
                            value={task.description}
                            onChange={e => setTask({ ...task, description: e.target.value })}
                        ></textarea>
                    }
                </div>
                {
                    openForm != "create" && <>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="status" className="font-bold text-color1">Estatus</label>
                            {
                                <p className="w-full">{ task.completed == true ? "Completada":"Pendiente" }</p>
                            }
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="createdAt" className="font-bold text-color1">Fecha de Creacion</label>
                            {
                                task.createdAt && <p className="w-full">{ new Date(task.createdAt).toLocaleDateString() }</p>
                            }
                        </div>
                    </>
                }
                <div className="w-full flex flex-col md:flex-row justify-between space-y-3">
                    <Button type="button" style="discard" handleClick={()=>setOpenForm("")}>
                        <p>
                            { openForm == "read" ? "Cerrar":"Descartar"}
                        </p>
                    </Button>

                    {
                        openForm != "read" && 
                            <Button type="submit">
                                <p>
                                    Guardar
                                </p>
                            </Button>
                    }

                    {
                        (openForm == "read" && task._id) && <>
                            
                        </> 
                    }
                </div>
            </form>
        </div>
    )
};

export default TaskForm;