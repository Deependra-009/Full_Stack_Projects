package com.aws_clone.server.controller;

import com.aws_clone.server.entity.DatabaseInstance;
import com.aws_clone.server.model.DatabaseRequest;
import com.aws_clone.server.service.DatabaseProvisionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/databases")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DatabaseController {

    private final DatabaseProvisionService provisionService;

    @PostMapping("/create")
    public ResponseEntity<DatabaseInstance> create(@RequestBody DatabaseRequest request) {
        try {
            DatabaseInstance db = provisionService.createDatabase(
                    request.getDbType(),
                    request.getDbName(),
                    request.getUsername(),
                    request.getPassword()
            );
            return ResponseEntity.ok(db);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<DatabaseInstance>> getAllDatabases() {
        try {
            List<DatabaseInstance> databases = provisionService.getAllDatabases();
            return ResponseEntity.ok(databases);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatabaseInstance> getDatabaseById(@PathVariable Long id) {
        try {
            DatabaseInstance database = provisionService.getDatabaseById(id);
            return ResponseEntity.ok(database);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/{id}/start")
    public ResponseEntity<DatabaseInstance> startDatabase(@PathVariable Long id) {
        try {
            DatabaseInstance database = provisionService.startDatabase(id);
            return ResponseEntity.ok(database);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/{id}/stop")
    public ResponseEntity<DatabaseInstance> stopDatabase(@PathVariable Long id) {
        try {
            DatabaseInstance database = provisionService.stopDatabase(id);
            return ResponseEntity.ok(database);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<DatabaseInstance> getDatabaseStatus(@PathVariable Long id) {
        try {
            DatabaseInstance database = provisionService.getDatabaseStatus(id);
            return ResponseEntity.ok(database);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDatabase(@PathVariable Long id) {
        try {
            provisionService.deleteDatabase(id);
            return ResponseEntity.ok(Map.of("message", "Database deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Database not found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to delete database"));
        }
    }
}
