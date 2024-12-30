import type { TaskT } from "../types/index.ts";
import useTask from "../hooks/useTask.tsx";
import TaskForm from "./TaskForm.tsx";
import TaskCard from "./TaskCard.tsx";
import Button from "./Button.tsx";

const TaskList = () => {
    const {
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
        editMode
    } = useTask();

    return (
        <>
            <div className="w-full mb-5 p-5 grid grid-cols-8 gap-3">
                <div className={`${openForm ? "hidden md:flex flex-col":""} col-span-12 md:col-span-5`}>
                    <h1 className="uppercase text-color1 font-bold text-3xl text-center mb-3">Lista de tareas</h1>

                    <Button 
                        type="button"
                        handleClick={() => openCreateForm()}
                        extraClasses="uppercase w-full mb-2"
                    >
                        <p>agregar una tarea</p>
                    </Button>

                    <div className="flex flex-col">
                        <label htmlFor="filter" className="font-bold">Filtrar por</label>
                        <select name="filter" id="filter" onChange={e => filterTasks(e.target.value)} className="p-2 rounded shadow border bg-white">
                            <option value="">Todas las tareas</option>
                            <option value="completed">Tareas completadas</option>
                            <option value="pending">Tareas pendientes</option>
                        </select>
                    </div>

                    <hr className="border my-3"/>
                    <div className="overflow-y-scroll h-[70vh] md:px-3">
                        {
                            tasks.length == 0 ? 
                                <div className="w-full text-center my-5">
                                    <p className="uppercase text-2xl font-bold">Sin tareas</p>
                                    <p className="">Refresque su token de autorizacion para ver las tareas</p>
                                </div>:
                                [...tasks]
                                    .reverse()
                                        .map((task:TaskT) => 
                                            <TaskCard 
                                                key={task._id} 
                                                task={task} 
                                                updateStatus={updateStatus} 
                                                viewTask={viewTask}
                                                deleteTask={deleteTask}
                                                editMode={editMode}
                                            />
                                        )
                        }
                    </div>
                </div>
                <div className={`${openForm ? "bg-white flex":"border-color2 hidden" } min-h-[80vh] rounded-lg col-span-12 md:col-span-3 border-2 md:flex justify-center items-center shadow border-dashed flex-col transition-all`}>
                    {
                        openForm == "" ?
                            <h3 className="uppercase text-color2 text-center font-bold text-xl">
                                Organiza, Planifica y divide tus tareas
                            </h3>:
                            <TaskForm 
                                setOpenForm={setOpenForm} 
                                openForm={openForm} 
                                task={task}
                                setTask={setTask}
                                saveTask={saveTask}
                            />
                    }
                </div>
            </div>
        </>
    )
};

export default TaskList