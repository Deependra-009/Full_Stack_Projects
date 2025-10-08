export interface DatabaseInstance {
  id: number;
  dbType: 'mysql' | 'postgres';
  dbName: string;
  username: string;
  password: string;
  host: string;
  port: number;
  connectionUrl: string;
  status: 'RUNNING' | 'STOPPED' | 'STARTING' | 'STOPPING' | 'ERROR';
  containerId?: string;
  containerName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDatabaseRequest {
  dbType: 'mysql' | 'postgres';
  dbName: string;
  username: string;
  password: string;
}

export interface DatabaseState {
  instances: DatabaseInstance[];
  loading: boolean;
  error: string | null;
  selectedInstance: DatabaseInstance | null;
}
