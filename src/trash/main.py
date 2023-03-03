
# the project progree = sum of all tasks' progress devided by the number of tasks 
# but that's not accurate : a project has two tasks when one is done doesnt mean that 50% of the project is done 
# may be the first one is just 20% of the project and the second one is more complex and will take more time and effort
# that's why we need to set a factor of complexity for each task so 
# the progress of the project = sum of all tasks' progress multiplied by the complexity of each task
# the complexity of a task is relative to other tasks means that the sum of complexities is 1
# the complexity of each task is based primarily on the required time to complete the task 
# as an initial value the required time is the duration of the task (deadline - start_time)
# so as an initial value of the complexity : the task with the longest duraiton is more complex
# when we set the progress of a task at a given moment we'll estimate the required time to complete the task and set the complexity based on that time 
# example a task expected to take 10 hours but after 2 hours the progress set to be 50% so the required time is 4 hours
# so the time needed to complete a task at a certin moment = (100 * (moment time - task start time)) / task progress at that moment
# and the complexity of each task = the time needed to complete that task / the sum of times needed to complete all tasks

class Task:
    def __init__(self, start_time, deadline):
        self.progress = 0
        self.start_time = start_time
        self.deadline = deadline
        self.needed_time = deadline - start_time

    def set_needed_time(self, now_time):
        if self.progress == 0:
            self.needed_time = self.deadline - self.start_time
            return
        self.needed_time = (100 * (now_time - self.start_time)) / self.progress

    def get_progress(self):
        return self.progress
    
    def set_progress(self, new_progress, now_time):
        # now_time is the moment we set the progress at 
        if (now_time <= self.start_time):
            print('You cant start the task before the its start time')
            return
        self.progress = new_progress
        self.set_needed_time(now_time)
        
    def get_needed_time(self):
        return self.needed_time



def estimate_task_complexity(tasks, task):
    needed_times_sum = 0
    for t in tasks: needed_times_sum += t.get_needed_time()
    task_complexity = task.get_needed_time() / needed_times_sum
    return task_complexity

def estimate_project_progress(tasks):
    project_progress = 0
    for task in tasks: project_progress += task.get_progress() * estimate_task_complexity(tasks, task)
    return project_progress


tasks = [Task(9, 12), Task(9, 15)]

tasks[0].set_progress(100, 12) 
tasks[1].set_progress(100, 14);

for task in tasks:
    print(estimate_task_complexity(tasks, task))


print(estimate_project_progress(tasks))


def estimate_task_complexity(tasks, task):
    needed_times_sum = 0
    for t in tasks: needed_times_sum += t['task_needed_time']
    task_complexity = task['task_needed_time'] / needed_times_sum
    print(task_complexity)
    return task_complexity
 
def estimate_needed_time(task_progress, dif_sd_sp):
    if task_progress == 0: return dif_sd_sp
    task_needed_time = 100 * dif_sd_sp / task_progress
    return task_needed_time

def estimate_project_progress(project_id):
    tasks = runSQL("""SELECT * FROM tasks WHERE project_id = %s""", (project_id,))
    project_progress = 0
    for task in tasks: project_progress += task['task_progress'] * estimate_task_complexity(tasks, task)
    runSQL_return_id("""UPDATE projects SET project_progress = %s WHERE project_id = %s""", (project_progress, project_id))
    return project_progress
