import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_URL } from '../../URL';
import { MessageRequest, MessageResponse } from '../Models/chats.model';
import { UpdateMessageRequest } from '../Models/update-message-model';


class WebSocketService {

    private client!: Client;
    isConnected = false;
    onConnectCallback!: (() => void) | null;
    onStatusCallback!:((data:any) => void) | null;
    onUpdateMessageCallback!:((data:any) => void) | null;


    constructor() {


    }

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

            //
            this.client.subscribe(`/user/${userId}/queue/update-message`, (data:any)=>{
                const response=JSON.parse(data.body);
                if(this.onUpdateMessageCallback){
                    this.onUpdateMessageCallback(response);
                }
            });

            // Online Offline Status
            this.client.subscribe('/topic/status',(data:any)=>{
                const response=JSON.parse(data.body);
                console.log("response",response);

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

    updateMessage(payload:UpdateMessageRequest){
        this.client.publish({ destination: '/api/v1/chat/update-message', body: JSON.stringify(payload) });
    }

    sendMessage(payload:MessageRequest) {
        console.log("pay",payload);

        this.client.publish({ destination: '/api/v1/chat/send-message', body: JSON.stringify(payload) });
    }

    disconnect() {
        if (this.client?.active) {
            console.log('Disconnect to WebSocket');
            this.client.deactivate();
        }
    }



}

export default new WebSocketService();
