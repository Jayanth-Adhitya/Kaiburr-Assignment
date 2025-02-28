package com.example.Task_manager;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    // GET all tasks or by ID
    @GetMapping
    public ResponseEntity<?> getTasks(@RequestParam(required = false) String id) {
        if (id != null) {
            return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        }
        return ResponseEntity.ok(taskRepository.findAll());
    }

    // POST/PUT a task
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (!isCommandSafe(task.getCommand())) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(taskRepository.save(task));
    }

    // DELETE a task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Search by name
    @GetMapping("/search")
    public ResponseEntity<?> searchTasks(@RequestParam String name) {
        List<Task> tasks = taskRepository.findByNameContaining(name);
        return tasks.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(tasks);
    }

    // Execute command (local execution for Task 1)
    @PostMapping("/{id}/execute")
public ResponseEntity<TaskExecution> executeTask(@PathVariable String id) {
    try {
        Task task = taskRepository.findById(id).orElseThrow();
        TaskExecution execution = new TaskExecution();
        execution.setStartTime(new Date());

        // Split command into parts for ProcessBuilder
        String[] command = splitCommandForOS(task.getCommand());
        
        // Execute command with ProcessBuilder
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        Process process = processBuilder.start();

        // Read output and error streams
        String output = new String(process.getInputStream().readAllBytes());
        String error = new String(process.getErrorStream().readAllBytes());
        
        // Wait for process to complete
        @SuppressWarnings("unused")
        int exitCode = process.waitFor();
        
        execution.setEndTime(new Date());
        execution.setOutput(output + (error.isEmpty() ? "" : "\nError: " + error));
        task.getTaskExecutions().add(execution);
        taskRepository.save(task);

        return ResponseEntity.ok(execution);
    } catch (IOException | InterruptedException e) {
        return ResponseEntity.internalServerError().build();
    }
}

private String[] splitCommandForOS(String command) {
    String shell = isWindows() ? "cmd.exe" : "sh";
    String flag = isWindows() ? "/c" : "-c";
    return new String[]{shell, flag, command};
}

private boolean isWindows() {
    return System.getProperty("os.name").toLowerCase().contains("win");
}

    private boolean isCommandSafe(String command) {
        // Implement validation logic (e.g., block 'rm', 'sudo')
        return !command.contains("rm") && !command.contains("sudo");
    }
}