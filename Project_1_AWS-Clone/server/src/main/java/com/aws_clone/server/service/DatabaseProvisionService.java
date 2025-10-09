package com.aws_clone.server.service;

import com.aws_clone.server.entity.DatabaseInstance;
import com.aws_clone.server.repository.DatabaseInstanceRepository;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.ExposedPort;
import com.github.dockerjava.api.model.PortBinding;
import com.github.dockerjava.api.model.Ports;
import com.github.dockerjava.api.model.Volume;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.ServerSocket;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DatabaseProvisionService {

    private final DockerClient dockerClient;
    private final DatabaseInstanceRepository repository;

    public DatabaseInstance createDatabase(String dbType, String dbName, String username, String password) throws InterruptedException {
        String image;
        int containerPort;

        switch (dbType.toLowerCase()) {
            case "mysql" -> {
                image = "mysql:8.0";
                containerPort = 3306;
            }
            case "postgres" -> {
                image = "postgres:16";
                containerPort = 5432;
            }
            case "oracle" -> {
                image = "gvenzl/oracle-xe:21-slim";
                containerPort = 1521;
            }
            case "mongodb" -> {
                image = "mongo:7";
                containerPort = 27017;
            }
            default -> throw new IllegalArgumentException("Unsupported DB type");
        }

        // Pull image if not present
        dockerClient.pullImageCmd(image).start().awaitCompletion();

        int hostPort = findAvailablePort();

        // Prepare environment variables
        List<String> env = switch (dbType.toLowerCase()) {
            case "mysql" -> List.of(
                    "MYSQL_ROOT_PASSWORD=" + password,
                    "MYSQL_DATABASE=" + dbName,
                    "MYSQL_USER=" + username,
                    "MYSQL_PASSWORD=" + password
            );
            case "postgres" -> List.of(
                    "POSTGRES_DB=" + dbName,
                    "POSTGRES_USER=" + username,
                    "POSTGRES_PASSWORD=" + password
            );
            case "oracle" -> List.of(
                    "ORACLE_PASSWORD=" + password,
                    "ORACLE_DATABASE=" + dbName
            );
            case "mongodb" -> List.of(
                    "MONGO_INITDB_ROOT_USERNAME=" + username,
                    "MONGO_INITDB_ROOT_PASSWORD=" + password,
                    "MONGO_INITDB_DATABASE=" + dbName,
                    "MONGO_INITDB_AUTHENTICATION_DATABASE=admin"
            );
            default -> throw new IllegalArgumentException("Unsupported DB type for environment variables");
        };

        // Generate a UUID suffix
        String uuid = UUID.randomUUID().toString();

        // Docker-managed volume
        String dockerVolumeName = "db-volume-" + uuid;

        // Container name
        String containerName = "db-container-" + uuid;

        String volumePath = switch (dbType.toLowerCase()) {
            case "mysql" -> "/var/lib/mysql";
            case "postgres" -> "/var/lib/postgresql/data";
            case "oracle" -> "/opt/oracle/oradata";
            case "mongodb" -> "/data/db";
            default -> "/var/lib/data";
        };
        Volume containerVolume = new Volume(volumePath);

        ExposedPort tcpPort = ExposedPort.tcp(containerPort);

        // Add command line arguments for MongoDB to fix port binding
        String[] cmdArray = dbType.toLowerCase().equals("mongodb") ? 
            new String[]{"mongod", "--bind_ip_all", "--port", String.valueOf(containerPort)} : 
            null;

        CreateContainerResponse container = dockerClient.createContainerCmd(image)
                .withName(containerName)
                .withEnv(env)
                .withExposedPorts(tcpPort)
                .withCmd(cmdArray)
                .withHostConfig(
                        com.github.dockerjava.api.model.HostConfig.newHostConfig()
                                // ✅ Bind the host port on 0.0.0.0 (localhost)
                                .withPortBindings(new PortBinding(Ports.Binding.bindIpAndPort("0.0.0.0", hostPort), tcpPort))
                                .withBinds(new com.github.dockerjava.api.model.Bind(dockerVolumeName, containerVolume))
                )
                .exec();

        dockerClient.startContainerCmd(container.getId()).exec();

        String jdbcUrl = switch (dbType.toLowerCase()) {
            case "mysql" -> "jdbc:mysql://localhost:" + hostPort + "/" + dbName;
            case "postgres" -> "jdbc:postgresql://localhost:" + hostPort + "/" + dbName;
            case "oracle" -> "jdbc:oracle:thin:@localhost:" + hostPort + ":XE";
            case "mongodb" -> "mongodb://" + username + ":" + password + "@localhost:" + hostPort + "/" + dbName;
            default -> "jdbc:" + dbType + "://localhost:" + hostPort + "/" + dbName;
        };

        DatabaseInstance instance = new DatabaseInstance();
        instance.setDbType(dbType);
        instance.setDbName(dbName);
        instance.setUsername(username);
        instance.setPassword(password);
        instance.setHost("localhost");
        instance.setPort(hostPort);
        instance.setConnectionUrl(jdbcUrl);
        // Mark as STARTING until the port is reachable
        instance.setStatus("STARTING");
        instance.setContainerId(container.getId());
        instance.setContainerName(containerName);

        // Save initial state
        DatabaseInstance saved = repository.save(instance);

        // Asynchronously wait for readiness and update status
        new Thread(() -> awaitAndMarkReady(saved.getId(), saved.getHost(), saved.getPort())).start();

        return saved;
    }

    public List<DatabaseInstance> getAllDatabases() {
        return repository.findAll();
    }

    public DatabaseInstance getDatabaseById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Database not found with id: " + id));
    }

    public DatabaseInstance startDatabase(Long id) {
        DatabaseInstance instance = getDatabaseById(id);
        try {
            dockerClient.startContainerCmd(instance.getContainerId()).exec();
            instance.setStatus("RUNNING");
            return repository.save(instance);
        } catch (Exception e) {
            throw new RuntimeException("Failed to start database: " + e.getMessage());
        }
    }

    public DatabaseInstance stopDatabase(Long id) {
        DatabaseInstance instance = getDatabaseById(id);
        try {
            dockerClient.stopContainerCmd(instance.getContainerId()).exec();
            instance.setStatus("STOPPED");
            return repository.save(instance);
        } catch (Exception e) {
            throw new RuntimeException("Failed to stop database: " + e.getMessage());
        }
    }

    public void deleteDatabase(Long id) {
        DatabaseInstance instance = getDatabaseById(id);
        try {
            // Stop container if running
            try {
                dockerClient.stopContainerCmd(instance.getContainerId()).exec();
            } catch (Exception e) {
                // Container might already be stopped
            }
            
            // Remove container
            dockerClient.removeContainerCmd(instance.getContainerId()).exec();
            
            // Delete from database
            repository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete database: " + e.getMessage());
        }
    }

    public DatabaseInstance getDatabaseStatus(Long id) {
        DatabaseInstance instance = getDatabaseById(id);
        try {
            // Check container status
            var container = dockerClient.inspectContainerCmd(instance.getContainerId()).exec();
            String containerStatus = container.getState().getStatus();
            
            // Map Docker status to our status
            String status = switch (containerStatus) {
                case "running" -> "RUNNING";
                case "exited" -> "STOPPED";
                case "paused" -> "STOPPED";
                default -> "ERROR";
            };
            
            instance.setStatus(status);
            return repository.save(instance);
        } catch (Exception e) {
            instance.setStatus("ERROR");
            return repository.save(instance);
        }
    }

    private void awaitAndMarkReady(Long id, String host, int port) {
        // Wait up to ~2 minutes for the port to accept TCP connections
        long deadline = System.currentTimeMillis() + 120_000L;
        boolean ready = false;
        while (System.currentTimeMillis() < deadline) {
            try (java.net.Socket socket = new java.net.Socket()) {
                socket.connect(new java.net.InetSocketAddress(host, port), 2000);
                ready = true;
                break;
            } catch (Exception ignored) {
                try { Thread.sleep(3000); } catch (InterruptedException ignored2) {}
            }
        }

        DatabaseInstance instance = getDatabaseById(id);
        if (ready) {
            instance.setStatus("RUNNING");
        } else {
            instance.setStatus("ERROR");
        }
        repository.save(instance);
    }

    private int findAvailablePort() {
        try (ServerSocket socket = new ServerSocket(0)) {
            return socket.getLocalPort();
        } catch (IOException e) {
            throw new RuntimeException("No free port available", e);
        }
    }
}
