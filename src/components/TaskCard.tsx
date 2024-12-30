import type { TaskCardProps } from "../types";
import Button from "./Button";

const TaskCard = ({ task, updateStatus, viewTask, deleteTask, editMode }: TaskCardProps) => {
    return(
        <div className="rounded border shadow p-5 mb-3 w-full bg-white">
            <div className="flex justify-between">
                <h3 className="uppercase font-bold">
                    { task.title }
                </h3>

                <button onClick={() => updateStatus(task)}>
                    <p className={`font-semibold rounded-full px-3 text-white ${task.completed ? "bg-color2":"bg-yellow-600"}`}>
                        { task.completed ? "Completado":"Pendiente"}
                    </p>
                </button>
            </div>
            <p className="text-sm max-w-prose my-2">
                { task.description }
            </p>
            <p className="text-[12px] text-slate-600 font-semibold my-2">
                Creada el { new Date(task.createdAt).toLocaleDateString() }
            </p>
            <div className="w-full md:space-x-3 space-x-0 flex flex-col md:flex-row space-y-3 md:space-y-0">
                <Button type="button" handleClick={()=> viewTask(task._id)}>
                    <p>
                        Ver Tarea
                    </p>
                </Button>
                <Button
                    type="button" 
                    handleClick={() => editMode(task)}
                >
                    <p>
                        Editar
                    </p>
                </Button>
                <Button
                    type="button"
                    style="remove"
                    handleClick={() => task._id && deleteTask(task._id)}
                >
                    <p>Eliminar</p>
                </Button>
            </div>
        </div>
    )
};

export default TaskCard;