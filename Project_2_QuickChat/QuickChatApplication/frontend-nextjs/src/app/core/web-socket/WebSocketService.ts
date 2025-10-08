import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { MessageRequest, MessageResponse } from '../Models/chats.model';
import { UpdateMessageRequest } from '../Models/update-message-model';
import { WEB_SOCKET_URL } from '../constant/URL';
import { GroupEntity } from '../Models/group.model';


class WebSocketService {

    private client!: Client;
    isConnected = false;
    onConnectCallback!: (() => void) | null;
    onStatusCallback!:((data:any) => void) | null;
    onUpdateMessageCallback!:((data:any) => void) | null;
    onSendGroupMessageCallback!:((data:any)=>void) | null;
    onCreateNewGroupCallback!:((data:any)=>void) | null;

    constructor() {}

    /* One to One Conversation */

    connetToWebSocekt(userID:string){
        this.client = new Client({
            webSocketFactory: () => new SockJS(`${WEB_SOCKET_URL}?userId=${userID}`),
            reconnectDelay: 5000,
        });
    }

    connect(userId: string, onMessageReceived: (msg: Message) => void) {
        this.client.onConnect = () => {
            console.log('Connected to WebSocket');
            this.isConnected = true;


            // Notify the component about the connection
            if (this.onConnectCallback) this.onConnectCallback();


            // Subscribe to the user's private queue
            this.client.subscribe(`/user/${userId}/queue/receive-message`, onMessageReceived);

            // Update Message
            this.client.subscribe(`/user/${userId}/queue/update-message`, (data:any)=>{
                const response=JSON.parse(data.body);
                if(this.onUpdateMessageCallback){
                    this.onUpdateMessageCallback(response);
                }
            });

            // create group notification
            this.client.subscribe(`/user/${userId}/queue/create-group-notification`,(data:any)=>{
                const response=JSON.parse(data.body);


                if(this.onCreateNewGroupCallback){
                    console.log("group-notification",response);
                    this.onCreateNewGroupCallback(response)
                }

            })

            // send group message
            this.client.subscribe(`/user/${userId}/queue/send-particular-message`,(data:any)=>{
                const response=JSON.parse(data.body);
                if(this.onSendGroupMessageCallback){
                    this.onSendGroupMessageCallback(response);
                }
            });

            // Online Offline Status
            this.client.subscribe('/topic/status',(data:any)=>{
                const response=JSON.parse(data.body);
                if(this.onStatusCallback){
                    this.onStatusCallback(response);
                }
            });
        };

        this.client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.client.activate();
    }

    statusOnlineOfflineChanged(callback:any){
        this.onStatusCallback=callback;
    }

    setOnConnectCallback(callback:any) {
        this.onConnectCallback = callback;
    }

    setUpdateMessageCallback(callback:any){
        this.onUpdateMessageCallback=callback;
    }

    setOnSendGroupMessageCallback(callback:any){
        this.onSendGroupMessageCallback=callback;
    }

    updateMessage(payload:UpdateMessageRequest){
        this.client.publish({ destination: '/api/v1/chat/update-message', body: JSON.stringify(payload) });
    }

    sendMessage(payload:MessageRequest) {
        this.client.publish({ destination: '/api/v1/chat/send-message', body: JSON.stringify(payload) });
    }

    setCreateNewGroupCallback(callback:any){
        this.onCreateNewGroupCallback=callback;
    }

    sendGroupMessage(payload:MessageResponse) {
        this.client.publish({ destination: '/api/v1/chat/send-group-message', body: JSON.stringify(payload) });
    }

    createGroup(payload:GroupEntity){
        this.client.publish({ destination: '/api/v1/chat/create-group', body: JSON.stringify(payload) });
    }

    /* Disconnect */

    disconnect() {
        if (this.client?.active) {
            console.log('Disconnect to WebSocket');
            this.client.deactivate();
        }
    }
}

export default new WebSocketService();
