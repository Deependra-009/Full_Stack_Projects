const domain="http://localhost";
const port="9090";

const USER_API=`${domain}:${port}/api/v1/auth`;
const CHAT_API=`${domain}:${port}/api/v1/chat`;
const WEB_SOCKET_URL =`${domain}:${port}/quick-chat-web-socket`;




export{
    USER_API,
    WEB_SOCKET_URL,
    CHAT_API
}