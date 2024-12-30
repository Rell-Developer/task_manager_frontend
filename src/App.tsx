import { ToastContainer } from 'react-toastify';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';

function App() {
  return (
    <>
      <ToastContainer/>
      <TaskProvider>
        <main className='min-h-screen bg-color4'>
          <Header/>
          <TaskList/>
        </main>
      </TaskProvider>
    </>
  )
}

export default App;